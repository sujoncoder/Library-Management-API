import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = 5000;