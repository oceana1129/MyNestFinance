import ActivityLog from "../models/BudgetActivityLog.js";
import BudgetItem from "../models/BudgetItem.js";
import BudgetCategory from "../models/BudgetCategory.js";

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

export async function getCategorySummary(categoryId) {
  const [planned, actual, category] =
    await Promise.all([
      calculatePlannedAmount(categoryId),
      calculateActualAmount(categoryId),
      BudgetCategory.findById(categoryId),
    ]);
  const difference = planned - actual;
  const type = category?.categoryType;
  let reaction = "on-target";

  if (difference !== 0) {
    if (type === "expense") {
      reaction =
        difference > 0
          ? "ahead"
          : "behind";
    } else {
      reaction =
        difference < 0
          ? "ahead"
          : "behind";
    }
  }

  let isActive = actual > 0;
  let percentage = planned === 0 ? 0 : Number(((actual / planned) * 100).toFixed(2));

  return {
    planned,
    actual,
    difference,
    categoryType: type,
    status: reaction,
    isActive,
    percentage
  };
}