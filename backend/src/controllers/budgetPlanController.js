import BudgetPlan from "../models/BudgetPlan.js";
import BudgetItem from "../models/BudgetItem.js";

// CREATE
/**
 * create a budget plan
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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

    // does the budget item exist
    const item = await BudgetItem.findById(budgetItem)
      .populate("monthlyBudget");

    if (!item) {
      return res.status(404).json({
        message: "Budget item not found",
      });
    }

    if (!item.monthlyBudget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({
        message: "Forbidden",
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
/**
 * get all budget plans
 * @param {*} _ 
 * @param {*} res 
 * @returns 
 */
export async function getAllBudgetPlans(_, res) {
  // authorization
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const budgetPlans = await BudgetPlan.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      budgetPlans,
    });
  } catch (err) {
    console.error("getAllBudgetPlans(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

/**
 * get budget plan by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function getBudgetPlanById(req, res) {
  try {
    const budgetPlan = await BudgetPlan.findById(req.params.id)
      .populate({
        path: "budgetItem",
        populate: {
          path: "monthlyBudget",
        },
      });

    if (!budgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    if (!budgetPlan.budgetItem.monthlyBudget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    res.status(200).json({
      budgetPlan,
    });
  } catch (err) {
    console.error("getBudgetPlanById(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

/**
 * get budget plan by budget item
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function getBudgetPlanByBudgetItem(req, res) {
  try {
    const item = await BudgetItem.findById(req.params.budgetItemId)
    .populate("monthlyBudget");

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (!item.monthlyBudget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const budgetPlan = await BudgetPlan.findOne({
      budgetItem: req.params.budgetItemId,
    });

    if (!budgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
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
/**
 * update budget plan
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function updateBudgetPlan(req, res) {
  try {
    const plan = await BudgetPlan.findById(req.params.id)
    .populate({
        path:"budgetItem",
        populate:{
            path:"monthlyBudget",
        }
    });

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    if (!plan.budgetItem.monthlyBudget.userProfile.equals(req.profile._id)) {
        return res.status(403).json({
            message:"Forbidden",
        });
    }

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
/**
 * delete budget plan
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function deleteBudgetPlan(req, res) {
  try {
    const plan = await BudgetPlan.findById(req.params.id)
      .populate({
        path:"budgetItem",
        populate:{
            path:"monthlyBudget",
        }
    });

    if (!plan){
      return res.status(404).json({
        message: "Debt item not found",
      });
    }

    if (!plan.budgetItem.monthlyBudget.userProfile.equals(req.profile._id)) {
        return res.status(403).json({
            message:"Forbidden",
        });
    }

    const deletedBudgetPlan = await BudgetPlan.findByIdAndDelete(req.params.id);

    if (!deletedBudgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
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
    const item = await BudgetItem.findById(req.params.budgetItemId)
    .populate("monthlyBudget");

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (!item.monthlyBudget.userProfile.equals(req.profile._id)) {
        return res.status(403).json({
            message:"Forbidden",
        });
    }
    
    const deletedBudgetPlan = await BudgetPlan.findOneAndDelete({
      budgetItem: req.params.budgetItemId,
    });

    if (!deletedBudgetPlan) {
      return res.status(404).json({
        message: "Budget plan not found",
      });
    }

    res.status(200).json({
      deletedBudgetPlan,
    });
  } catch (err) {
    console.error("deleteBudgetPlanByBudgetItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}
