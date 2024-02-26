import * as rtnLib from "./non_blocking_routines.js";
const promiseAllSettledAsyncRtn = async (nameArray) => {
  // Promise.allSettled won't fire the catch if a promise fails
  // object returned contains status and value if resolved or reason
  // if rejected
  try {
    let statusArray = await Promise.allSettled(
      nameArray.map((name) => {
        return rtnLib.reverseNameWithAPromise(name);
      })
    );
    console.log(`\nstatus from promises\n`);
    statusArray.forEach((result) => console.log(result.status));
    console.log(`\nresults from promise.allSettled with async/await\n`);
    statusArray.forEach((result) => {
      result.value // resolve
        ? console.log(result.value.reverseresults)
        : console.log(result.reason.reverseresults);
    });
  } catch (err) {
    // reject
    console.log(err.reverseresults);
  }
};
promiseAllSettledAsyncRtn(["Bill", "Jane", "err", "Bob"]);
