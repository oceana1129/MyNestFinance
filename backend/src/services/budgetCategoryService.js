import ActivityLog from "../models/BudgetActivityLog.js";
import BudgetItem from "../models/BudgetItem.js";

export async function calculateActualAmount(categoryId) {
  const result = await ActivityLog.aggregate([
    {
      $lookup: {
        from: "budgetitems",
        localField: "budgetItem",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $match: {
        "item.budgetCategory": categoryId,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  return result[0]?.total ?? 0;
}

export async function calculatePlannedAmount(categoryId) {
  const result = await BudgetItem.aggregate([
    {
      $match: {
        budgetCategory: categoryId,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$plannedAmount",
        },
      },
    },
  ]);

  return result[0]?.total ?? 0;
}