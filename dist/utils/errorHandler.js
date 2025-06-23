"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, res) => {
    // Handle mongoose validation error
    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors
            }
        });
    }
    ;
    // Handle duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const value = Object.values(error.keyValue)[0];
        return res.status(400).json({
            message: "Duplicate key error",
            success: false,
            error: {
                name: "DuplicateKeyError",
                field,
                value
            }
        });
    }
    // All other errors
    return res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message || error
    });
};
exports.handleError = handleError;
