import express, { Application, Request, Response } from "express";

const app: Application = express();

// APPLICATION LAYER
app.use(express.json());

// ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Wellcome to my Library Management System API Server.")
});

export default app;