import express from "express";
import { AuthorsController } from "../controllers/authorsController";
import { ErrorHandler } from "../utils/ErrorHandler";
import { FileUploader } from "../middleware/FileUploader";

const authorsController = new AuthorsController();

const router = express.Router();

router.get("/", ErrorHandler.handleError(authorsController.getAuthors));

//get Authors By ID
router.get("/author/:id", ErrorHandler.handleError(authorsController.getAuthorByID));

//Create Authors
router.post(
  "/create-author",
  FileUploader.upload("image", "author", 2 * 1024 * 1024),
  ErrorHandler.handleError(authorsController.createAuthor)
);
export default router;
