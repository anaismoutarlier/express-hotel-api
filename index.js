import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import { config } from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);

console.log(process.env.NODE_ENV)

config({
  path: path.resolve(path.dirname(__filename), `${process.env.NODE_ENV.trim()}.env`)
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    process.env.CONNECTION_STRING,
    { connectTimeoutMS: 30000 }
  )
  .then(() => console.log("Database connected"))
  .catch(error => console.error(error));

const app = express();

app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  console.error(error);

  return res
    .status(500)
    .json({ result: false, error: error.toString(), stack: error.stack });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
