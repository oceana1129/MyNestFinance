import BudgetCategory from "../models/BudgetCategory.js";
import BudgetItem from "../models/BudgetItem.js";
import BudgetDebtItem from "../models/BudgetDebtItem.js";
import BudgetActivityLog from "../models/BudgetActivityLog.js";

export async function getDashboard(monthlyBudgetId) {
  const [summary, categories, activity] = await Promise.all([
    getDashboardSummary(monthlyBudgetId),
    getDashboardCategories(monthlyBudgetId),
    getDashboardActivity(monthlyBudgetId),
  ]);

  return {
    summary,
    categories,
    activity,
  };
}

export async function getDashboardSummary(monthlyBudgetId) {
    // get all categories for the month
    // should be sorted based on display order
  const categories = await BudgetCategory.find({
    monthlyBudget: monthlyBudgetId,
  });

  // get all income for the month
  const income = categories
    .filter((category) => category.categoryType === "income")
    .reduce((total, category) => total + category.actualAmount, 0);

    // get all expenses for the month
  const expenses = categories
    .filter((category) => category.categoryType === "expense")
    .reduce((total, category) => total + category.actualAmount, 0);

    // get all debt for the month
    const debts = categories
        .filter((category) => category.categoryType === "debt")
        .reduce((total, category) => total + category.actualAmount, 0);

    // get all category ids
  const categoryIds = categories.map((category) => category._id);

  return {
    income,
    expenses,
    debts,
    remaining: income - expenses - debts,
  };
}

export async function getDashboardCategories(monthlyBudgetId) {
  const categories = await BudgetCategory.find({
    monthlyBudget: monthlyBudgetId,
  }).sort({
    displayOrder: 1,
  });

  const categoryIds = categories.map((category) => category._id);

  const items = await BudgetItem.find({
    budgetCategory: { $in: categoryIds },
  }).sort({
    displayOrder: 1,
  });

  return categories.map((category) => ({
    ...category.toObject(),
    items: items.filter(
      (item) =>
        item.budgetCategory.toString() === category._id.toString()
    ),
  }));
}