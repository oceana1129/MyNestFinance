import ActivityLog from "../models/BudgetActivityLog.js";
import BudgetItem from "../models/BudgetItem.js";

// CREATE
// create an activity log
export async function createActivityLog(req, res) {
  try {
    const { budgetItem, name, amount, activityDate, notes, activityType } =
      req.body;

    // does budgetItem exist?
    const item = await BudgetItem.findById(budgetItem);

    if (!item) return res.status(404).json({ message: "Item not found" });

    const savedActivityLog = await ActivityLog.create({
      budgetItem,
      name,
      amount,
      activityDate,
      notes,
      activityType,
    });

    res.status(200).json({
      message: "Activity log created successfully!",
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
// get all activity logs
export async function getAllActivityLogs(req, res) {
  try {
    const activityLogs = await ActivityLog.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All activity logs:\n", activityLogs });
  } catch (err) {
    console.error("getAllActivityLogs(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get activity log by id
export async function getActivityLogById(req, res) {
  try {
    const activityLog = await ActivityLog.findById(req.params.id);
    if (!activityLog)
      return res.status(404).json({ message: "Activity log not found" });
    res.status(200).json({
      message: `Activity log with id ${req.params.id} found`,
      activityLog,
    });
  } catch (err) {
    console.error("getActivityLogById(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get activity log by budget item
export async function getActivityLogsByBudget(req, res) {
  try {
    const activityLogs = await ActivityLog.find({
      budgetItem: req.params.budgetItemId,
    }).sort({
      activityDate: -1,
    });
    res.status(200).json({ message: "Activity logs found", activityLogs });
  } catch (err) {
    console.error("getActivityLogsByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// UPDATE
// update activity log
export async function updateActivityLog(req, res) {
  try {
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
      message: "Activity log updated successfully!",
      updatedActivityLog,
    });
  } catch (err) {
    console.error("updateActivityLog(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// DELETE
// delete activity log
export async function deleteActivityLog(req, res) {
  try {
    const deletedActivityLog = await ActivityLog.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedActivityLog)
      return res.status(404).json({ message: "Activity log not found" });
    res.status(200).json({
      message: "Activity log deleted successfully!",
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
    const deletedActivityLogs = await ActivityLog.deleteMany({
      budgetItem: req.params.budgetItemId,
    });
    res.status(200).json({
      message: "ActivityLogs deleted successfully!",
      deletedCount: deletedActivityLogs.deletedCount,
    });
  } catch (err) {
    console.error("deleteActivityLogByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}
