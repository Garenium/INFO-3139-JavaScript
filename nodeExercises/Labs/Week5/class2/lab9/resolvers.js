import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
  countries: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.collection, {}, {});
  },
  countrybycode: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { Code: args.Code });
  },
  countrybyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { Name: args.Name });
  },
  addcountry: async (args) => {
    let db = await dbRtns.getDBInstance();
    let country = { Name: args.Name, Code: args.Code }; 
    let results = await dbRtns.addOne(db, cfg.collection, country);
    return results ? country : null;
  },
};
export { resolvers };
