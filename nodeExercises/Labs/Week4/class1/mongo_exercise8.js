import * as dbRtns from "./db_routines.js";
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"},
{"name":"John Smith", "age":24, "email": "js@abc.com"},
{"name":"Garen Ikezian", "age":30, "email": "gi@abc.com"} ]`;
const bulkLoadAndFindUsers = async () => {
  let someUsers = JSON.parse(rawJSON);
  try {
    const db = await dbRtns.getDBInstance();
    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "users");
    console.log(
      `deleted ${results.deletedCount} documents from users collection`
    );
    results = await dbRtns.addMany(db, "users", someUsers);
    console.log(
      `added ${results.insertedCount} documents to the user collection`
    );
    let someUser = await dbRtns.findOne(db, "users", { name: "Garen Ikezian" });
    let allDbUsers = await dbRtns.findAll(db, "users", {}, {}); // empty criteria and projection
    allDbUsers.forEach((user) =>
      console.log(`user ${user.name} is in the collection`)
    );
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
bulkLoadAndFindUsers();
