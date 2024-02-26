import { config } from "dotenv";
config(); // Make sure dotenv is properly configured
export const countries = process.env.COUNTRIES;
export const isocountries = process.env.ISOCOUNTRIES;