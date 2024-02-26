import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  provinces,
  fullNameAndProvincePromise,
  transferPaymentsFromWebPromise,
  transferPaymentForProvincePromise,
} from "./lab2_routines.js";

const argv = yargs(hideBin(process.argv))
  .options({
    firstname: {
      demandOption: true,
      alias: "fname",
      describe: "Resident's first name",
      string: true,
    },
    lastname: {
      demandOption: true,
      alias: "lname",
      describe: "Resident's last name",
      string: true,
    },
    province: {
      demandOption: true,
      alias: "prov",
      describe: "Resident's home province",
      string: true,
      choices: provinces.map(provinces=>provinces.code),
    },
  })
  .help()
  .alias("help", "h")
  .parse();

let firstname = argv.firstname;
let lastname = argv.lastname;
let province = argv.province;

let fullNameProvince;
let gftAmount;

let gtfData;

//1st PROMISE
fullNameAndProvincePromise(firstname, lastname, province)
  .then((results) => {
    process.stdout.write(`${results.firstname}, ${results.lastname} lives in ${results.province}. `);
  })
  .catch((err) => {
    console.log(`Error ==> ${err}`);
  });


const prov = province.toLowerCase();
 //2ND PROMISE
 transferPaymentsFromWebPromise()
 .then((response) => {
    gtfData = response;

        //3RD PROMISE
        transferPaymentForProvincePromise(gtfData, prov)
        .then((response) => {
            console.log(`It received ${response} in transfer payments`);
        })
        .catch((err) => {
            console.log("Cannot retrieve the price")
        });
  })
  .catch((err) => {
    console.log(`The json file does not exist`);
  })
