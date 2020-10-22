import { NextFunction, Request, Response, Router } from "express";

import { ColourModel } from "../model/ColourModel";

export const ColourController: Router = Router();

interface Colour {
  id?: number;
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
}

// CRUD ROUTES

ColourController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const colours = await ColourModel.getAll();
      res.status(200).send(colours);
    } catch (error) {
      next(error);
    }
  }
);
ColourController.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      const colour = await ColourModel.getOne(id);
      res.status(200).send(colour[0]);
    } catch (error) {
      next(error);
    }
  }
);

ColourController.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const colour: Colour = req.body.colour;
    const valid =  ColourModel.validColour(colour);
    if (valid) {
      try {
        const savedColour = await ColourModel.create(colour);
        res.status(200).send(savedColour[0]);
      } catch (error) {
        next(error);
      }
    } else {
      next(new Error('Invalid Data'))
    }
  }
);
