import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import {
  createDebtItem,
  deleteDebtItem,
  deleteDebtItemByBudgetItem,
  getAllDebtItems,
  getDebtItemByBudgetItem,
  getDebtItemById,
  updateDebtItem,
} from "../controllers/budgetDebtItem.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
router.post("/", createDebtItem);
router.get("/", getAllDebtItems);
router.get("/item/:budgetItemId", getDebtItemByBudgetItem);
router.get("/:id", getDebtItemById);
router.put("/:id", updateDebtItem);
router.delete("/item/:budgetItemId", deleteDebtItemByBudgetItem);
router.delete("/:id", deleteDebtItem);

export default router;
