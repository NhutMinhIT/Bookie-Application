import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import Router
import authorsRoute from "./routes/authors";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/authors", authorsRoute);

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello World",
  });
});

export default app;
