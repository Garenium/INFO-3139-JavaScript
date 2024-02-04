import {config} from "dotenv";
config();
export const isocountries = process.env.ISOCOUNTRIES;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const collectionname = process.env.COLLECTION;
export const port = process.env.PORT;