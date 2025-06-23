import { NextFunction, Request, Response } from "express";
import app from "./app";
import { PORT } from "./config/constant";
import connectDB from "./config/db";


// APP LISTENING
// app.listen(PORT, async () => {
//     try {
//         await connectDB();
//         console.log(`Server is running on ${PORT} ➡️`);
//     } catch (error) {

//     }
// });


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT} ➡️`);
        });
    } catch (error: any) {
        console.error("Failed to start server:", error.message);
    }
};

startServer();