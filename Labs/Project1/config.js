import {config} from 'dotenv';
config();
export const atlas = process.env.ATLAS;
export const db = process.env.DB;
export const travelalerts = process.env.TRAVELALERTS;
export const isocountries = process.env.ISOCOUNTRIES;
export const alertscollection = process.env.ALERTCOLLECTION;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQLURL;