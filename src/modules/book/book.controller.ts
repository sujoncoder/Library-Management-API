import { Request, Response } from "express";
import Book from "./book.model";
import { handleError } from "../../utils/errorHandler";
import { IBook } from "./book.interface";


// CREATE BOOK
export const createBook = async (req: Request, res: Response) => {
    try {
        const bodyData: IBook = req.body;
        const book = await Book.create(bodyData);

        res.status(201).json({
            success: true,
            "message": "Book created successfully",
            data: book
        })
    } catch (error: any) {
        handleError(error, res);
    }
};


// GET BOOKS
export const getBooks = async (req: Request, res: Response) => {
    try {
        const bodyData: IBook = req.body;
        const book = await Book.create(bodyData);

        res.status(201).json({
            success: true,
            "message": "Book created successfully",
            data: book
        })
    } catch (error: any) {
        handleError(error, res);
    }
};