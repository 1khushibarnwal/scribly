import express from "express";
import {
  signup,
  login,
  logout,
  refresh,
  deleteAccount,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.delete("/account", protectRoute, deleteAccount);

export default router;
