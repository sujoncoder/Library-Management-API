"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedSummary = exports.createBorrow = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../book/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const errorHandler_1 = require("../../utils/errorHandler");
// CCREATE BORROW BOOK
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // CHECK MONGODB OBJECT_ID
        if (!mongoose_1.default.Types.ObjectId.isValid(book)) {
            res.status(400).json({
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
            });
            return;
        }
        ;
        const foundBook = yield book_model_1.default.findById(book);
        // CHECK IS BOOK EXIST OR NOT
        if (!foundBook) {
            res.status(400).json({
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
            });
            return;
        }
        ;
        // CHECK BOOK COPIES ARE AVAIBLE ABALE OR NOT
        if (foundBook.copies < quantity) {
            res.status(400).json({
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
            return;
        }
        ;
        // INSTANCE METHOD
        foundBook.updateAvailabilityAfterBorrow(quantity);
        yield foundBook.save();
        const borrowRecord = yield borrow_model_1.default.create({ book, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book brrowed successfully",
            data: borrowRecord
        });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
    ;
});
exports.createBorrow = createBorrow;
// GET BORROWED SUMMARY
const getBorrowedSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
    ;
});
exports.getBorrowedSummary = getBorrowedSummary;
