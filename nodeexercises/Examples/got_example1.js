import got from "got";

const dumpPage = async() => {
    try{
        const response = await got("https://fanshaweonline.ca");
        console.log(response.body);
        //=> '<!doctype html>...'
    }catch(error){
        console.log(error.response.body);
        //=> internal server error
    }
};

dumpPage();