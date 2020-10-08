import { NextFunction, Request, Response, Router } from "express";
// import {DisplayModel} from '../model/DisplayModel';

export const DisplayController: Router = Router();

DisplayController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send("display index");
    } catch (error) {
      next(error);
    }
  }
);
DisplayController.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    // DisplayModel.validate('createDisplay'),
    // DisplayModel.createUser,
    try {
      res.status(200).send('Display Post route')
    } catch (error) {
      next(error);
    }
  }
);

DisplayController.get('/edit', (req: Request, res: Response, next: NextFunction) =>{
  try {
    res.status(200).send('Display Edit')
  } catch (error) {
    next(error)
  }
})
