import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//Note: hideBin is a shorthand for process.argv.slice(2)
//      - bypass the first two arguments

const argv = yargs(hideBin(process.argv))
    .options({
        p1: {
            demandOption: true,
            alias: "province1",
            describe: "first province to compare transfer payments",
            string: true,
        },
        p2: {
            demandOption: true,
            alias: "province2",
            describe: "second province to compare transfer payments",
            string: true,
        },
    })
    .help()
    .alias("help", "h")
    .parse();

    //We have the ability to tell the *arguments* that the program requires.
    //Try
    //node .\args_example3.js --province1 onb --p2 bc 

    console.log(
        `you entered ${argv.p1} for province 1 and ${argv.p2} for province 2`
    );