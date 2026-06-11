import Budget from "../models/MonthlyBudget.js";
import UserProfile from "../models/UserProfile.js";

// TODO: auth used dynamically for user
// const authUser = await AuthUser.findOne({
//   _firebaseUid: req.user.uid,
// });

// const profile = await UserProfile.findOne({
//   authUser: authUser._id,
// });

// CREATE
/**
 * Will create a monthly budget for a user.
 *
 * User may only have one budget per year and month.
 */
export async function createMonthlyBudget(req, res) {
  try {
    const { userProfile, month, year } = req.body;

    // does the user exist
    // TODO: user should be dynamic in future based on auth
    const user = await UserProfile.findById(userProfile);

    if (!user) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    // user exists, continue with req
    const savedBudget = await Budget.create({
      userProfile,
      month,
      year,
    });

    res
      .status(201)
      .json({ message: "Monthly Budget created successfully!", savedBudget });
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
    // TODO: user should be dynamic in future based on auth
    const budgets = await Budget.find({
      userProfile: req.params.userProfileId,
    }).sort({
      year: -1,
      month: -1,
    });

    res.status(200).json({
      message: "Budgets found",
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
    res
      .status(200)
      .json({ message: `Budget with id ${req.params.id} found`, budget });
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
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget)
      return res.status(404).json({ message: "Budget not found" });
    res.status(200).json({
      message: "Budget deleted successfully!",
      deletedBudget,
    });
  } catch (err) {
    console.error("deleteBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will delete all monthly budgets for a specific
 * user. Used in cases where a user is deleted.
 */
export async function deleteBudgetByUser(req, res) {
  try {
    const deletedBudgets = await Budget.deleteMany({
      userProfile: req.params.userProfileId,
    });
    res.status(200).json({
      message: "Budgets deleted successfully",
      deletedCount: deletedBudgets.deletedCount,
    });
  } catch (err) {
    console.error("deleteBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}
