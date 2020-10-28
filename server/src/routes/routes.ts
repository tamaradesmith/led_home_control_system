"use strict";
export {};
import { Application, Router } from "express";

import { DisplayController } from "../controllers/DisplayController";
import { ColourController } from "../controllers/ColourController";
import { ShowController } from "../controllers/ShowController";

const _routes: [string, Router][] = [
  ["/displays", DisplayController],
  ["/colours", ColourController],
  ["/shows", ShowController],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
