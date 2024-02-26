import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { loadAlerts } from "./project1_setup.js";
const resolvers = {
  project1_setup: async () => {

    let results = await loadAlerts();
    console.log(results);

    return results;

  },
};
export { resolvers };
