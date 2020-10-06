import express from 'express';

import dotenv from "dotenv";
dotenv.config();


import logger from "morgan";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));


const PORT  = process.env.PORT;
// const ADDRESS: string = "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Listening => Port: ${PORT}`);
});