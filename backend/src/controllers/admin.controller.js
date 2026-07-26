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

export async function getUsers(req, res) {
  try {
    const users = await User.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("error in getUsers controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
