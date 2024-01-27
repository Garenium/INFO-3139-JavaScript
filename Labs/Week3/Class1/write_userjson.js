import {
    readFileFromFSPromise,
    writeFileFromFSPromise,
    } from "./file_routines.js";

const writeUserJson = async () => {
    try{
        let users = [];
        //rawData is returned as a buffer
        let rawData = await readFileFromFSPromise("./users");

        rawData
            .toString()
            .split("\r\n")
            .forEach((user) => {
                if(user.length > 0){
                    let userJson = {Username: user, Email: user + "@abc.com"}
                    users.push(userJson);
                }
            });

            await writeFileFromFSPromise("./user.json", users);
            console.log("user json file written to file system");
    }catch(err){
        console.log(err);
        console.log("user json file not written to file system");
    }
};

writeUserJson();