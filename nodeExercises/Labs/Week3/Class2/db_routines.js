import { MongoClient } from "mongodb";
import * as cfg from "./config.js";
let db;
const getDBInstance = async () => {
  if (db) {
    console.log("using established connection");
    return db;
  }
  try {
    const client = new MongoClient(cfg.atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("establishing new connection to Atlas");
    const conn = await client.connect();
    db = conn.db(cfg.appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);
const count = (db, coll) => db.collection(coll).countDocuments();
export { getDBInstance, addOne, count };
