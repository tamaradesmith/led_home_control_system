import { NextFunction, Request, Response, Router } from "express";


export const DisplayController: Router = Router();

DisplayController.get('/', async (req: Request, res: Response, next: NextFunction) =>{
  try {
    res.status(200).send('hi kittens')
  } catch (error) {
    next(error)
  }
})




