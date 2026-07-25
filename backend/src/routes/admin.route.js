import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { getStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.use(protectRoute, requireAdmin);
router.get("/stats", getStats);

export default router;
