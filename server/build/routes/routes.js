"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const DisplayController_1 = require("../src/controllers/DisplayController");
const _routes = [
    ["/", DisplayController_1.DisplayController],
];
exports.routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
