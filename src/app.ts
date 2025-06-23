import express, { Application, NextFunction, Request, Response } from "express";
import bookRoute from "./modules/book/book.route";
import borrowRoute from "./modules/borrow/borrow.route";
import connectDB from "./config/db";

const app: Application = express();

// APPLICATION LAYER
app.use(express.json());

// Database connection middleware
app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectDB();
        next();
    } catch (error: any) {
        console.error("Database connection error:", error.message);
        res.status(500).json({ message: "Database connection failed", success: false, error: error.message });
    }
});

// APPLICATION ROUTE
app.use("/api/books", bookRoute);
app.use("/api/borrow", borrowRoute);

// ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Wellcome to my Library Management System API Server.")
});


// ERROR HANDLING MIDDLEWARE  
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Server error:", err);
    res.status(500).json({ message: "Something went wrong", success: false, error: err.message });
});

export default app;