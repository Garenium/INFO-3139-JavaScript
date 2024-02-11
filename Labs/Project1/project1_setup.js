import { getJSONFromWWWPromise } from "./utilities.js";
import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";

const loadAlerts = async () => {

        let results = "";
    try {

        const db = await dbRtns.getDBInstance();
        //Delete any existing documents from an alerts collection in the database
        let deletedData = await dbRtns.deleteAll(db, cfg.alertscollection);
        results += `Deleted ${deletedData.deletedCount} documents from the alerts collection `;

        //Obtain the country ISO JSON from GitHub and place it in an array variable
        let countryJSON = await getJSONFromWWWPromise(cfg.isocountries);
        const countriesNum = Object.keys(countryJSON).length;  
        results += `Retrieved Country JSON from Github. `;

        //Obtain the ALERT JSON from the GOC site
        let travelalertsJSON = await getJSONFromWWWPromise(cfg.travelalerts);
        const travelalertsNum = Object.keys(travelalertsJSON.data).length;  
        results += `Retrieved Alert JSON from remote web site. `;

        let alertsArray = [];

        for (const countryCode in countryJSON) {
            const country = countryJSON[countryCode];
            const alertInfo = travelalertsJSON.data[country["alpha-2"]];
            
            if (alertInfo) {
                // Alert property exists in the travelalertsJSON file 
                const alertObject = {
                    country: country["alpha-2"],
                    name: country.name,
                    text: alertInfo["eng"]["advisory-text"],
                    date: alertInfo["date-published"]["date"],
                    region: country.region,
                    subregion: country["sub-region"]
                };
                alertsArray.push(alertObject);
            } else {
                // Alert property does not exist  in the travelalertsJSON file
                const customAlertObject = {
                    country: country["alpha-2"],
                    name: country.name,
                    text: "No travel alerts",
                    date: "",
                    region: country.region,
                    subregion: country["sub-region"]
                };
                alertsArray.push(customAlertObject);
            }
        }

        await dbRtns.addMany(db, cfg.alertscollection, alertsArray);

        results += `added ${alertsArray.length} documents to the alerts function.`;

        console.log(results);

        process.exit(0);

    } catch (err) {
        console.log(err);
        process.exit(1);
    } finally {
        return { results: results};
    }
}

export {loadAlerts};