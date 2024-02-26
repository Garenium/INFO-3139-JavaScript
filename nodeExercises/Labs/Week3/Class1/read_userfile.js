import { readFileFromFSPromise } from "./file_routines.js";

const readUserFile = async () => {
    try{
        let users = [];
        let rawData = await readFileFromFSPromise("./users");
        rawData.toString()
        .split("\r\n")
        .forEach((user) => {
            if(user.length > 0){
                let userJson = {Username: user, Email: user+"@abc.com"};
                users.push(userJson);
            }
        });

        users.forEach((user) => {
            console.log(`user ==> ${user.Username}, email ==> ${user.Email}`);
        });
    }catch(err){
        console.log(err);
    }
};

readUserFile();

