import dotenv from "dotenv";
dotenv.config();

export const JWT_PASSWORD = process.env.JWT_PASSWORD;
export const MONGO_URL = process.env.MONGO_URL;
