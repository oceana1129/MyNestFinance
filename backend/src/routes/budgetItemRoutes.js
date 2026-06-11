import express from "express";
import { 
    createBudgetItem, 
    deleteBudgetItem, 
    deleteBudgetItemByCategory, 
    getAllBudgetItems, 
    getBudgetItemByCategory, 
    getBudgetItemById, 
    reorderBudgetItems, 
    updateBudgetItem 
} from "../controllers/budgetItemController.js";

const router = express.Router();

// the controller routes
router.post("/", createBudgetItem);
router.get("/", getAllBudgetItems);
router.get("/:id", getBudgetItemById);
router.get("/budget/:budgetCategoryId", getBudgetItemByCategory);
router.put("/:id", updateBudgetItem);
router.patch("/reorder", reorderBudgetItems);
router.delete("/:id", deleteBudgetItem);
router.delete("/budget/:budgetCategoryId", deleteBudgetItemByCategory);

export default router;