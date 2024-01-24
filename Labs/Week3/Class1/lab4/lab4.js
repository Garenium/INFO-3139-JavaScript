import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cntLib from "iso_country_routines.js";
import * as cfg from "./config.js";

const argv = yargs(hideBin(process.argv)).version(false)
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

