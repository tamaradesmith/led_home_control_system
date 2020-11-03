"use strict";
import { NextFunction, Request, Response, Router } from "express";
var express = require("express");

export const ColourController: Router = express.Router()

import { ColourModel } from "../model/ColourModel";

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
        if (!colour.message) {
          res.status(200).send(colour[0]);
        } else {
          next(colour);
        }
    } catch (error) {
      next(error);
    }
  }
);

ColourController.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const colour: Colour = req.body.colour;
    if (ColourModel.validColour(colour)) {
      try {
        const savedColour = await ColourModel.create(colour);
        console.log("savedColour", savedColour);
        res.status(200).send(savedColour[0]);
      } catch (error) {
        console.log("error", error);
        next(error);
      }
    } else {
      next(new Error("Invalid Data"));
    }
  }
);

ColourController.get(
  "/:id/edit",
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

ColourController.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const colour = req.body.colour;
    const id = parseInt(req.params.id);
    if (ColourModel.validColour(colour)) {
      try {
        const savedColour = await ColourModel.update(id, colour);
        res.status(200).send(savedColour[0]);
      } catch (error) {
        next(error);
      }
    } else {
      next(new Error("Invalid Data"));
    }
  }
);

ColourController.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      await ColourModel.delete(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

