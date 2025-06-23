import mongoose from "mongoose";
import { MONGODB_URI } from "./constant";



let cached = false;

const connectDB = async () => {

    if (cached || mongoose.connection.readyState === 1) return;

    if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            autoIndex: false,
        });

        cached = true;
        console.log("Database connected successfully ✅");

    } catch (error: any) {
        console.error("Database connection failed 🔥", error.message);
        throw error;
    }
};

export default connectDB;