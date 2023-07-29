import express from "express";
import { AuthorsController } from "../controllers/authorsController";

const authorsController = new AuthorsController();

const router = express.Router();

router.get("/", authorsController.getAuthors);
router.get("/author/:id", authorsController.getAuthorByID);
export default router;
