// dashboardController.js
import {
  getMonthlyDashboardSummary as getMonthlyDashboardSummaryService,
  getCategoryBreakdown as getCategoryBreakdownService,
  getTotalCategoryDifference as getTotalCategoryDifferenceService,
  getTotalItemDifference as getTotalItemDifferenceService,
  getMonthlyActivity as getMonthlyActivityService,
} from "../services/budgetQueryService.js";

export async function getMonthlyDashboardSummary(req, res) {
  try {
    const result = await getMonthlyDashboardSummaryService(
      req.params.monthlyBudgetId,
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch monthly dashboard summary." });
  }
}

export async function getCategoryBreakdown(req, res) {
  try {
    const result = await getCategoryBreakdownService(
      req.params.monthlyBudgetId,
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category breakdown." });
  }
}

export async function getMonthlyActivity(req, res) {
  try {
    const result = await getMonthlyActivityService(req.params.monthlyBudgetId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch monthly activity." });
  }
}

export async function getTotalCategoryDifference(req, res) {
  try {
    const result = await getTotalCategoryDifferenceService(
      req.params.categoryId,
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category summary." });
  }
}

export async function getTotalItemDifference(req, res) {
  try {
    const result = await getTotalItemDifferenceService(req.params.itemId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch item summary." });
  }
}
