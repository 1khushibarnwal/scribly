import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // was missing
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from "./routes/auth.route.js";
import publicRoutes from "./routes/public.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser()); // was missing — logout/refresh cookies depend on this
app.use(express.json());
app.use(rateLimiter);
app.use("/api/public", publicRoutes);

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use((err, req, res, next) => {
  if (
    err.name === "MulterError" ||
    err.message === "Only image files are allowed"
  ) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening to port", PORT);
  });
});
