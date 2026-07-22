import express from "express";
import {
  signup,
  login,
  logout,
  refresh,
  deleteAccount,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.delete("/account", protectRoute, deleteAccount);

export default router;
