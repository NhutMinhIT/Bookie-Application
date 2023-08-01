import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import Router
import authorsRoute from "./routes/authors";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "./utils/Respone";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/authors", authorsRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid Route",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof EntityNotFoundError) {
    return ResponseUtl.sendError(res, "Item/page you are looking of does not exist", 404, null);
  }
  return res.status(500).send({
    success: false,
    message: "Something went wrong ",
  });
});
export default app;
