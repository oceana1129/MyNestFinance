import ActivityLog from "../models/BudgetActivityLog.js";

export async function calculateActualAmount(itemId) {
  const result =
    await ActivityLog.aggregate([
      {
        $match: {
          budgetItem: itemId,
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