import BudgetCategory from "../models/BudgetCategory.js";
import Category from "../models/BudgetCategory.js";
import BudgetItem from "../models/BudgetItem.js";

import { deleteItemData } from "./deleteItemData.js";

/**
 * Delete category and any items under it
 * 
 * @param {*} categoryId id of the category
 * @returns the deleted item
 */
export async function deleteCategoryData(
  categoryId,
) {
  // find the category
  const category = await BudgetCategory.findById(categoryId);

  // if no category exists return null
  if (!category) {
    return null;
  }

  // find all items that are under the category
  const items = await BudgetItem.find({
    budgetCategory: categoryId,
  });

  // delete the item and its information
  for (const item of items) {
    await deleteItemData(item._id);
  }

  // delete the category
  await Category.findByIdAndDelete(
    categoryId,
  );

  // return deleted category
  return category;
}