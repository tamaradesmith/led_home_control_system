"use strict";
import { Router, NextFunction, Request, Response } from "express";
var express = require("express");

export const ShowController: Router = express.Router();

import { ShowModel } from "../model/ShowModel";

// TYPES

ShowController.get(
  "/types",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const types = await ShowModel.getShowTypes();
      res.status(200).send(types);
    } catch (error) {
      next(error);
    }
  }
);

// TEST SHOWS

ShowController.post(
  "/test",
  async (req: Request, res: Response, next: NextFunction) => {
    const { display, show, type } = req.body;
    try {
      const result = await ShowModel.testShow(display, show, type);
      res.status(200).send({message: result})
    } catch (error) {
      next(error);
    }
  }
);

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
    const cue = req.body.cue;
    const validShow = ShowModel.validShow(newShow, false);
    if (validShow === true) {
      try {
        const show = await ShowModel.create(newShow, cue);
        res.status(200).send({ id: show[0] });
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
    const { show, cue, delectLed } = req.body;
    const validShow = ShowModel.validShow(show, true);
    if (validShow === true) {
      try {
        const updatedShow = await ShowModel.update(id, show, cue, delectLed);

        res.status(200).send({ id: updatedShow[0] });
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
    const { cue } = req.body;
    const showId = parseInt(req.params.id);
    try {
      const savesCue = await ShowModel.createCue(showId, [cue]);
      res.status(200).send(savesCue[0]);
    } catch (error) {
      next(error);
    }
  }
);

ShowController.get(
  "/:id/cue",
  async (req: Request, res: Response, next: NextFunction) => {
    const showId: number = parseInt(req.params.id);
    try {
      const cue = await ShowModel.getOneCue(showId);
      res.status(200).send(cue);
    } catch (error) {
      next(error);
    }
  }
);

ShowController.patch(
  "/:id/cue/",
  async (req: Request, res: Response, next: NextFunction) => {
    const cue = req.body.cue;
    try {
      const updateCue = await ShowModel.updateCue(cue);
      res.status(200).send(updateCue[0]);
    } catch (error) {
     console.error("error", error);
      next(error);
    }
  }
);

ShowController.delete(
  "/:id/cue/:cueId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { cueId } = req.params;
    try {
      const cue = await ShowModel.deleteCue(cueId);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
