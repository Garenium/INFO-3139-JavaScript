import * as dbRtns from "./db_routines.js";
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"},
{"name":"John Smith", "age":24, "email": "js@abc.com"},
{"name":"Evan Lauersen", "age":30, "email": "el@abc.com"} ]`;
const addSomeUsers = async () => {
  let someUsers = JSON.parse(rawJSON);
  try {
    const db = await dbRtns.getDBInstance();
    let resultArray = someUsers.map(async (user) => {
      let result = await dbRtns.addOne(db, "users", user);
      result.value.acknowledged
        ? console.log(`added document to users collection`)
        : console.log(`document not added to users collection`);
    });
    resultArray.forEach((result) => console.log(result));
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};
addSomeUsers();
