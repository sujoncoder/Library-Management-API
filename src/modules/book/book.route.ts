import { Router } from "express";
import { createBook, getBooks } from "./book.controller";


const bookRoute = Router()
    .post("/", createBook)
    .get("/", getBooks)

export default bookRoute;