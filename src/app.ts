import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import Router
import authorsRoute from "./routes/authorsRoute";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "./utils/Respone";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Valid Route
app.use("/api/v1/authors", authorsRoute);

//Invalid Route
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid Route",
  });
});

//Check Request
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof EntityNotFoundError) {
    return ResponseUtl.sendError(res, "Item/page you are looking of does not exist", 404, null);
  }

  if (err.message === "Invalid file type") {
    return ResponseUtl.sendError(res, "Invalid File Type", 422, null);
  }
  return res.status(500).send({
    success: false,
    message: "Something went wrong ",
  });
});
export default app;
