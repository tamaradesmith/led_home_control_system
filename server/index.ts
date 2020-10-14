import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
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
routes(app);

app.use(function (req: Request, res: Response, next: NextFunction) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
  next(err);
});

// if (app.get("env") === "development" || app.get("env") === "test") {
//   app.use(
//     (
//       error: { message: string; status: number },
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ) => {
//       // const error = new Error("Not Found");
//       // error.status = 404;
//       //   next(error);
//       // //   console.log(error.message)
//       res.status(error.status || 500);
//       res.json({
//         message: error.message,
//         error: error,
//       });
//       next(error);
//     }
//   );
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(
//   (
//     error: { message: string; status: number },
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     res.status(error.status || 500);
//     res.json({
//       message: error.message,
//       error: {},
//     });
//   }
// );

const PORT = process.env.PORT;
// const ADDRESS: string = "0.0.0.0";

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
}
