"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./modules/book/book.route"));
const borrow_route_1 = __importDefault(require("./modules/borrow/borrow.route"));
const app = (0, express_1.default)();
// APPLICATION LAYER
app.use(express_1.default.json());
// APPLICATION ROUTE
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
// ROOT ROUTE
app.get("/", (req, res) => {
    res.status(200).send("Wellcome to my Library Management System API Server.");
});
// HANDLE NOT-FOUND HANDLER 
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            path: req.originalUrl,
            method: req.method
        }
    });
});
// HANDLE GLOBAL ERROR
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message
    });
});
exports.default = app;
