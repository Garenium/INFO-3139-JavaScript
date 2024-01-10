// Load the got module
import got from "got";

// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const dumpJson = async () => {
  const srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

  // Create a currency formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  try {
    const response = await got(srcAddr, { responseType: "json" });

    // strip out the Ontario amount
    const FISCAL_YEAR = "2022-2023";
    let abt = response.body.gtf.ab[FISCAL_YEAR];
    let bct = response.body.gtf.bc[FISCAL_YEAR];

    // format to currency
    let ab = formatter.format(abt);
    let bc = formatter.format(bct);

    // dump to the console using template literal
    console.log(`Alberta's transfer amount for 2022-2023 was ${ab}`);
    console.log(`British Columbia's transfer amount for 2022-2023 was ${bc}`);
    console.log(`BC received $${formatter.format(bct-abt)} more than Alberta for ${FISCAL_YEAR}`);
  } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
  }
};
dumpJson();
