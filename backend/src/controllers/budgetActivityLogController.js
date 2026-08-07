import ActivityLog from "../models/BudgetActivityLog.js";
import BudgetItem from "../models/BudgetItem.js";
import Category from "../models/BudgetCategory.js";

// CREATE
/**
 * create an activity log
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function createActivityLog(req, res) {
  try {
    console.log(req.body);
    const { budgetItem, name, amount, activityDate, notes } = req.body;
    console.log(budgetItem);
    // does budgetItem exist
    const item = await BudgetItem.findById(budgetItem)
      .populate("monthlyBudget")
      .populate("budgetCategory");

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

    const savedActivityLog = await ActivityLog.create({
      budgetItem,
      name,
      amount,
      activityDate,
      notes,
    });

    res.status(200).json({
      savedActivityLog,
    });
  } catch (err) {
    console.error("createActivityLog(): ", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "An activity log already exists for this activity log.",
      });
    }

    res.status(500).json({ message: "internal server error" });
  }
}

// READ
/**
 * get all activity logs
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getAllActivityLogs(req, res) {
  // authorization
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const activityLogs = await ActivityLog.find().sort({ createdAt: -1 });
    res.status(200).json({ activityLogs });
  } catch (err) {
    console.error("getAllActivityLogs(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * get activity log by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getActivityLogById(req, res) {
  try {
    const activityLog = await ActivityLog.findById(req.params.id).populate({
      path: "budgetItem",
      populate: {
        path: "monthlyBudget",
      },
    });

    if (!activityLog) {
      return res.status(404).json({
        message: "Activity log not found",
      });
    }

    if (
      !activityLog.budgetItem.monthlyBudget.userProfile.equals(req.profile._id)
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    res.status(200).json({
      activityLog,
    });
  } catch (err) {
    console.error("getActivityLogById(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * get activity log by budget item
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getActivityLogsByBudget(req, res) {
  try {
    const item = await BudgetItem.findById(req.params.budgetItemId).populate(
      "monthlyBudget",
    );

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

    const activityLogs = await ActivityLog.find({
      budgetItem: item._id,
    }).sort({
      activityDate: -1,
    });

    res.status(200).json({ activityLogs });
  } catch (err) {
    console.error("getActivityLogsByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// UPDATE
/**
 * update activity log
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function updateActivityLog(req, res) {
  try {
    const activityLog = await ActivityLog.findById(req.params.id).populate({
      path: "budgetItem",
      populate: {
        path: "monthlyBudget",
      },
    });

    if (!activityLog) {
      return res.status(404).json({
        message: "Activity log not found",
      });
    }

    if (
      !activityLog.budgetItem.monthlyBudget.userProfile.equals(req.profile._id)
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    const { name, amount, activityDate, notes } = req.body;
    const updatedActivityLog = await ActivityLog.findByIdAndUpdate(
      req.params.id,
      {
        name,
        amount,
        activityDate,
        notes,
      },
      { new: true, runValidators: true },
    );

    if (!updatedActivityLog)
      return res.status(404).json({ message: "Activity log not found" });
    res.status(200).json({
      updatedActivityLog,
    });
  } catch (err) {
    console.error("updateActivityLog(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// DELETE
/**
 * delete activity log
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function deleteActivityLog(req, res) {
  try {
    const activityLog = await ActivityLog.findById(req.params.id).populate({
      path: "budgetItem",
      populate: {
        path: "monthlyBudget",
      },
    });

    if (!activityLog) {
      return res.status(404).json({
        message: "Activity log not found",
      });
    }

    if (
      !activityLog.budgetItem.monthlyBudget.userProfile.equals(req.profile._id)
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const deletedActivityLog = await ActivityLog.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedActivityLog)
      return res.status(404).json({ message: "Activity log not found" });

    res.status(200).json({
      deletedActivityLog,
    });
  } catch (err) {
    console.error("deleteActivityLog(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// delete activity log by budget item
export async function deleteActivityLogByBudget(req, res) {
  try {
    const item = await BudgetItem.findById(req.params.budgetItemId).populate(
      "monthlyBudget",
    );

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
    const deletedActivityLogs = await ActivityLog.deleteMany({
      budgetItem: req.params.budgetItemId,
    });
    res.status(200).json({
      deletedCount: deletedActivityLogs.deletedCount,
    });
  } catch (err) {
    console.error("deleteActivityLogByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}
