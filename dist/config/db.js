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
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = require("./constant");
let cached = false;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cached || mongoose_1.default.connection.readyState === 1)
        return;
    if (!constant_1.MONGODB_URI)
        throw new Error("MONGODB_URI is not defined");
    try {
        yield mongoose_1.default.connect(constant_1.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            autoIndex: false,
        });
        cached = true;
        console.log("Database connected successfully ✅");
    }
    catch (error) {
        console.error("Database connection failed 🔥", error.message);
        throw error;
    }
});
exports.default = connectDB;
