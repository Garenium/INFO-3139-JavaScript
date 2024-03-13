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
    //alerts for every coutnry are all unique
    let countries = await p1.loadAlerts();

    // console.log(countries);
    return countries;
  },
  add_advisory: async (args) => {
    console.log("THIS IS ADD_ADVISORY");
    console.log(args.name);
    console.log(args.country);
    let advisories = await p1.addAdvisory(args);
    console.log(advisories); 
    return advisories;
  },
  list_advisories_by_name: async (args) => {
    console.log("THIS IS LIST_ADVISORIES_BY_NAME");
    let advisories = await p1.listAdvisoryByName(args);
    return advisories;
  },
  alerts_for_region: async (args) => {
    console.log("THIS IS LIST_ADVISORIES_BY_NAME");
    let countries = await p1.listAdvisoryByRegion(args);
    
    return countries;
  },
  alerts_for_subregion: async (args) => {
    console.log("THIS IS LIST_ADVISORIES_BY_NAME");
    let countries = await p1.listAdvisoryBySubregion(args);
    return countries;
  }
 
};
export { resolvers };
