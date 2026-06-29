import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import { 
    createCategory, 
    deleteCategory, 
    getAllCategories, 
    getCategoriesByBudget, 
    getCategoryById, 
    reorderCategories, 
    updateCategory } 
    from "../controllers/categoryController.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/budget/:monthlyBudgetId", getCategoriesByBudget);
router.put("/:id", updateCategory);
router.patch("/reorder", reorderCategories);
router.delete("/:id", deleteCategory);
// router.delete("/budget/:monthlyBudgetId", deleteCategoryByBudget);

export default router;