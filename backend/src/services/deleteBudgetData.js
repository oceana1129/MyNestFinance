import MonthlyBudget from "../models/MonthlyBudget.js";
import Category from "../models/BudgetCategory.js";

import { deleteCategoryData } from "./deleteCategoryData.js";

/**
 * Delete budget and any categories under it
 * 
 * @param {*} budgetId id of the budget
 * @returns the deleted budget
 */
export async function deleteBudgetData(
  budgetId,
) {
  // find the budget
  const budget = await MonthlyBudget.findById(budgetId);

  // if there's no budget return null
  if (!budget) {
    return null;
  }

  // find all categories under the monthly budget
  const categories = await Category.find({
    monthlyBudget: budgetId,
  });

  // for every category, delete it
  for (const category of categories) {
    await deleteCategoryData(category._id);
  }

  // delete the monthly budget
  await MonthlyBudget.findByIdAndDelete(
    budgetId,
  );

  // return deleted budget
  return budget;
}