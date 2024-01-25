import got from "got";
import { promises as fsp } from "fs";
import * as cfg from "./config.js";

const fileStatsFromFSPromise = async (fname) => {
    let stats;
    try {
      stats = await fsp.stat(fname);
    } catch (error) {
      error.code === "ENOENT" // doesn't exist
        ? console.log(`${cfg.countries} does not exist`)
        : console.log(error.message);
    }
    return stats;
  };

// const getJSONFromWWWPromise = async (url) => {
//   try{
//     const response = await got(url).json();
//     return response.data;
//   }catch(err){
//     console.log(err);
//   }
// };

const getJSONFromWWWPromise = async (url) => got(url).json();

const writeFileFromFSPromise = async (fname, ...rawdata) => {
  let filehandle;
  try {
    filehandle = await fsp.open(fname, "w");
    let dataToWrite = "";
    rawdata.forEach((element) => (dataToWrite += JSON.stringify(element))); // concatentate
    await fsp.writeFile(fname, dataToWrite); // returns promise
  } catch (err) {
    console.log(err);
  } finally {
    if (filehandle !== undefined) {
      await filehandle.close();
    }
  }
};

const readFileFromFSPromise = async (fname) => {
  let rawData;

  try {
    rawData = await fsp.readFile(fname, "utf-8"); //return promise
  } catch (error) {
    console.log(error);
  } finally {
    if (rawData !== undefined) return JSON.parse(rawData);
  }
}

export {
    fileStatsFromFSPromise,
    getJSONFromWWWPromise,
    writeFileFromFSPromise,
    readFileFromFSPromise,
}