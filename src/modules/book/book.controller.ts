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
        const filterGenre = req.query.filter as string;
        const sortBy = req.query.sortBy as string || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit as string) || 10;


        const filterObj = filterGenre ? {
            genre: filterGenre
        } : {};

        const sortObj: Record<string, number> = {};
        sortObj[sortBy] = sortOrder;

        const books = await Book.find(filterObj).sort(sortObj).limit(limit);


        res.status(200).json({
            success: true,
            "message": "Books retrived successfully",
            data: books
        })
    } catch (error: any) {
        handleError(error, res);
    }
};