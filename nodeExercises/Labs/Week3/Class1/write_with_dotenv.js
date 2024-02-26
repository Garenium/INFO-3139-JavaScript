import * as rtnLib from "./file_routines.js";
import * as cfg from "./config.js";

const dotEnvWrite = async () =>{
    try {
        let fileStats = await rtnLib.fileStatsFromFSPromise(cfg.userobjects);
        if (!fileStats) {
          let users = [];
          let rawData = await rtnLib.readFileFromFSPromise(cfg.rawdata);
          rawData
            .toString()
            .split("\r\n")
            .map((user) => {
              if (user.length > 0) {
                let userJson = { Username: user, Email: user + "@abc.com" };
                users.push(userJson);
              }
            });
          await rtnLib.writeFileFromFSPromise(cfg.userobjects, users);
          console.log(`${cfg.userobjects} file written to file system`);
        } else {
          console.log(`${cfg.userobjects} already exists`);
        }
      } catch (err) {
        console.log(err);
        console.log(`${cfg.userobjects} file not written to file system`);
      }
}

dotEnvWrite();