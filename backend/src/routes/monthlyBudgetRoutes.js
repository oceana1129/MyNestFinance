import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";
import {
    createMonthlyBudget,
    getAllBudgets,
    getBudgetById,
    getBudgetsForUser,
    deleteBudget,
} from "../controllers/monthlyBudgetController.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes
// TODO: change from :id to dynamic auth from user
router.post("/", createMonthlyBudget);
router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.get("/user/:userProfileId", getBudgetsForUser);
router.delete("/:id", deleteBudget);
// router.delete("/user/:userProfileId", deleteBudgetByUser);


export default router;
