import got from "got";
import { promises as fsp } from "fsp";

const fileStatsFromFSPromise = async (fname) => {

};

const getJSONFromWWWPromise = (url) => got(url).json();

const writeFileFromFSPromise = async (fname, ...rawdata) => {

};

const readFileFromFSPromise = async (fname) => {

}

export {
    fileStatsFromFSPromise,
    getJSONFromWWWPromise,
    writeFileFromFSPromise,
    readFileFromFSPromise,
}