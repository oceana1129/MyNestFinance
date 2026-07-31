import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseTokens.js";
import { loadUserProfile } from "../middleware/loadUserProfile.js";

import {
    getMonthlyDashboardSummary,
    getCategoryBreakdown,
    getTotalCategoryDifference,
    getTotalItemDifference,
    getMonthlyActivity,
} from "../services/budgetQuerySe rvice.js";

const router = express.Router();

router.use(verifyFirebaseToken);
router.use(loadUserProfile);

// the controller routes

/**
 * get monthly dashboard
 * {
  "actualIncome": 4500,
  "plannedIncome": 5000,

  "actualExpenses": 1850,
  "plannedExpenses": 2000,

  "actualPayments": 500,
  "plannedPayments": 600,

  "actualRemaining": 2150,

  "percentageUsedIncome": 90,
  "percentageUsedExpenses": 92.5,
  "percentageUsedPayments": 83.3,
  "percentageUsedAllExpenses": 90.2
}
 */
router.get("/monthly/:monthlyBudgetId", getMonthlyDashboardSummary);
/**
 * get category information for the monthly budget
 * [
    {
        "_id":"",
        "name":"Housing",
        "emoji":"House",
        "planned":1500,
        "actual":1420,
        "difference":80,
        "reaction":"ahead",
        "percentage":95,
        "itemCount":3
    }, {}
]
 */
router.get("/monthly/:monthlyBudgetId/categories", getCategoryBreakdown);
/**
 * get all activities for the monthly budget
 */
router.get("/monthly/:monthlyBudgetId/activity", getMonthlyActivity);
/**
 * when you click on a category
 * {
    "planned":1500,
    "actual":1420,
    "difference":80,
    "reaction":"ahead",
    "percentage":95,
    "isActive":true
}
 */
router.get("/category/:categoryId", getTotalCategoryDifference);

/**
 * when you click on an item
 * {
    "planned":112,
    "actual":148,
    "difference":-36,
    "reaction":"behind",
    "percentage":132,
    "isActive":true
}
 */
router.get("/item/:itemId", getTotalItemDifference);


export default router;
