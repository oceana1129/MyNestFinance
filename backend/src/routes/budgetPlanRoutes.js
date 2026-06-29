import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import {
  createBudgetPlan,
  deleteBudgetPlan,
  deleteBudgetPlanByBudgetItem,
  getAllBudgetPlans,
  getBudgetPlanByBudgetItem,
  getBudgetPlanById,
  updateBudgetPlan,
} from "../controllers/budgetPlanController.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
router.post("/", createBudgetPlan);
router.get("/", getAllBudgetPlans);
router.get("/:id", getBudgetPlanById);
router.get("/item/:budgetItemId", getBudgetPlanByBudgetItem);
router.put("/:id", updateBudgetPlan);
router.delete("/:id", deleteBudgetPlan);
router.delete("/item/:budgetItemId", deleteBudgetPlanByBudgetItem);

export default router;
