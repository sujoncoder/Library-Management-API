import mongoose from "mongoose";
import { MONGODB_URI } from "./constant";

let cachedDb: mongoose.Connection | null = null;

const connectDB = async () => {
    if (cachedDb && mongoose.connection.readyState === 1) {
        console.log("Using cached MongoDB connection ✅");
        return cachedDb;
    }

    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            autoIndex: false,
        });

        cachedDb = mongoose.connection;
        console.log("Database connected successfully ✅");
        return cachedDb;
    } catch (error: any) {
        console.error("Database connection failed 🔥", error.message);
        throw error;
    }
};

export default connectDB;