import { getJSONFromWWWPromise } from "./utilities.js";
import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
import { doTypesOverlap } from "graphql";

const project1Setup = async () => {
  let results = "";
  try {
    const db = await dbRtns.getDBInstance();

    // Delete any existing documents from the alerts collection
    let deletedData = await dbRtns.deleteAll(db, cfg.alertscollection);
    results += `Deleted ${deletedData.deletedCount} documents from the alerts collection. `;

    // Obtain the country ISO JSON from GitHub and place it in an array variable
    let countryJSON = await getJSONFromWWWPromise(cfg.isocountries);
    results += `Retrieved Country JSON from Github. `;

    // Obtain the ALERT JSON from the GOC site
    let travelalertsJSON = await getJSONFromWWWPromise(cfg.travelalerts);
    results += `Retrieved Alert JSON from remote web site. `;

    let alertsArray = [];

    // Convert countryData to an array
    let countryArray = Object.values(countryJSON);

    // Iterate over each country
    for (const country of countryArray) {
      // Look up corresponding alert data
      const alertForCountry = travelalertsJSON.data[country["alpha-2"]];

      // Create new alert object
      const newAlert = {
        country: country["alpha-2"],
        name: country.name,
        text: alertForCountry
          ? alertForCountry.eng["advisory-text"]
          : "No travel alerts",
        date: alertForCountry ? alertForCountry["date-published"].date : "",
        region: country.region,
        subregion: country["sub-region"],
      };

      // Add the alert object to the array
      alertsArray.push(newAlert);
    }

    // Add all the documents to the alerts collection at once after the loop
    await dbRtns.addMany(db, cfg.alertscollection, alertsArray);
    results += `added ${alertsArray.length} documents to the alerts function.`;

    // console.log(results);
  } catch (err) {
    console.log(err);
  } finally {
    return { results: results };
  }
};

const loadAlerts = async () => {
  try {
    const db = await dbRtns.getDBInstance();
    let alerts = await dbRtns.findAll(db, cfg.alertscollection);
    return alerts;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// const loadRegions = async () => {
//   let alerts = await loadAlerts();
//   let regionsUnique = await alerts.map((region) => alerts.region);
//   regionsUnique = await Array.from(new Set(regionsUnique));
//   return regionsUnique;
// }

const addAdvisory = async (args) => {
  try {
    const db = await dbRtns.getDBInstance();

    // Construct the query filter object
    const queryFilter = { name: args.country };

    // Check if the country exists from the alerts collection
    //This is to make the collections integral to each other
    let existingAlert = await dbRtns.findOne(
      db,
      cfg.alertscollection,
      queryFilter
    );

    //If it doesn't, return an error
    if (!existingAlert) {
      throw new Error(`No existing alert found for country ${args.country}`);
    } else {
      console.log("ALERT EXISTS...");
      console.log(existingAlert); // Check the structure of existingAlert
    }

    //Set the current timestamp
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Create a new advisory object with the provided name and existing advisory details
    let advisoryInfo = {
      name: args.name,
      country: existingAlert.name,
      text: existingAlert.text,
      date: formattedDate,
    };

    // Add the new advisory to the advisory collection
    let results = await dbRtns.addOne(db, cfg.advisorycollection, advisoryInfo);

    if (!results) {
      console.log("Advisory has NOT been inserted");
      return null;
    } else {
      console.log("Advisory has been inserted");
    }

    return advisoryInfo;
  } catch (err) {
    console.log(err);
    return null; // Return null if there's an error
  }
};

const listAdvisoryByName = async (args) => {
  try {
    const db = await dbRtns.getDBInstance();
    let result = await dbRtns.findAll(db, cfg.advisorycollection, {
      name: args.name,
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const listAdvisoryByRegion = async (args) => {
  try {
    const db = await dbRtns.getDBInstance();
    let result = await dbRtns.findAll(db, cfg.alertscollection, {
      region: args.region,
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const listAdvisoryBySubregion = async (args) => {
  try {
    const db = await dbRtns.getDBInstance();
    let result = await dbRtns.findAll(db, cfg.alertscollection, {
      subregion: args.subregion,
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  project1Setup,
  loadAlerts,
  addAdvisory,
  listAdvisoryByName,
  listAdvisoryByRegion,
  listAdvisoryBySubregion,
  // loadRegions,
};
