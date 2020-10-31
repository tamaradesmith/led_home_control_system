"use strict";
import { Router, NextFunction, Request, Response } from "express";
var express = require("express");

export const ShowController: Router = express.Router();

import { ShowModel } from "../model/ShowModel";
import { PatternModel } from "../model/PatternModel";

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

ShowController.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const newShow = req.body.show;
    const validShow = ShowModel.validShow(newShow, false);
    if (validShow === true) {
      try {
        const show = await ShowModel.create(newShow);
        res.status(200).send(show[0]);
      } catch (error) {
        next(error);
      }
    } else {
      next(validShow);
    }
  }
);

ShowController.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    const show = req.body.show;
    const validShow = ShowModel.validShow(show, true);
    if (validShow === true) {
      try {
        const updatedShow = await ShowModel.update(id, show);
        res.status(200).send(updatedShow[0]);
      } catch (error) {
        next(error);
      }
    } else {
      next(validShow);
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

// Special Routes

// CUE LED ROUTES

ShowController.post(
  "/:id/cue",
  async (req: Request, res: Response, next: NextFunction) => {
    const cue = req.body.cue;
    try {
      const savesCue = await PatternModel.create(cue);
      res.status(200).send(savesCue[0]);
    } catch (error) {
      next(error);
    }
  }
);

ShowController.get(
  "/:id/cue",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    try {
      const cue = await PatternModel.getOne(id);
      res.status(200).send(cue);
    } catch (error) {
      next(error);
    }
  }
);

ShowController.patch(
  "/:id/cue",
  async (req: Request, res: Response, next: NextFunction) => {
    const cue = req.body.cue;
    try {
      const updateCue = await PatternModel.update(cue);
      res.status(200).send(updateCue[0])
    } catch (error) {
      next(error);
    }
  }
);
