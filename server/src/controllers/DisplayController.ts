import { NextFunction, Request, Response, Router } from "express";

import { DisplayModel } from "../model/DisplayModel";

export const DisplayController: Router = Router();

interface Display {
  id: number | null;
  name: string | null;
  ipaddress: string;
  led_number: number;
}

// SPECIAL ROUTES

DisplayController.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await DisplayModel.searchAll();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

DisplayController.get(
  "/:id/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      const result = await DisplayModel.search(id);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

// CRUD ROUTES
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
      const id: number = parseInt(req.params.id);
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
    const { display } = req.body;
    try {
      const validDisplay = DisplayModel.validDisplay(display);
      if (!validDisplay.message) {
        try {
          const saveDisplay = await DisplayModel.create(display);
          res.status(200).send(saveDisplay[0]);
        } catch (error) {
          next(error);
        }
      } else {
        next({ message: validDisplay.message, status: 422 });
      }
    } catch (error) {
      next(error);
    }
  }
);

DisplayController.get(
  "/:id/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
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
    const id: number = parseInt(req.params.id);

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
      const id: number = parseInt(req.params.id);
      const display = await DisplayModel.delete(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
