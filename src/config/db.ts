import mongoose from "mongoose";
import { MONGODB_URI } from "./constant";



const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        };

        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully ✅");
    } catch (error: any) {
        console.log("Database connection failed 🔥", error.message);
        process.exit(1);
    }
};

export default connectDB;