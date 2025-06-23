import app from "./app";
import { PORT } from "./config/constant";
import connectDB from "./config/db";



// SERVER START FUNCTION
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT} ➡️`);
        });
    } catch (error: any) {
        console.error("Failed to start server:", error.message);
    };
};

startServer();