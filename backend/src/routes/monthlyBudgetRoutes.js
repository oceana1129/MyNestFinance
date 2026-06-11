import express from "express";
import {
    createMonthlyBudget,
    getAllBudgets,
    getBudgetById,
    getBudgetsForUser,
    deleteBudget,
    deleteBudgetByUser
} from "../controllers/monthlyBudgetController.js";

const router = express.Router();

// the controller routes
// TODO: change from :id to dynamic auth from user
router.post("/", createMonthlyBudget);
router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.get("/user/:userProfileId", getBudgetsForUser);
router.delete("/:id", deleteBudget);
router.delete("/user/:userProfileId", deleteBudgetByUser);


export default router;
