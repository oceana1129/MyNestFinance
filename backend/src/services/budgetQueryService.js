import mongoose from "mongoose";
import BudgetActivityLog from "../models/BudgetActivityLog.js";
import BudgetItem from "../models/BudgetItem.js";
import BudgetCategory from "../models/BudgetCategory.js";

///////////////////////////////////////
// HELPERS
///////////////////////////////////////

export function calculatePercentage(dividend, divisor) {
    return divisor === 0 ? 0 : Number(((dividend / divisor) * 100).toFixed(2));
}

/**
 * Returns all BudgetItem IDs belonging to a monthly budget,
 * can filter by one or more categoryTypes.
 *
 * @param {ObjectId} monthlyBudgetId
 * @param {string[]} [categoryTypes] - ex ["income"], ["expense","debt"]
 * @returns {Promise<ObjectId[]>}
 */
async function getItemIds(monthlyBudgetId, categoryTypes = null) {
  // find categories in the budget
  const categoryQuery = { monthlyBudget: monthlyBudgetId };

  // if category type, then filter
  if (categoryTypes?.length) {
    categoryQuery.categoryType = { $in: categoryTypes };
  }

  // get all categories
  const categories = await BudgetCategory.find(categoryQuery).select("_id");

  // get all category ids
  const categoryIds = categories.map((c) => c._id);

  // if non return
  if (!categoryIds.length) return [];

  // get all items in the category
  const items = await BudgetItem.find({
    budgetCategory: { $in: categoryIds },
  }).select("_id");

  // return all items
  return items.map((i) => i._id);
}

/**
 * Sums all activity log amounts for a given set of item IDs.
 *
 * @param {ObjectId[]} itemIds
 * @returns {Promise<number>}
 */
async function sumActivityLogs(itemIds) {
    // if no item ids return 0
  if (!itemIds.length) return 0;

  const result = await BudgetActivityLog.aggregate([
    //. only include logs with the matching id
    { $match: { budgetItem: { $in: itemIds } } },
    // sum amounts into a total
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // return total or 0 if there are no results
  return result[0]?.total ?? 0;
}

/**
 * Sums all planned amounts for a given set of item IDs.
 *
 * @param {ObjectId[]} itemIds
 * @returns {Promise<number>}
 */
async function sumItemPlannedAmounts(itemsIds) {
    // if no item ids return 0
  if (!itemsIds.length) return 0;

  const result = await BudgetItem.aggregate([
    { $match: { _id: {$in: itemsIds} } },
    { $group: { _id: null, total: { $sum: "plannedAmount" } } }
  ]);

  return result[0]?.total ?? 0;
}

/**
 * Derives the reaction, isActive, and percentage fields from a
 * planned/actual/difference result.
 *
 * Why "reaction" depends on category type:
 * The meaning of a positive difference flips depending on what's being
 * measured. For expenses, spending less than planned is good
 * ("ahead"). For income, earning more than planned is good ("ahead").
 * For debts, spending more means paying off more debts is good ("ahead").
 * Without the type, the same number would be misread.
 *
 * Reactions:
 *  "ahead"     — performing better than planned
 *  "behind"    — performing worse than planned
 *  "on-target" — exactly on plan (difference === 0)
 *
 * @param {{ planned: number, actual: number, difference: number }} amounts
 * @param {"income" | "expense" | "debt"} categoryType
 * @returns {{ reaction: string, isActive: boolean, percentage: number }}
 */
export function getBudgetReaction({ planned, actual, difference }, categoryType) {
  let reaction = "on-target";
 
  if (difference !== 0) {
    if (categoryType === "expense") {
      // for difference higher than 1 is positive
      reaction = difference > 0 ? "ahead" : "behind";
    } else {
      // negative difference means under planned
      reaction = difference < 0 ? "ahead" : "behind";
    }
  }
 
  // whether the activity has been logged
  const isActive = actual > 0;
 
  // planned amount versus actual amount progression
  const percentage = calculatePercentage(actual, planned);
 
  return { reaction, isActive, percentage };
}

///////////////////////////////////////
// DASHBOARD SERVICES
///////////////////////////////////////

/**
 * Total income earned during the budget month.
 * For dashboard income card
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<number>}
 *
 * @example
 * const income = await getMonthlyTotalIncome(monthlyBudgetId);
 * // 4500.00
 */
export async function getMonthlyTotalIncome(monthlyBudgetId) {
  const itemIds = await getItemIds(monthlyBudgetId, ["income"]);
  return sumActivityLogs(itemIds);
}

/**
 * Total expenses spent during the budget month.
 * For dashboard expense card
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<number>}
 *
 * @example
 * const expenses = await getMonthlyTotalExpenses(monthlyBudgetId);
 * // 1850.00
 */
export async function getMonthlyTotalExpenses(monthlyBudgetId) {
  const itemIds = await getItemIds(monthlyBudgetId, ["expense"]);
  return sumActivityLogs(itemIds);
}

/**
 * Total debts paid during the budget month.
 * For dashboard debt payment information
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<number>}
 *
 * @example
 * const payments = await getMonthlyTotalPayments(monthlyBudgetId);
 * // 450.00
 */
export async function getMonthlyTotalPayments(monthlyBudgetId) {
  const itemIds = await getItemIds(monthlyBudgetId, ["debt"]);
  return sumActivityLogs(itemIds);
}

/**
 * Income − (Expenses + Debt Payments).
 *
 * A positive value means the user is under budget.
 * A negative value means the user has overspent.
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<number>}
 *
 * @example
 * const remaining = await getMonthlyTotalRemaining(monthlyBudgetId);
 * // 2150.00
 */
export async function getMonthlyTotalRemaining(monthlyBudgetId) {
  const [income, expenses, payments] = await Promise.all([
    getMonthlyTotalIncome(monthlyBudgetId),
    getMonthlyTotalExpenses(monthlyBudgetId),
    getMonthlyTotalPayments(monthlyBudgetId),
  ]);

  return income - (expenses + payments);
}

/**
 * Returns actual amounts spent and remaining for budget
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<{
 *   income: number,
 *   expenses: number,
 *   payments: number,
 *   remaining: number
 * }>}
 *
 * @example
 * const summary = await getMonthlyDashboardSummary(monthlyBudgetId);
 * // {
 * //   income:    4500.00,
 * //   expenses:  1850.00,
 * //   payments:   500.00,
 * //   remaining: 2150.00
 * // }
 */
export async function getMonthlyDashboardSummary(monthlyBudgetId) {
  // sesolve item IDs for each category type
  const [incomeIds, expenseIds, debtIds] = await Promise.all([
    getItemIds(monthlyBudgetId, ["income"]),
    getItemIds(monthlyBudgetId, ["expense"]),
    getItemIds(monthlyBudgetId, ["debt"]),
  ]);

  // sum actual and planned
  const [
    actualIncome, actualExpenses, actualPayments,
    plannedIncome, plannedExpenses, plannedPayments,
  ] = await Promise.all([
    sumActivityLogs(incomeIds),
    sumActivityLogs(expenseIds),
    sumActivityLogs(debtIds),
    sumItemPlannedAmounts(incomeIds),
    sumItemPlannedAmounts(expenseIds),
    sumItemPlannedAmounts(debtIds),
  ]);

  return {
    actualIncome,
    actualExpenses,
    actualPayments,
    actualRemaining: actualIncome - (actualExpenses + actualPayments),
    plannedIncome,
    plannedExpenses,
    plannedPayments,
    percentageUsedIncome: calculatePercentage(actualIncome, plannedIncome),
    percentageUsedExpenses: calculatePercentage(actualExpenses, plannedExpenses),
    percentageUsedPayments: calculatePercentage(actualPayments, plannedPayments),
    percentageUsedAllExpenses: calculatePercentage(
      actualExpenses + actualPayments,
      plannedExpenses + plannedPayments
    ),
  };
}

 
/**
 * Returns all categories for a monthly budget with their full summary
 * data: planned total, actual total, difference, reaction, item count,
 * and other data
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<Array<{
 *   _id: ObjectId,
 *   name: string,
 *   emoji: string,
 *   color: string,
 *   categoryType: "income" | "expense" | "debt",
 *   displayOrder: number,
 *   itemCount: number,
 *   planned: number,
 *   actual: number,
 *   difference: number,
 *   reaction: "ahead" | "behind" | "on-target",
 *   isActive: boolean,
 *   percentage: number
 * }>>}
 *
 * @example
 * const breakdown = await getCategoryBreakdown(monthlyBudgetId);
 * // [
 * //   {
 * //     _id: ObjectId,
 * //     name: "housing", emoji: "house", categoryType: "expense",
 * //     itemCount: 2, planned: 1470, actual: 1400,
 * //     difference: 70, reaction: "ahead", isActive: true, percentage: 95.24
 * //   },
 * //   ...
 * // ]
 */
export async function getCategoryBreakdown(monthlyBudgetId) {
  // fetch all categories for the budget
  const categories = await BudgetCategory.find({
    monthlyBudget: monthlyBudgetId,
  })
    .sort({ displayOrder: 1 })
    .lean();
 
    // no categories found
  if (!categories.length) return [];
   
  // get all id values
  const categoryIds = categories.map((c) => c._id);
 
  // aggregate planned totals and item counts per category
  const itemAgg = await BudgetItem.aggregate([
    { $match: { budgetCategory: { $in: categoryIds } } },
    {
      $group: {
        _id: "$budgetCategory",
        planned: { $sum: "$plannedAmount" },
        itemCount: { $sum: 1 },
        // collect item ids for later
        itemIds: { $push: "$_id" },
      },
    },
  ]);
 
  // index aggregation results by id
  const itemDataByCat = Object.fromEntries(
    itemAgg.map((row) => [row._id.toString(), row])
  );
 
  // collect item ids for categories and sum activity logs by item
  const allItemIds = itemAgg.flatMap((row) => row.itemIds);
 
  const logAgg = await BudgetActivityLog.aggregate([
    { $match: { budgetItem: { $in: allItemIds } } },
    { $group: { _id: "$budgetItem", actual: { $sum: "$amount" } } },
  ]);
 
  // index actual amounts by id
  const actualByItem = Object.fromEntries(
    logAgg.map((row) => [row._id.toString(), row.actual])
  );
 
  // sum the actuals of items
  return categories.map((cat) => {
    const catData = itemDataByCat[cat._id.toString()] ?? { planned: 0, itemCount: 0, itemIds: [] };
    const planned = catData.planned;
    const itemCount = catData.itemCount;
 
    // sum actuals for id
    const actual = catData.itemIds.reduce((sum, itemId) => {
      return sum + (actualByItem[itemId.toString()] ?? 0);
    }, 0);
 
    const difference = planned - actual;
    const reaction = getBudgetReaction({ planned, actual, difference }, cat.categoryType);
 
    return {
      _id: cat._id,
      name: cat.name,
      emoji: cat.emoji,
      color: cat.color,
      categoryType: cat.categoryType,
      displayOrder: cat.displayOrder,
      itemCount,
      planned,
      actual,
      difference,
      ...reaction,
    };
  });
}

///////////////////////////////////////
// CATEGORY SERVICES
///////////////////////////////////////

/**
 * Sum of all item plannedAmounts within a category.
 * Used for category budget planning
 *
 * @param {ObjectId} budgetCategoryId
 * @returns {Promise<number>}
 *
 * @example
 * const planned = await getTotalCategoryPlanned(budgetCategoryId);
 * // 1200.00
 */
export async function getTotalCategoryPlanned(budgetCategoryId) {
  const result = await BudgetItem.aggregate([
    { $match: { budgetCategory: new mongoose.Types.ObjectId(budgetCategoryId) } },
    { $group: { _id: null, total: { $sum: "$plannedAmount" } } },
  ]);

  return result[0]?.total ?? 0;
}

/**
 * Sum of all activity log amounts within a category.
 * To compare actual spending with planned spending
 *
 * @param {ObjectId} budgetCategoryId
 * @returns {Promise<number>}
 *
 * @example
 * const actual = await getTotalCategoryActual(budgetCategoryId);
 * // 980.00
 */
export async function getTotalCategoryActual(budgetCategoryId) {
  const items = await BudgetItem.find({
    budgetCategory: budgetCategoryId,
  }).select("_id");

  const itemIds = items.map((i) => i._id);
  return sumActivityLogs(itemIds);
}

/**
 * Planned − Actual for a category.
 * Shows whether the user is ahead or behind on this category.
 *
 * A positive value means under budget (money remaining).
 * A negative value means over budget (overspent).
 *
 * @param {ObjectId} budgetCategoryId
 * @returns {Promise<number>}
 *
 * @example
 * const diff = await getTotalCategoryDifference(budgetCategoryId);
 * // 220.00  (under budget)
 */
export async function getTotalCategoryDifference(budgetCategoryId) {
  const [category, planned, actual] = await Promise.all([
    BudgetCategory.findById(budgetCategoryId).select("categoryType"),
    getTotalCategoryPlanned(budgetCategoryId),
    getTotalCategoryActual(budgetCategoryId),
  ]);
 
  if (!category) throw new Error(`BudgetCategory not found: ${budgetCategoryId}`);
 
  const difference = planned - actual;
  const reaction = getBudgetReaction({ planned, actual, difference }, category.categoryType);
 
  return { planned, actual, difference, ...reaction };
}


///////////////////////////////////////
// ITEM SERVICES
///////////////////////////////////////

/**
 * Sum of all activity logs for an item
 *
 * @param {ObjectId} budgetItemId
 * @returns {Promise<number>}
 *
 * @example
 * const actual = await getTotalItemActual(budgetItemId);
 * // 750.00
 */
export async function getTotalItemActual(budgetItemId) {
  const result = await BudgetActivityLog.aggregate([
    { $match: { budgetItem: new mongoose.Types.ObjectId(budgetItemId) } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return result[0]?.total ?? 0;
}

/**
 * Planned − Actual for a single budget item.
 * returns full result as an object
 *
 * @param {ObjectId} budgetItemId
 * @returns {Promise<{ planned: number, actual: number, difference: number }>}
 *
 * @example
 * const result = await getTotalItemDifference(budgetItemId);
 * // {
 * //   planned: 1000, actual: 750, difference: 250,
 * //   reaction: "ahead", isActive: true, percentage: 75.00
 * // }
 */
export async function getTotalItemDifference(budgetItemId) {
  // get item with reference to see its category type
  // get plannedAmount and budget category
  const item = await BudgetItem.findById(budgetItemId).select("plannedAmount budgetCategory");
 
  if (!item) throw new Error(`BudgetItem not found: ${budgetItemId}`);
 
  // get its actual total
  const [category, actual] = await Promise.all([
    BudgetCategory.findById(item.budgetCategory).select("categoryType"),
    getTotalItemActual(budgetItemId),
  ]);
 
  // category is not found
  if (!category) throw new Error(`BudgetCategory not found for item: ${budgetItemId}`);
 
  // find the planned amount, difference, and get the reaction
  const planned = item.plannedAmount ?? 0;
  const difference = planned - actual;
  const reaction = getBudgetReaction({ planned, actual, difference }, category.categoryType);
 
  return { planned, actual, difference, ...reaction };
}

///////////////////////////////////////
// ACTIVITY LOG SERVICES
///////////////////////////////////////

/**
 * All activity logs for a monthly budget, sorted by most recent first.
 * Used for activity feed
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<object[]>}
 *
 * @example
 * const logs = await getMonthlyActivity(monthlyBudgetId);
 * // [{ name: "Rent Payment", amount: 1200, activityDate: ..., budgetItem: ... }, ...]
 */
export async function getMonthlyActivity(monthlyBudgetId) {
  const itemIds = await getItemIds(monthlyBudgetId);

  if (!itemIds.length) return [];

  return BudgetActivityLog.find({ budgetItem: { $in: itemIds } })
    .sort({ activityDate: -1 })
    // attach parent info name, emoji, and budgetcategory
    .populate("budgetItem", "name emoji budgetCategory")
    .lean();
}

/**
 * All activity logs for a monthly budget within a date range,
 * sorted by most recent first.
 * Used for reporting and filtering.
 *
 * @param {ObjectId} monthlyBudgetId
 * @param {Date} startDate - Inclusive start of the range
 * @param {Date} endDate - Inclusive end of the range
 * @returns {Promise<object[]>}
 *
 * @example
 * const logs = await getActivitiesByRange(
 *   monthlyBudgetId,
 *   new Date("2026-06-01"),
 *   new Date("2026-06-15")
 * );
 */
export async function getMonthlyActivitiesByRange(monthlyBudgetId, startDate, endDate) {
    // get all item ids in the budget
  const itemIds = await getItemIds(monthlyBudgetId);

  // if no items return []
  if (!itemIds.length) return [];

  return BudgetActivityLog.find({
    budgetItem: { $in: itemIds },
    activityDate: {
        $gte: startDate,
        $lte: endDate,
        },
    })
    .sort({ activityDate: -1 })
    .populate("budgetItem", "name emoji budgetCategory")
    .lean();
}