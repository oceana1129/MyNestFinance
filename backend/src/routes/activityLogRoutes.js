import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import {
  createActivityLog,
  deleteActivityLog,
  deleteActivityLogByBudget,
  getActivityLogById,
  getActivityLogsByBudget,
  getAllActivityLogs,
  updateActivityLog,
} from "../controllers/budgetActivityLogController.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
router.post("/", createActivityLog);
router.get("/", getAllActivityLogs);
router.get("/:id", getActivityLogById);
router.get("/item/:budgetItemId", getActivityLogsByBudget);
router.put("/:id", updateActivityLog);
router.delete("/:id", deleteActivityLog);
router.delete("/item/:budgetItemId", deleteActivityLogByBudget);

export default router;
