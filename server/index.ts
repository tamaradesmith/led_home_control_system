import express, { Application } from 'express';
import { routes } from "./routes/routes";


import dotenv from "dotenv";
dotenv.config();


import logger from "morgan";
import cookieParser from 'cookie-parser';

export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

routes(app);

const PORT  = process.env.PORT;
// const ADDRESS: string = "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Listening => Port: ${PORT}`);
});