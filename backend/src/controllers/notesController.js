import Note from "../models/Note.model.js";
import groq from "../config/groq.js";
import crypto from "crypto";

export async function getAllNotes(req, res) {
  try {
    const { search, tag } = req.query;

    const filter = { user: req.user._id };

    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { content: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (tag && tag.trim()) {
      filter.tags = tag.trim();
    }

    // Pinned notes first, then newest first within each group
    const notes = await Note.find(filter).sort({ pinned: -1, createdAt: -1 });
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
    const { title, content, tags } = req.body;
    const note = new Note({ title, content, tags, user: req.user._id });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content, tags } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content, tags },
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

export async function togglePin(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    note.pinned = !note.pinned;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    console.error("error in togglePin controller", error);
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

export async function toggleShare(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.shareToken) {
      note.shareToken = null; // disable sharing
    } else {
      note.shareToken = crypto.randomBytes(16).toString("hex");
    }

    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error("error in toggleShare controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPublicNote(req, res) {
  try {
    const note = await Note.findOne({ shareToken: req.params.token }).populate(
      "user",
      "name",
    );

    if (!note) {
      return res
        .status(404)
        .json({
          message: "This shared note doesn't exist or is no longer shared",
        });
    }

    res.status(200).json({
      title: note.title,
      content: note.content,
      tags: note.tags,
      authorName: note.user.name,
      createdAt: note.createdAt,
    });
  } catch (error) {
    console.error("error in getPublicNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
