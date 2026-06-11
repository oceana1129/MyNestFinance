import BudgetPlan from "../models/BudgetPlan.js";
import BudgetItem from "../models/BudgetItem.js";

// CREATE
// create a budget plan
export async function createBudgetPlan(req, res) {
  try {
    const {
      budgetItem,
      scheduleType,
      dayOfWeek,
      dayOfMonth,
      lastDayOfMonth,
      monthOfYear,
      interval,
      intervalUnit,
      startDate,
    } = req.body;

    // does the budget item exist?
    const item = await BudgetItem.findById(budgetItem);

    if (!item) {
      return res.status(404).json({
        message: "Budget item not found",
      });
    }

    const savedBudgetPlan = await BudgetPlan.create({
      budgetItem,
      scheduleType,
      dayOfWeek,
      dayOfMonth,
      lastDayOfMonth,
      monthOfYear,
      interval,
      intervalUnit,
      startDate,
    });

    res.status(201).json({
      message: "Budget plan created successfully!",
      savedBudgetPlan,
    });
  } catch (err) {
    console.error("createBudgetPlan(): ", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "A budget plan already exists for this budget item.",
      });
    }

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// READ
// get all budget plans
export async function getAllBudgetPlans(_, res) {
  try {
    const budgetPlans = await BudgetPlan.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "All budget plans found",
      budgetPlans,
    });
  } catch (err) {
    console.error("getAllBudgetPlans(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// get budget plan by id
export async function getBudgetPlanById(req, res) {
  try {
    const budgetPlan = await BudgetPlan.findById(req.params.id);

    if (!budgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
      message: `Budget plan with id ${req.params.id} found`,
      budgetPlan,
    });
  } catch (err) {
    console.error("getBudgetPlanById(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// get budget plan by budget item
export async function getBudgetPlanByBudgetItem(req, res) {
  try {
    const budgetPlan = await BudgetPlan.findOne({
      budgetItem: req.params.budgetItemId,
    });

    if (!budgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
      message: "Budget plan found",
      budgetPlan,
    });
  } catch (err) {
    console.error("getBudgetPlanByBudgetItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// UPDATE
// update budget plan
export async function updateBudgetPlan(req, res) {
  try {
    const {
      scheduleType,
      dayOfWeek,
      dayOfMonth,
      lastDayOfMonth,
      monthOfYear,
      interval,
      intervalUnit,
      startDate,
    } = req.body;

    const updatedBudgetPlan = await BudgetPlan.findByIdAndUpdate(
      req.params.id,
      {
        scheduleType,
        dayOfWeek,
        dayOfMonth,
        lastDayOfMonth,
        monthOfYear,
        interval,
        intervalUnit,
        startDate,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBudgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
      message: "Budget plan updated successfully!",
      updatedBudgetPlan,
    });
  } catch (err) {
    console.error("updateBudgetPlan(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// DELETE
// delete budget plan
export async function deleteBudgetPlan(req, res) {
  try {
    const deletedBudgetPlan = await BudgetPlan.findByIdAndDelete(req.params.id);

    if (!deletedBudgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
      message: "Budget plan deleted successfully!",
      deletedBudgetPlan,
    });
  } catch (err) {
    console.error("deleteBudgetPlan(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// delete budget plan by budget item
export async function deleteBudgetPlanByBudgetItem(req, res) {
  try {
    const deletedBudgetPlan = await BudgetPlan.findOneAndDelete({
      budgetItem: req.params.budgetItemId,
    });

    if (!deletedBudgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
      message: "Budget plan deleted successfully!",
      deletedBudgetPlan,
    });
  } catch (err) {
    console.error("deleteBudgetPlanByBudgetItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}
