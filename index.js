import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://la-capsule:yisdf1HUmykN40CX@cluster0.bfcvn.mongodb.net/hotel-api?retryWrites=true&w=majority",
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
