import { someRtnWithAPromise, anotherRtnWithAPromise } from "./non_blocking_routines.js";

let someParam = "no err";
//use promise rtn 1
someRtnWithAPromise(someParam)
    .then((results)=>{
        console.log(`The 1st call ${results.val1} ${results.val2}`);
        //use promise rtn 2
        return anotherRtnWithAPromise(someParam);
    })//here's the 2nd link in the chain
    .then((results) => {
        console.log(`The 2nd call ${results.val1} ${results.val2} ${results.val3}`);
        someParam = "err";
        return someRtnWithAPromise(someParam);  //will fire catch
    })
    .then((results) => console.log("we never get here"))
    .catch((err) => {
        console.log(`Error ==> ${err}`);
        process.exit(1,err);
    })