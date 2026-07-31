import Budget from "../models/MonthlyBudget.js";
import UserProfile from "../models/UserProfile.js";
import { deleteBudgetData } from "../services/deleteBudgetData.js";


// CREATE
/**
 * Will create a monthly budget for a user.
 *
 * User may only have one budget per year and month.
 */
export async function createMonthlyBudget(req, res) {
  try {
    const { month, year } = req.body;
 
    // userProfile is derived from verified token
    const savedBudget = await Budget.create({
      userProfile: req.profile._id,
      month,
      year,
    });
 
    res
      .status(201)
      .json({ savedBudget });
  } catch (err) {
    console.error("createMonthlyBudget()", err);
 
    if (err.code === 11000) {
      return res.status(409).json({
        message: "A budget already exists for this month and year.",
      });
    }
    res.status(500).json({ message: "internal server error" });
  }
}

// READ
/**
 * Will return all existing monthly budgets
 */
export async function getAllBudgets(_, res) {
  // authorization
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Forbidden" });
  }
 
  try {
    const budgets = await Budget.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All budgets found:\n", budgets });
  } catch (err) {
    console.error("getAllBudgets(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will return all existing monthly budgets for a
 * specific user
 */
export async function getBudgetsForUser(req, res) {
  try {
    const budgets = await Budget.find({
      userProfile: req.profile._id,
    }).sort({
      year: -1,
      month: -1,
    });

    res.status(200).json({
      budgets,
    });
  } catch (err) {
    console.error("getBudgetsForUser(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

/**
 * Will return a singular monthly budget
 */
export async function getBudgetById(req, res) {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // authorization
    if (!budget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res
      .status(200)
      .json({ budget });
  } catch (err) {
    console.error("getBudgetById(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// DELETE
/**
 * Will delete an existing monthly budget by id
 */
export async function deleteBudget(req, res) {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
    }

    // authorization
    if (!budget.userProfile.equals(req.profile._id)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const deletedBudget = await deleteBudgetData(req.params.id);

    res.status(200).json({ deletedBudget });
  } catch (err) {
    console.error("deleteBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}
