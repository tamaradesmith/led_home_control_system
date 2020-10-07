import { Application, Router } from "express";
import { DisplayController } from '../src/controllers/DisplayController';

const _routes: [string, Router][] = [
  ["/", DisplayController],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
