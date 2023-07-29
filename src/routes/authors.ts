import express from "express";
import { AuthorsController } from "../controllers/authorsController";

const authorsController = new AuthorsController();

const router = express.Router();

router.get("/", authorsController.getAuthors);

export default router;
