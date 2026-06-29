import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import { 
    createBudgetItem, 
    deleteBudgetItem, 
    getAllBudgetItems, 
    getBudgetItemByBudget, 
    getBudgetItemByCategory, 
    getBudgetItemById, 
    reorderBudgetItems, 
    updateBudgetItem 
} from "../controllers/budgetItemController.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
router.post("/", createBudgetItem);
router.get("/", getAllBudgetItems);
router.get("/:id", getBudgetItemById);
router.get("/category/:budgetCategoryId", getBudgetItemByCategory);
router.get("/budget/:monthlyBudgetId", getBudgetItemByBudget);
router.put("/:id", updateBudgetItem);
router.patch("/reorder", reorderBudgetItems);
router.delete("/:id", deleteBudgetItem);
// router.delete("/category/:budgetCategoryId", deleteBudgetItemByCategory);

export default router;