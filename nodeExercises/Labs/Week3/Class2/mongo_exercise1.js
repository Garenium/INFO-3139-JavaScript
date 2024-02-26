import { getDBInstance } from "./db_routines.js";
const connectDb = async () => {
  try {
    let db = await getDBInstance();
    console.log(`established connection for ${db.databaseName} on Atlas`);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(); // we don't need to disconnect, connection pooled
  }
};
connectDb();
