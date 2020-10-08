"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = express_1.default();
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(morgan_1.default("dev"));
exports.app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
routes_1.routes(exports.app);
const PORT = process.env.PORT;
// const ADDRESS: string = "0.0.0.0";
exports.app.listen(PORT, () => {
    console.log(`Listening => Port: ${PORT}`);
});
