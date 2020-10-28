"use strict";

import { Router, NextFunction, Request, Response } from "express";
var express = require("express");

export const ShowController: Router = express.Router();

import { ShowModel } from "../model/ShowModel";

// CRUD ROUTES

ShowController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shows = await ShowModel.getAll();
      res.status(200).send(shows);
    } catch (error) {
      next(error);
    }
  }
);

ShowController.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      const show = await ShowModel.getOne(id);
      if (!show.message) {
        res.status(200).send(show[0]);
      } else {
        next(show);
      }
    } catch (error) {
      next(error);
    }
  }
);

ShowController.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      await ShowModel.delete(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);


