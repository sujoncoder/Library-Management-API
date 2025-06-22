import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "./book.controller";


const bookRoute = Router()
    .post("/", createBook)
    .get("/", getBooks)
    .get("/:bookId", getBookById)
    .patch("/:bookId", updateBook)
    .delete("/:bookId", deleteBook)

export default bookRoute;