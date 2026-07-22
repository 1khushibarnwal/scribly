import Note from "../models/Note.model.js";

import groq from "../config/groq.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    console.error("error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.user._id });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function summarizeNote(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You summarize personal notes concisely in 2-3 sentences. Keep the original meaning and tone. Do not add information that isn't in the note.",
        },
        {
          role: "user",
          content: `Title: ${note.title}\n\nContent: ${note.content}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 150,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    res.status(200).json({ summary });
  } catch (error) {
    console.error("error in summarizeNote controller", error);
    res.status(500).json({ message: "Failed to summarize note" });
  }
}
