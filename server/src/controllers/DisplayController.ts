import { NextFunction, Request, Response, Router } from "express";
const DisplayModel = require("../model/DisplayModel");

export const DisplayController: Router = Router();

interface Display {
  id: number | null;
  name: string | null;
  ipaddress: string;
  led_number: number;
}

DisplayController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const displays = await DisplayModel.getAll();
      res.status(200).send(displays);
    } catch (error) {
      next(error);
    }
  }
);

DisplayController.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const display = await DisplayModel.getOne(id);
      if (!display.message) {
        res.status(200).send(display[0]);
      } else {
        next(display);
      }
    } catch (error) {
      next(error);
    }
  }
);
DisplayController.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, ipaddress, led_number, id } = req.body;
    const info: Display = { name, ipaddress, led_number, id };
    const validDisplay = DisplayModel.validDisplay(info);
    if (!validDisplay.message) {
      try {
        const display = await DisplayModel.create(info);
        res.status(200).send(display[0]);
      } catch (error) {
        next(error);
      }
    } else {
      next({ message: validDisplay.message, status: 422 });
    }
  }
);

DisplayController.get(
  "/:id/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const display = await DisplayModel.getOne(id);
      res.status(200).send(display[0]);
    } catch (error) {
      next(error);
    }
  }
);
DisplayController.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const info = req.body.display;
    const validDisplay = await DisplayModel.validDisplay(info);
    if (validDisplay === true) {
      try {
        const display = await DisplayModel.update(id, info);
        res.status(200).send(display[0]);
      } catch (error) {
        next(error);
      }
    } else {
      
      next({ message: validDisplay.message, status: 422 });
    }
  }
);

DisplayController.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const display = await DisplayModel.delete(id)
      res.status(200).send(display)
    } catch (error) {
      next(error);
    }
  }
);