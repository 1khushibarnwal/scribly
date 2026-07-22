import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  summarizeNote,
} from "../../src/controllers/notesController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute); // applies to every route below

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/:id/summarize", summarizeNote);

export default router;
