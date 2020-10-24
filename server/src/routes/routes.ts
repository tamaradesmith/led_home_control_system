import { Application, Router } from "express";
import { DisplayController } from "../controllers/DisplayController";
import { ColourController } from "../controllers/ColourController";


const _routes: [string, Router][] = [
  ["/colours", ColourController],
  ["/displays", DisplayController],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};