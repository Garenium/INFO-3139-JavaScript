import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import * as p1 from "./project1_setup.js";
const resolvers = {
  project1_setup: async () => {
    console.log("THIS IS PROJECT1_SETUP");
    let results = await p1.project1Setup();

    console.log("\nRESULT:");
    console.log(results);
    console.log("\n");

    return results;
  },

  alerts: async () => {
    console.log("THIS IS ALERTS");
    try {
      const db = await dbRtns.getDBInstance();
      let alerts = await dbRtns.findAll(db, cfg.alertscollection);
      console.log("INSIDE alerts variable");
      console.log(alerts);
      return alerts;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  advisories: async () => {
    console.log("THIS IS ADVISORIES");
    try {
      const db = await dbRtns.getDBInstance();
      let advisories = await dbRtns.findAll(db, cfg.advisorycollection);
      return advisories;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  regions_unique: async () => {
    console.log("THIS IS REGIONS");
    try {
      let alerts = await p1.loadAlerts();
      let regionsUnique = await alerts.map((alert) => alert.region);
      regionsUnique = await Array.from(new Set(regionsUnique));
      return regionsUnique;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  subregions_unique: async () => {
    console.log("THIS IS SUBREGIONS");
    try {
      let alerts = await p1.loadAlerts();
      let subregionsUnique = await alerts.map((alert) => alert.subregion);
      subregionsUnique = await Array.from(new Set(subregionsUnique));
      return subregionsUnique;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  travellers_unique: async () => {
    try {
      const db = await dbRtns.getDBInstance();
      let advisories = await dbRtns.findAll(db, cfg.advisorycollection);
      let travellersUnique = await advisories.map((advisory) => advisory.name);
      travellersUnique = await Array.from(new Set(travellersUnique));
      return travellersUnique;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  add_advisory: async (args) => {
    console.log("THIS IS ADD_ADVISORY");
    console.log(args.name);
    console.log(args.country);
    let advisories = await p1.addAdvisory(args);
    console.log(advisories);
    return advisories;
  },
  traveller: async (args) => {
    console.log("THIS IS LIST_ADVISORIES_BY_NAME (TRAVELLER)");
    let advisories = await p1.listAdvisoryByName(args);
    return advisories;
  },
  region: async (args) => {
    console.log("THIS IS LIST_ADVISORIES_BY_NAME (REGION)");
    let countries = await p1.listAdvisoryByRegion(args);

    return countries;
  },
  subregion: async (args) => {
    console.log("THIS IS LIST_ADVISORIES_BY_NAME (subregion)");
    let countries = await p1.listAdvisoryBySubregion(args);
    return countries;
  },
};
export { resolvers };
