import express, {
  Application,
  ErrorRequestHandler,
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


// app.use(
//   methodOverride((req:Request, res: Response) => {
//     if (req.body && req.body._method) {
//       const method = req.body._method;
//       return method;
//     }
//   })
// );
// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "X-Access-Token",
//   ],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: "http://localhost:8081",
//   preflightContinue: false,
// };

//use cors middleware

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: "http://localhost:8181", credentials: true }));

// app.use(expressValidator());
routes(app);

app.use(function (req: Request, res: Response, next: NextFunction) {
  const error = new Error("Not Found");
  // error.status = 404;
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
