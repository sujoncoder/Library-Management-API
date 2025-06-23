"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const book_model_1 = __importDefault(require("./book.model"));
const errorHandler_1 = require("../../utils/errorHandler");
// CREATE BOOK
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyData = req.body;
        const book = yield book_model_1.default.create(bodyData);
        res.status(201).json({
            success: true,
            "message": "Book created successfully",
            data: book
        });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
    ;
});
exports.createBook = createBook;
// GET BOOKS WITH FILTERING
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filterGenre = (_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const filterObj = filterGenre ? {
            genre: filterGenre
        } : {};
        const sortObj = [[sortBy, sortOrder]];
        const books = yield book_model_1.default.find(filterObj).sort(sortObj).limit(limit);
        res.status(200).json({
            success: true,
            "message": "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
    ;
});
exports.getBooks = getBooks;
// GET A BOOK BY ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        // CHECK MONGODB OBJECT_ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
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
            });
            return;
        }
        ;
        // FIND BOOK USING ID
        const book = yield book_model_1.default.findById(id);
        // CHECK IS BOOK EXIST OR NOT
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
            });
            return;
        }
        ;
        res.status(200).json({
            success: true,
            "message": "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
});
exports.getBookById = getBookById;
// UPDATE A BOOK BY ID
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        // CHECK MONGODB OBJECT_ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
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
            });
            return;
        }
        ;
        const updateBook = yield book_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        // CHECK IS BOOK EXIST OR NOT
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
            });
            return;
        }
        ;
        res.status(200).json({
            success: true,
            "message": "Book updated successfully",
            data: updateBook
        });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
});
exports.updateBook = updateBook;
// DELETE A BOOK BY ID
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        // CHECK MONGODB OBJECT_ID
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
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
            });
            return;
        }
        ;
        const deleteBook = yield book_model_1.default.findByIdAndDelete(id, { new: true });
        // CHECK IS BOOK EXIST OR NOT
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
            });
            return;
        }
        ;
        res.status(200).json({
            success: true,
            "message": "Book deleted successfully",
            data: deleteBook
        });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, res);
    }
    ;
});
exports.deleteBook = deleteBook;
