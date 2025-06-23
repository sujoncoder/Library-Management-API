import { Request, Response, RequestHandler } from "express";
import mongoose, { Types } from "mongoose";
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
        const filterGenre = (req.query.filter as string)?.toUpperCase();
        const sortBy = req.query.sortBy as string || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit as string) || 10;


        const filterObj = filterGenre ? {
            genre: filterGenre
        } : {};

        const sortObj: [string, 1 | -1][] = [[sortBy, sortOrder]];

        const books = await Book.find(filterObj).sort(sortObj).limit(limit);


        res.status(200).json({
            success: true,
            "message": "Books retrieved successfully",
            data: books
        })
    } catch (error: any) {
        handleError(error, res);
    }
};


// GET A BOOK BY ID
export const getBookById = async (req: Request, res: Response) => {
    try {

        const id = req.params.bookId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID format",
                error: {
                    name: "ValidationError",
                    errors: {
                        _id: {
                            message: "Invalid book ID format",
                            name: "CastError",
                        },
                    },
                },
            })
            return
        };

        const book = await Book.findById(id);

        if (!book) {
            res.status(400).json({
                success: false,
                message: "Book not found",
                error: {
                    name: "ValidationError",
                    errors: {
                        book: {
                            message: `No book found with ID ${id}`,
                            name: "NotFoundError",
                        },
                    },
                },
            })
            return
        }

        res.status(200).json({
            success: true,
            "message": "Book retrieved successfully",
            data: book
        })
    } catch (error: any) {
        handleError(error, res);
    }
};


// UPDATE A BOOK BY ID
export const updateBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID format",
                error: {
                    name: "ValidationError",
                    errors: {
                        _id: {
                            message: "Invalid book ID format",
                            name: "CastError",
                        },
                    },
                },
            })
            return
        };

        const updateBook = await Book.findByIdAndUpdate(id, req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateBook) {
            res.status(400).json({
                success: false,
                message: "Book not found",
                error: {
                    name: "ValidationError",
                    errors: {
                        book: {
                            message: `No book found with ID ${id}`,
                            name: "NotFoundError",
                        },
                    },
                },
            })
            return
        }

        res.status(200).json({
            success: true,
            "message": "Book updated successfully",
            data: updateBook
        })
    } catch (error: any) {
        handleError(error, res);
    }
};


// DELETE A BOOK BY ID
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;

        if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID format",
                error: {
                    name: "ValidationError",
                    errors: {
                        _id: {
                            message: "Invalid book ID format",
                            name: "CastError",
                        },
                    },
                },
            })
            return
        };

        const deleteBook = await Book.findByIdAndDelete(id, { new: true });

        if (!deleteBook) {
            res.status(400).json({
                success: false,
                message: "Book not found",
                error: {
                    name: "ValidationError",
                    errors: {
                        book: {
                            message: `No book found with ID ${id}`,
                            name: "NotFoundError",
                        },
                    },
                },
            })
            return
        }

        res.status(200).json({
            success: true,
            "message": "Book deleted successfully",
            data: deleteBook
        });

    } catch (error: any) {
        handleError(error, res);
    }
};