import express from "express";
import { getPublicNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/notes/:token", getPublicNote);

export default router;
