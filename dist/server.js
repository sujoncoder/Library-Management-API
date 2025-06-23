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
const app_1 = __importDefault(require("./app"));
const constant_1 = require("./config/constant");
const db_1 = __importDefault(require("./config/db"));
// APP LISTENING
// app.listen(PORT, async () => {
//     try {
//         await connectDB();
//         console.log(`Server is running on ${PORT} ➡️`);
//     } catch (error) {
//     }
// });
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        app_1.default.listen(constant_1.PORT, () => {
            console.log(`Server is running on http://localhost:${constant_1.PORT} ➡️`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error.message);
    }
});
startServer();
