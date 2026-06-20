import BudgetItem from "../models/BudgetItem.js";
import BudgetPlan from "../models/BudgetPlan.js";
import BudgetDebtItem from "../models/BudgetDebtItem.js";
import ActivityLog from "../models/BudgetActivityLog.js";

/**
 * Will delete all of the item data and components 
 * associated with the item id including:
 *  - activity logs
 *  - budget plans
 *  - debt items
 * @param {*} itemId the id of the item
 * @returns the deleted item
 */
export async function deleteItemData(
  itemId,
) {
  // find the item
  const item = await BudgetItem.findById(itemId);

  // if no item exists then return null
  if (!item) {
    return null;
  }
  // delete all activity logs
  await ActivityLog.deleteMany({
    budgetItem: itemId,
  });

  // delete plan if associated with item
  await BudgetPlan.deleteOne({
    budgetItem: itemId,
  });

  // delete debt if associated with item
  await BudgetDebtItem.deleteOne({
    budgetItem: itemId,
  });

  // delete the item
  await BudgetItem.findByIdAndDelete(
    itemId,
  );

  // return deleted item
  return item;
}