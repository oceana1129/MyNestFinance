import BudgetDebtItem from "./BudgetDebtItem.js";
import BudgetItem from "./BudgetItem.js";
import BudgetCategory from "./BudgetCategory.js";
import BudgetActivityLog from "./BudgetActivityLog.js";
import { getBudgetReaction } from "./budgetQueryService.js" 


/**
 * Calculates a suggested monthly payment to pay off a debt within
 * a given number of years, accounting for compound interest.
 *
 * Uses the amortisation formula:
 *   M = P × [r(1+r)^n] / [(1+r)^n − 1]
 *
 * Where:
 *   P = principal (remaining balance)
 *   r = monthly interest rate (annual rate / 12 / 100)
 *   n = total number of payments (years × 12)
 *
 * Avoids division by zero in the formula if interest is zero.
 *
 * @param {number} balance - Current remaining balance
 * @param {number} annualRate - Annual interest rate as a percentage (18.99 %)
 * @param {number} years - Desired payoff timeline in years
 * @returns {number} - Suggested monthly payment, rounded to 2 decimal places
 */
function calcSuggestedPayment(balance, annualRate, years = 5) {
    // num of payments per year
  const n = years * 12;

  // no interest
  if (annualRate === 0) {
    return Number((balance / n).toFixed(2));
  }

  // calculate monthly interest rate
  const r = annualRate / 12 / 100;

  // amortisation
  const payment = balance * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  return Number(payment.toFixed(2));
}

/**
 * Estimates the interest that will accrue this month on a remaining balance.
 *
 * Monthly interest: balance × (annualRate / 12 / 100)
 *
 * An approximation for display purposes
 *
 * @param {number} balance - Current remaining balance
 * @param {number} annualRate - Annual interest rate as a percentage
 * @returns {number} - Estimated interest for the month
 */
function calcMonthlyInterest(balance, annualRate) {
  return Number(((balance * annualRate) / 12 / 100).toFixed(2));
}


/**
 * Full debt summary for a single debt item, combining BudgetItem,
 * BudgetDebtItem, and activity log data into one object.
 *
 * Powers the right-panel debt detail view, which shows:
 * - Current balance
 * - Min payment vs planned payment vs suggested payment
 * - Interest rate and estimated interest for month
 * - How much has been paid for month vs planned
 * - Payoff goal and progress
 *
 * @param {ObjectId} budgetItemId - The BudgetItem._id (not BudgetDebtItem._id)
 * @returns {Promise<{
 *   budgetItemId: ObjectId,
 *   name: string,
 *   emoji: string,
 *   plannedPayment: number,
 *   actualPayment: number,
 *   difference: number,
 *   percentage: number,
 *   debtType: string,
 *   originalBalance: number | null,
 *   currentBalance: number,
 *   minimumPayment: number | null,
 *   interestRate: number | null,
 *   estimatedMonthlyInterest: number,
 *   suggestedPayment: number,
 *   preferredPayoffInYears: number,
 *   reaction: "ahead" | "behind" | "on-target",
 *   isActive: boolean
 * }>}
 *
 * @example
 * const summary = await getDebtItemSummary(budgetItemId);
 * // {
 * //   name: "student loan",
 * //   currentBalance: 12450.00,
 * //   minimumPayment: 95.00,
 * //   plannedPayment: 120.00,
 * //   actualPayment: 120.00,
 * //   suggestedPayment: 205.00,
 * //   estimatedMonthlyInterest: 88.19,
 * //   reaction: "on-target",
 * //   ...
 * // }
 */
export async function getDebtItemSummary(budgetItemId) {
  // fetch budgetItem and debtItem
  const [item, debtItem, activityTotal] = await Promise.all([
    BudgetItem.findById(budgetItemId).select("name emoji plannedAmount").lean(),
    BudgetDebtItem.findOne({ budgetItem: budgetItemId }).lean(),
    // sum all activity logs
    BudgetActivityLog.aggregate([
      { $match: { budgetItem: budgetItemId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  // any errors fetching
  if (!item) throw new Error(`BudgetItem not found: ${budgetItemId}`);
  if (!debtItem) throw new Error(`BudgetDebtItem not found for item: ${budgetItemId}`);

  // get planned amount, actual payments, and difference between the two
  const plannedPayment = item.plannedAmount ?? 0;
  const actualPayment = activityTotal[0]?.total ?? 0;
  const difference = plannedPayment - actualPayment;

  // For debt, paying more than planned is "ahead"
  // paying less than planned is "behind"
  let results = getBudgetReaction(
    { planned: plannedPayment, actual: actualPayment, difference }, "debt");
  const reaction = results.reaction;
  const isActive = results.isActive;
  const percentage = results.percentage;

  // get balance, rate, and years
  const balance = debtItem.currentBalance;
  const rate = debtItem.interestRate ?? 0;
  const years = debtItem.preferredPayoffInYears ?? 5;

  return {
    budgetItemId: item._id,
    name: item.name,
    emoji: item.emoji,
    plannedPayment,
    actualPayment,
    difference,
    percentage,
    reaction,
    isActive,
    // raw fields from debt item
    debtType: debtItem.debtType,
    originalBalance: debtItem.originalBalance ?? null,
    currentBalance: balance,
    minimumPayment: debtItem.minimumPayment ?? null,
    interestRate: rate,
    preferredPayoffInYears: years,
    // computed fields
    estimatedMonthlyInterest: calcMonthlyInterest(balance, rate),
    suggestedPayment: calcSuggestedPayment(balance, rate, years),
  };
}

/**
 * Summary for every debt item in a monthly budget.
 *
 * Used to display total owed, total being paid, and individual
 * progress for each account.
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<Array>} - Array of getDebtItemSummary result objects
 *
 * @example
 * const debts = await getAllDebtSummaries(monthlyBudgetId);
 * // [{ name: "student loan", currentBalance: 12450, ... }, ...]
 */
export async function getAllDebtSummaries(monthlyBudgetId) {
  // Find all debt categories in the budget
  const debtCategories = await BudgetCategory.find({
    monthlyBudget: monthlyBudgetId,
    categoryType: "debt",
  }).select("_id");

  // no debt categories found
  if (!debtCategories.length) return [];

  const categoryIds = debtCategories.map((c) => c._id);

  // find all items in category
  const items = await BudgetItem.find({
    budgetCategory: { $in: categoryIds },
  }).select("_id");

  if (!items.length) return [];

  // get each items summary
  return Promise.all(items.map((item) => getDebtItemSummary(item._id)));
}

/**
 * Total remaining balance owed across all debt items in a monthly budget.
 *
 * @param {ObjectId} monthlyBudgetId
 * @returns {Promise<number>}
 *
 * @example
 * const owed = await getTotalDebtOwed(monthlyBudgetId);
 * // 14250.00
 */
export async function getTotalDebtOwed(monthlyBudgetId) {
  // find debt item ids
  const debtCategories = await BudgetCategory.find({
    monthlyBudget: monthlyBudgetId,
    categoryType: "debt",
  }).select("_id");

  if (!debtCategories.length) return 0;

  const categoryIds = debtCategories.map((c) => c._id);

  const items = await BudgetItem.find({
    budgetCategory: { $in: categoryIds },
  }).select("_id");

  if (!items.length) return 0;

  const itemIds = items.map((i) => i._id);

  // sum all current balances across debt items in budget month
  const result = await BudgetDebtItem.aggregate([
    { $match: { budgetItem: { $in: itemIds } } },
    { $group: { _id: null, total: { $sum: "$currentBalance" } } },
  ]);

  return result[0]?.total ?? 0;
}