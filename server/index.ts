import express, {
  Application,
  // ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import { routes } from "./routes/routes";

interface Error {
  status?: number;
  message?: string;
}
// const expressValidator = require("express-validator");
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors = require("cors");
// const methodOverride = require("method-override");

import dotenv from "dotenv";
dotenv.config();

export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: "http://localhost:8181", credentials: true }));

routes(app);

app.use(function (req: Request, res: Response, next: NextFunction) {
  const error = new Error("Not Found");
  next(error);
});

app.use(function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error: req.app.get("env") === "development" ? error : {},
  });
  next(error);
});


const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
}
