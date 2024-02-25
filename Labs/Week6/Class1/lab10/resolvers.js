import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
  countries: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.collection, {}, {});
  },
  countrybycode: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { code: args.code });
  },
  countrybyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { name: args.name });
  },
  alerts: async () => {
    let db = await dbRtns.getDBInstance();
    let results = await dbRtns.findAll(db, cfg.collection);
    return results ? results : null;
  },
  alertsforregion: async (args) => {
    let db = await dbRtns.getDBInstance();
    let results = await dbRtns.findAll(db, cfg.collection, { region: args.region });
    console.log("Returning " + results.length + " regions of " + args.region);
    return results ? results : null;
  },
  alertsforsubregion: async (args) => {
    let db = await dbRtns.getDBInstance();
    let results = await dbRtns.findAll(db, cfg.collection, { subregion: args.subregion });
    console.log("Returning: " + results.length + " subregions of " + args.subregion);
    return results ? results : null;
  },
};
export { resolvers };
