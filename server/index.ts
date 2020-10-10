import express, { Application, NextFunction, Request, Response } from "express";
import { routes } from "./routes/routes";

// const expressValidator = require("express-validator");
import logger from "morgan";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(expressValidator());

if (app.get("env") === "development") {
  app.use(
    (
      error: { message: string; status: number },
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.status(error.status || 500);
      res.json({
        message: error.message,
        error: error,
      });
    }
  );
}

// production error handler
// no stacktraces leaked to user
app.use(
  (
    error: { message: string; status: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
      error: {},
    });
  }
);

routes(app);

const PORT = process.env.PORT;
// const ADDRESS: string = "0.0.0.0";

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
}
