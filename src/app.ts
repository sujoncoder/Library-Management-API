import express, { Application, NextFunction, Request, Response } from "express";
import bookRoute from "./modules/book/book.route";
import borrowRoute from "./modules/borrow/borrow.route";

const app: Application = express();

// APPLICATION LAYER
app.use(express.json());


// APPLICATION ROUTE
app.use("/api/books", bookRoute);
app.use("/api/borrow", borrowRoute);


// ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Wellcome to my Library Management System API Server.")
});


// ERROR HANDLING MIDDLEWARE  
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Server error:", err.message);
    res.status(500).json({
        message: "Something went wrong",
        success: false, error: err.message
    });
});

export default app;