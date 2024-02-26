import got from "got";

const getJSONFromWWWPromise = async (url) => got(url).json();

export { getJSONFromWWWPromise }