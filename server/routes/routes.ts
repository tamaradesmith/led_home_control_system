import { Application, Router } from "express";
import { DisplayController } from "../src/controllers/DisplayController";
import { ColourController } from "../src/controllers/ColourController";

const _routes: [string, Router][] = [

  ["/displays", DisplayController],
  ["/colours", ColourController],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
