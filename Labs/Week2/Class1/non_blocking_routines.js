import got from "got";

// some valuable routine that we'll export so others can use it
const someRtnUsingOldSchoolCallback = (var1, callback) => {
  // make sure callback is a function
  if (callback && typeof callback === "function") {
    // check to see if var1 is err
    var1 === "err"
      ? // fire the callback either way
        callback("error happened in module", undefined) // simulate an error has occurred
      : callback("", { val1: "was", val2: "successful" });
  } else {
    console.log(
      "Error ==> no callback passed to someRtnUsingOldSchoolCallback"
    );
  }
};

// another valuable routine
const internalNameRtn = (callback) => {
  // make sure callback is a function
  if (callback && typeof callback === "function") {
    // we won't test for an error in this one
    callback(undefined, { val1: "was", val2: "successful" });
  } else {
    console.log("no callback passed to internalNameRtn");
  }
};

//another routine, this time with a promise
const someRtnWithAPromise = (var1) => {
  return new Promise((resolve, reject) => {
    if (var1 === "err") {
      //Reject the Promise with an error
      reject("some error");
    } else {
      //Resolve (or fulfill) the Promise with data
      let data = { val1: "was", val2: "successful" };
      resolve(data);
    }
  });
};

const anotherRtnWithAPromise = (var1) => {
  return new Promise((resolve, reject) => {
    if (var1 === "err") {
      //Reject the Promise with an error
      reject("yet another error");
    } else {
      //Resolve (or fulfill) the Promise with data
      let data = { val1: "was", val2: "more", val3: "successful" };
      resolve(data);
    }
  });
};

// note we’re using.then/.catch syntax here
const ontarioTransferPaymentPromise = () => {
  let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
  return new Promise((resolve, reject) => {
    got(srcAddr, { responseType: "json" })
      .then((response) => {
        let ont = response.body.gtf.on["2022-2023"];
        resolve(ont);
      })
      .catch((err) => {
        console.log(`Error ==> ${err}`);
        reject(err);
      });
  });
};

export {
  someRtnUsingOldSchoolCallback,
  internalNameRtn as anotherOldSchoolCallbackRtn,
  someRtnWithAPromise,
  anotherRtnWithAPromise,
  ontarioTransferPaymentPromise,
};
