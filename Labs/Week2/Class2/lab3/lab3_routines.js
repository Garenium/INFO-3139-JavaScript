import got from "got";
const provinces = [
  { code: "NS", name: "Nova Scotia" },
  { code: "NL", name: "Newfoundland" },
  { code: "NB", name: "New Brunswick" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "ON", name: "Ontario" },
  { code: "MB", name: "Manitoba" },
  { code: "SK", name: "Saskatchewan" },
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "NT", name: "North West Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon Territory" },
];
const FISCALYEAR = "2022-2023";

let provincesCodes = provinces.map(provinces => provinces.code);

// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(numberToFormat);

// note we’re using.then/.catch syntax here
const transferPaymentsFromWebPromise = () => {
  let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
  return new Promise((resolve, reject) => {
    got(srcAddr, { responseType: "json" })
      .then((response) => { 
        resolve(response.body.gtf);
      })
      .catch((err) => {
        console.log(`Error ==> ${err}`);
        reject(err);
      });
  });
};

const transferPaymentForProvincePromise = (gtfData, provCode) => {
    return new Promise((resolve, reject) => {
         let value = gtfData[provCode][FISCALYEAR];
         if(value != null) {
            resolve(currencyFormatter(value));
         }else{
            reject(err);
         }
      });
}

// note we’re using.then/.catch syntax here
const fullNameAndProvincePromise = (firstname, lastname, province) => {
  return new Promise((resolve, reject) => {
      if(provinces.map(provinces => provinces.code).includes(province)){
        resolve({firstname, lastname, province});
      }else{
        reject("Province not found");
      }
  });
};

export { 
    provinces, 
    currencyFormatter,
    fullNameAndProvincePromise,
    transferPaymentsFromWebPromise,
    transferPaymentForProvincePromise,
};
