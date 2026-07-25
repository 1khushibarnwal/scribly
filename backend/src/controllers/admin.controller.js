import User from "../models/User.model.js";
import Note from "../models/Note.model.js";

export async function getStats(req, res) {
  try {
    const [userCount, noteCount] = await Promise.all([
      User.countDocuments(),
      Note.countDocuments(),
    ]);

    res.status(200).json({ userCount, noteCount });
  } catch (error) {
    console.error("error in getStats controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
