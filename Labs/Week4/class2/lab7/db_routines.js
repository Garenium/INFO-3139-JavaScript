import { MongoClient } from "mongodb";
import * as cfg from "../config.js";
let db;
const getDBInstance = async () => {
  if (db) {
    console.log("using established connection");
    return db;
  }
  try {
    const client = new MongoClient(cfg.atlas); 
    console.log("establishing new connection to Atlas");
    const conn = await client.connect();
    db = conn.db(cfg.appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};

const getNameAndCode = async (rawData) => {

  try{
    let countries = [];

    rawData.forEach((country) => {
        if(country.name && country["alpha-2"]){
            let countryJson = { Name: country.name, Code: country["alpha-2"] }    
            countries.push(countryJson);
        }
    });

    return countries;
  }catch (err){
    console.log(err);
  }
}

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);
const count = (db, coll) => db.collection(coll).countDocuments();
const deleteAll = (db, coll) => db.collection(coll).deleteMany({});
const addMany = (db, coll, docs) => db.collection(coll).insertMany(docs);
const findOne= async (db, coll, criteria) => {
  try {
    const result = await db.collection(coll).findOne(criteria);
    return result; // Return only the country name
    
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

export { 
  getDBInstance, 
  addOne, 
  count, 
  deleteAll, 
  addMany, 
  findOne, 
  getNameAndCode 
};
