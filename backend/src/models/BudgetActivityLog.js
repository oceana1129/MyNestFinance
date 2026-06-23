import mongoose from "mongoose";

/**
 * Represents a single financial activity associated
 * with a budget item.
 *
 * Examples:
 * - Rent Payment
 * - Paycheck
 * - Movie Tickets
 * - Credit Card Interest
 *
 * Activity logs are used to track actual financial
 * events that occur throughout the budgeting period.
 */
const budgetActivityLogSchema = new mongoose.Schema(
  {
    /**
     * The budget item this activity belongs to.
     */
    budgetItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BudgetItem",
      required: true,
    },

    /**
     * User-facing activity name.
     */
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 100,
    },

    /**
     * Monetary value associated with the activity.
     */
    amount: {
      type: Number,
      min: 0,
      max: 999999999,
      required: true,
    },

    /**
     * The date the activity occurred.
     */
    activityDate: {
      type: Date,
      default: Date.now,
    },

    /**
     * Optional user-provided notes.
     */
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: null,
    },
  },
  { timestamps: true },
);

budgetActivityLogSchema.index({
  budgetItem: 1,
});

budgetActivityLogSchema.index({
  budgetItem: 1,
  activityDate: -1,
});

/**
 * BudgetActivityLog model.
 */
const BudgetActivityLog = mongoose.model(
  "BudgetActivityLog",
  budgetActivityLogSchema,
);

export default BudgetActivityLog;
