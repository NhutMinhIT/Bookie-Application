import express from "express";
import { AuthorsController } from "../controllers/authorsController";
import { ErrorHandler } from "../utils/ErrorHandler";

const authorsController = new AuthorsController();

const router = express.Router();

router.get("/", ErrorHandler.handleError(authorsController.getAuthors));

router.get(
  "/author/:id",
  ErrorHandler.handleError(authorsController.getAuthorByID)
);
export default router;
