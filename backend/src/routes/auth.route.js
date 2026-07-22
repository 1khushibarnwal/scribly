import express from "express";
import {
  signup,
  login,
  logout,
  refresh,
  deleteAccount,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.delete("/account", protectRoute, deleteAccount);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.patch(
  "/profile",
  protectRoute,
  validate(updateProfileSchema),
  updateProfile,
);
router.patch(
  "/change-password",
  protectRoute,
  validate(changePasswordSchema),
  changePassword,
);

export default router;
