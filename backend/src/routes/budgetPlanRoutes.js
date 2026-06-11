import express from "express";
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

// the controller routes
router.post("/", createBudgetPlan);
router.get("/", getAllBudgetPlans);
router.get("/:id", getBudgetPlanById);
router.get("/item/:budgetItemId", getBudgetPlanByBudgetItem);
router.put("/:id", updateBudgetPlan);
router.delete("/:id", deleteBudgetPlan);
router.delete("/item/:budgetItemId", deleteBudgetPlanByBudgetItem);

export default router;
