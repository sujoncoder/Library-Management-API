import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "./book.controller";


const bookRoute = Router();
bookRoute.post("/", createBook)
bookRoute.get("/", getBooks)
bookRoute.get("/:bookId", getBookById)
bookRoute.patch("/:bookId", updateBook)
bookRoute.delete("/:bookId", deleteBook)

export default bookRoute;