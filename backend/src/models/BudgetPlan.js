import mongoose from "mongoose";

/**
 * Represents a recurring schedule associated with a budget item.
 *
 * Budget plans are used to automatically generate expected activity logs
 * for recurring expenses and income
 *
 * Example:
 *  - rent due every 1st of the month
 *  - netflix subscription every month
 *  - yearly insurance payment
 */
const budgetPlanSchema = new mongoose.Schema(
  {
    /**
     * Parent budget item.
     */
    budgetItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BudgetItem",
      required: true,
      unique: true,
    },

    /**
     * Type of recurring schedule.
     */
    scheduleType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", "customInterval"],
      required: true,
    },

    /**
     * Weekly schedules.
     * Example: every Saturday
     */
    dayOfWeek: {
      type: String,
      enum: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      default: null,
    },

    /**
     * Monthly schedules.
     * Example: every month on the 15th
     */
    dayOfMonth: {
      type: Number,
      min: 1,
      max: 31,
      default: null,
    },

    /**
     * Monthly schedules.
     * Example: every last day of month
     */
    lastDayOfMonth: {
      type: Boolean,
      default: false,
    },

    /**
     * Yearly schedules.
     * Example: every June 15th
     */
    monthOfYear: {
      type: Number,
      min: 1,
      max: 12,
      default: null,
    },

    /**
     * Custom intervals.
     * Examples: every 3 days, every 2 weeks, every 6 months
     */
    interval: {
      type: Number,
      min: 1,
      max: 365,
      default: null,
    },

    /**
     * Indicates a custom interval unit.
     */
    intervalUnit: {
      type: String,
      enum: ["days", "weeks", "months", "years"],
      default: null,
    },

    /**
     * Starting point for recurrence calculations.
     */
    startDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * BudgetPlan model.
 */
const BudgetPlan = mongoose.model("BudgetPlan", budgetPlanSchema);

export default BudgetPlan;
