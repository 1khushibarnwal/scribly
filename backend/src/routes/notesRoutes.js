import express from "express";

import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  summarizeNote,
  togglePin,
  toggleShare,
} from "../../src/controllers/notesController.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { noteSchema } from "../validators/note.validator.js";
import upload from "../middleware/upload.middleware.js";
import {
  uploadNoteImage,
  deleteNoteImage,
} from "../../src/controllers/notesController.js";

const router = express.Router();

router.use(protectRoute); // applies to every route below

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", validate(noteSchema), createNote);
router.put("/:id", validate(noteSchema), updateNote);
router.delete("/:id", deleteNote);
router.patch("/:id/pin", togglePin);
router.patch("/:id/share", toggleShare);
router.post("/:id/summarize", summarizeNote);
router.post("/:id/images", upload.single("image"), uploadNoteImage);
router.delete("/:id/images/:publicId(*)", deleteNoteImage);

export default router;
