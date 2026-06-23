import mongoose from "mongoose";

/**
 * Represents an individual budget item within a category.
 *
 * Examples:
 * Category: Housing
 * - Rent
 * - Renter's Insurance
 *
 * Category: Income
 * - Paycheck
 * - Side Gig
 */
const budgetItemSchema = new mongoose.Schema(
  {
    /**
     * The category this budget item belongs to.
     */
    budgetCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BudgetCategory",
      required: true,
    },

    /**
     * Controls the display order of budget items
     * within a category.
     */
    displayOrder: {
      type: Number,
      required: true,
      min: 0,
      max: 999,
    },

    /**
     * User-facing name of the budget item.
     *
     * Examples:
     * - Rent
     * - Electric Bill
     * - Main Paycheck
     */
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    /**
     * Visual emoji associated with the budget item.
     *
     * Examples:
     * 🏠 ⚡ 💰
     */
    emoji: {
      type: String,
      required: true,
      minLength: 0,
      maxLength: 100,
    },

    /**
     * Planned amount allocated to this item.
     */
    plannedAmount: {
      type: Number,
      min: 0,
      max: 999999999,
      default: 0,
    },

    /**
     * Optional recurring schedule associated
     * with the budget item.
     */
    budgetPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BudgetPlan",
      default: null,
    },

    /**
     * Indicates whether reminder notifications
     * should be generated for this item.
     */
    hasReminder: {
      type: Boolean,
      default: false,
    },

    /**
     * Number of days before the scheduled date
     * that a reminder should be sent.
     */
    reminderDaysBefore: {
      type: Number,
      min: 1,
      max: 60,
      default: null,
    }
  },
  { timestamps: true },
);

/**
 * Prevents duplicate budget item names within
 * the same category.
 *
 * Valid:
 * Housing -> Rent & Utilities -> Rent
 *
 * Invalid:
 * Housing -> Rent & Housing -> Rent
 */
budgetItemSchema.index({ budgetCategory: 1, name: 1 }, { unique: true });

budgetItemSchema.index({
  budgetCategory: 1,
  displayOrder: 1,
});

/**
 * BudgetItem model.
 */
const BudgetItem = mongoose.model("BudgetItem", budgetItemSchema);

export default BudgetItem;
