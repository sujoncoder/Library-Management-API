"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const bookRoute = (0, express_1.Router)()
    .post("/", book_controller_1.createBook)
    .get("/", book_controller_1.getBooks)
    .get("/:bookId", book_controller_1.getBookById)
    .patch("/:bookId", book_controller_1.updateBook)
    .delete("/:bookId", book_controller_1.deleteBook);
exports.default = bookRoute;
