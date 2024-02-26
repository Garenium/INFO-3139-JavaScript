import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  provinces,
  fullNameAndProvincePromise,
  transferPaymentsFromWebPromise,
  transferPaymentForProvincePromise,
} from "./lab3_routines.js";

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
      choices: provinces.map((provinces) => provinces.code),
    },
  })
  .help()
  .alias("help", "h")
  .parse();

let firstname = argv.firstname;
let lastname = argv.lastname;
let province = argv.province;

let gtfData;

const someAsyncFunction = async (userInput) => {
  try {
    let results = await fullNameAndProvincePromise(
      userInput.firstname,
      userInput.lastname,
      userInput.province
    );

    process.stdout.write(
      `${results.firstname}, ${results.lastname} lives in ${results.province}. `
    );

    gtfData = await transferPaymentsFromWebPromise();

    let prov = results.province.toLowerCase();
    let paymentData = await transferPaymentForProvincePromise(gtfData, prov);
    console.log(`It received ${paymentData} in transfer payments`)

    let paymentDataArr = await Promise.allSettled(
      provinces.map((provinces) => {
        prov = provinces.code.toLowerCase();
        return transferPaymentForProvincePromise(gtfData, prov);
      })
    );

    console.log("\nTransfer payments by province/territory\n");

    for(let i = 0; i < paymentDataArr.length; i++){
      if(results.province == provinces[i].code){
        console.log(`\x1b[1m\t${provinces[i].name} had a transfer payment of ${paymentDataArr[i].value}`);
      }else{
        console.log(`\x1b[0m\t${provinces[i].name} had a transfer payment of ${paymentDataArr[i].value}`);
      }
    }

  } catch (err) {
    console.log(err);
  }
};
someAsyncFunction({ firstname, lastname, province });