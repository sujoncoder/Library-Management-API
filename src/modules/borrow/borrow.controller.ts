import { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../book/book.model";
import Borrow from "./borrow.model";
import { handleError } from "../../utils/errorHandler";

// CCREATE BORROW BOOK
export const createBorrow = async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(book)) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: {
                        book: {
                            message: "Invalid book ID format",
                            name: "CastError",
                        },
                    },
                },
            })
        };

        const foundBook = await Book.findById(book);

        if (!foundBook) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    eerrors: {
                        book: {
                            message: `No book found with ID ${book}`,
                            name: "NotFoundError",
                        },
                    },
                },
            })
        }



        if (foundBook.copies < quantity) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: {
                        quantity: {
                            message: `Only ${foundBook.copies} copies are available`,
                            name: "BusinessRuleError",
                        },
                    },
                },
            });
        }


        foundBook.updateAvailabilityAfterBorrow(quantity);

        await foundBook.save();

        const borrowRecord = await Borrow.create({ book, quantity, dueDate });

        res.status(201).json({
            success: true,
            message: "Book brrowed successfully",
            data: borrowRecord
        });
    } catch (error) {
        handleError(error, res)
    }
};


// GET BORROWED SUMMARY
export const getBorrowedSummary = async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ]);


        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    } catch (error) {
        handleError(error, res)
    }
};