import * as rtnLib from "./non_blocking_routines.js";
const someAsyncFunction = async (theVar) => {
  try {
    let results = await rtnLib.someRtnWithAPromise(theVar);
    console.log(`The 1st call ${results.val1} ${results.val2}`);
    results = await rtnLib.anotherRtnWithAPromise(theVar);
    console.log(`The 2nd call ${results.val1} ${results.val2} successful`);
    theVar = "err";
    results = await rtnLib.someRtnWithAPromise(theVar); // will fire catch
  } catch (err) {
    console.log(err);
  }
};
let someVar = "no error";
someAsyncFunction(someVar);
