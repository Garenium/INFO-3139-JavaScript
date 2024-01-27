import * as rtnLib from "./file_routines.js";

const userFileExists = async () => {
  let filename = "./user.json";
  try {
    let fileStats = await rtnLib.fileStatsFromFSPromise(filename);
    if (!fileStats) {
      let users = [];
      let rawData = await rtnLib.readFileFromFSPromise("./users");
      rawData
        .toString()
        .split("\r\n")
        .map((user) => {
          if (user.length > 0) {
            let userJson = { Username: user, Email: user + "@abc.com" };
            users.push(userJson);
          }
        });
      await rtnLib.writeFileFromFSPromise(filename, JSON.stringify(users));
      console.log(`${filename} file written to file system`);
    } else {
      console.log(`${filename} already exists`);
    }
  } catch (err) {
    console.log(err);
    console.log(`${filename} file not written to file system`);
  }
};
userFileExists();
