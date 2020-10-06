"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import logger from "morgan";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// app.use(logger("dev"));
// app.use(cookieParser('keyboard_cat'));
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
const PORT = process.env.PORT;
// const ADDRESS: string = "0.0.0.0";
app.listen(PORT, () => {
    console.log(`Listening => Port: ${PORT}`);
});
