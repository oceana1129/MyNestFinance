import express from "express";
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

// the controller routes
router.post("/", createActivityLog);
router.get("/", getAllActivityLogs);
router.get("/:id", getActivityLogById);
router.get("/item/:budgetItemId", getActivityLogsByBudget);
router.put("/:id", updateActivityLog);
router.delete("/:id", deleteActivityLog);
router.delete("/item/:budgetItemId", deleteActivityLogByBudget);

export default router;
