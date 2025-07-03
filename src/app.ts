import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import bookRoute from "./modules/book/book.route";
import borrowRoute from "./modules/borrow/borrow.route";

const app: Application = express();

app.use(cors({ origin: ["http://localhost:5173/"] }));
app.use(express.json());
app.use(cookieParser());


// APPLICATION ROUTE
app.use("/api/books", bookRoute);
app.use("/api/borrow", borrowRoute);


// ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Wellcome to my Library Management System API Server.")
});


// HANDLE NOT-FOUND HANDLER 
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            path: req.originalUrl,
            method: req.method
        }
    });
});

// HANDLE GLOBAL ERROR
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Server error:", err.message);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message
    });
});

export default app;