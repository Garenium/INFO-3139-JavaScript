import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";
import * as rtnLib from "./lab4_routines.js";

const argv = yargs(hideBin(process.argv))
  .version(false)
  .options({
    version: {
      demandOption: false,
      describe: "Show version number",
      boolean: true,
    },
    refresh: {
      demandOption: false,
      describe: "Is a fresh copy from the web required?",
      string: true,
    },
    help: {
      demandOption: false,
      alias: "h",
      describe: "Show help",
      boolean: true,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

let refresh = argv.refresh;

const countries_lab4_function = async () => {

  try {

    //
    const doesFileExist = await rtnLib.fileStatsFromFSPromise(cfg.countries);

    //Does the file exist?
    //Is the user forcing to rewrite the countries.json file (with the refresh attribute)?
    //Check if the link exists, create/write it to the file, read the file.
    if (!doesFileExist || refresh === "--refresh") {
      //Get the link
      const jsonData = await rtnLib.getJSONFromWWWPromise(cfg.isocountries);

      //Write the contents of the link to the file 
      await rtnLib.writeFileFromFSPromise(
        cfg.countries,
        jsonData
      );
      console.log(`A new ${cfg.countries} file was written.`);

      //Read the newly written file
      const data = await rtnLib.readFileFromFSPromise(cfg.countries);
      const getStats = await rtnLib.fileStatsFromFSPromise(cfg.countries);

      console.log(`${cfg.countries} was created on ${getStats.ctime}`);
      console.log(`There are ${data.length} codes in ${cfg.countries}`)
    }
    else{
      //The file already exists
      console.log(`An existing ${cfg.countries} was already read from the file system.`);
      console.log(`${cfg.countries} was created on ${doesFileExist.ctime}`);
      const data = await rtnLib.readFileFromFSPromise(cfg.countries);
      console.log(`There are ${data.length} codes in ${cfg.countries}`)
    }

  } catch (err) {
    console.log(err);
  }
};

countries_lab4_function();
