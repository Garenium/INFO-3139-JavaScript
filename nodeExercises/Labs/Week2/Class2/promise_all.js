import * as rtnLib from "./non_blocking_routines.js";
const promiseAllRtn = (nameArray) => {
 // Promise.all quits on first catch
 Promise.all(
 // note the .map here will create a new array
 nameArray.map((name) => {
 return rtnLib.reverseNameWithAPromise(name);
 })
 )
 .then((resultsArray) => {
 console.log(`\nresults from promises:\n`);
 resultsArray.map((result) => console.log(result.reverseresults));
 })
 .catch((err) => console.log(err.reverseresults));
};
promiseAllRtn(["Bill", "Jane", "Bob"]);
// promiseAllRtn(["Bill", "Jane", "err", "Bob"]);