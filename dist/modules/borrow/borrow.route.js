"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRoute = (0, express_1.Router)()
    .post("/", borrow_controller_1.createBorrow)
    .get("/", borrow_controller_1.getBorrowedSummary);
exports.default = borrowRoute;
