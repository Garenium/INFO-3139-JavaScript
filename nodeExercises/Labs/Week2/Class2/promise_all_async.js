import * as rtnLib from "./non_blocking_routines.js";
// using Promise.all with async/await
const promiseAllAsyncRtn = async (nameArray) => {
  try {
    // Promise.all runs all promises in parallel
    // if any reject the catch is fired
    let resultsArray = await Promise.all(
      nameArray.map((item) => {
        return rtnLib.reverseNameWithAPromise(item);
      })
    );
    console.log(`\nresults from promises using async/await:\n`);
    resultsArray.forEach((result) => console.log(result.reverseresults));
  } catch (err) {
    console.log(err.reverseresults);
  }
};
promiseAllAsyncRtn(["Bill", "Jane", "Bob"]);
// promiseAllAsyncRtn(["Bill", "Jane", "err", "Bob"]);
