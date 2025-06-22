import { Router } from "express";
import { createBorrow, getBorrowedSummary } from "./borrow.controller";

const borrowRoute = Router()
    .post("/", createBorrow)
    .get("/", getBorrowedSummary)


export default borrowRoute;