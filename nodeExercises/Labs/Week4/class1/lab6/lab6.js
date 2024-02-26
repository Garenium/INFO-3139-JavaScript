import * as dbRtns from "./db_routines.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import got from "got";
import * as cfg from "./config.js";

const argv = yargs(hideBin(process.argv))
  .options({
    code: {
      demandOption: true,
      describe: "Name of the country",
      string: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

const Lab6Function= async () => {

  try {

    //Obtain data from the github link
    // const rawData = await dbRtns.getRawData();
    const response = await got(cfg.isocountries, { responseType: "json" });
    let rawData = response.body;

    // console.log(rawData);

    const db = await dbRtns.getDBInstance();
    let results = await dbRtns.count(db, "countries");
    console.log(
      `There are currently ${results} documents from countries collection`
    );

    //Delete any documents in a collection called countries on Atlas
    results = await dbRtns.deleteAll(db, "countries");
    console.log(
      `deleted ${results.deletedCount} documents from countries collection`
    );

    //Map through the new array from step 1 and create a series of new objects
    //consisting of only 2 properties
    const countries = await dbRtns.getNameAndCode(rawData);
    // console.log(countries);

    //Bulk load the new array into a collection on Atlas called countries
    results = await dbRtns.addMany(db, "countries", countries);
    console.log(
      `there are now ${results.insertedCount} documents to the countries collection`
    );

    //search the Atlas collection for the code entered by the user and log the corresponding name
    const getCountryName = await dbRtns.findOne(db, "countries", { Code: argv.code });
    if(getCountryName){
      console.log(`The code ${argv.code} belongs to the country of ${getCountryName.Name}`);
    }
    else{
      console.log(`The code ${argv.code} is not a known country alpha-3 code`);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

Lab6Function();
