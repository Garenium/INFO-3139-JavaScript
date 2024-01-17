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

let fullNameProvince;
let gftAmount;

let gtfData;

const someAsyncFunction = async (userInput) => {
  try {
    let results = await fullNameAndProvincePromise(userInput.firstname, userInput.lastname, userInput.province);

    process.stdout.write(`${results.firstname}, ${results.lastname} lives in ${results.province}. `)
    // console.log(`${results.firstname}, ${results.lastname} lives in ${results.province}`)

    gtfData = await transferPaymentsFromWebPromise();
    // console.log("Sucess");

    const prov = results.province.toLowerCase();
    let paymentData = await transferPaymentForProvincePromise(gtfData, prov);
    //put console.log
    console.log();

  } catch (err) {
    console.log(err);
  }
};
someAsyncFunction({firstname, lastname, province});


//1st PROMISE
// const fullNameAndProvincePromise = async (firstname, lastname, province) => {

//   try {
//     process.stdout.write(`${results.firstname}, ${results.lastname} lives in ${results.province}. `);
//   }catch(err){
//     console.log(`Error ==> ${err}`);
//   }

// }

// const prov = province.toLowerCase();
//  //2ND PROMISE
// const transferPaymentsFromWebPromise = async (response) => {
//   try{
//     gtfData = response;

//         //3RD PROMISE
//         const transferPaymentForProvincePromise = async (gtfData, prov) => {
//           try{
//               console.log(`It received ${response} in transfer payments`);
//           }catch(err) {
//                     console.log("Cannot retrieve the price")
//           };
//         }

//   }catch (err){
//     console.log(`The json file does not exist`);
//   }
// }