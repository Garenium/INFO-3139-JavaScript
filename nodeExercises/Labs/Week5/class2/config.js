import { config } from "dotenv";
config();
export const atlas = process.env.DBURL;
export const db = process.env.DB;
export const collection = process.env.COLLECTION;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQLURL;