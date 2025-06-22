import express, { Application, Request, Response } from "express";
import bookRoute from "./modules/book/book.route";

const app: Application = express();

// APPLICATION LAYER
app.use(express.json());

// APPLICATION ROUTE
app.use("/api/books", bookRoute);

// ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Wellcome to my Library Management System API Server.")
});

export default app;