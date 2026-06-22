import mongoose from "mongoose";

/**
 * Represents a category within a monthly budget.
 *
 * Categories are used to group related budget items and can
 * represent either income or expenses.
 *
 * Examples:
 * - Income
 * - Housing
 * - Transportation
 * - Groceries
 * - Entertainment
 */
const budgetCategorySchema = new mongoose.Schema(
  {
    /**
     * The monthly budget this category belongs to.
     */
    monthlyBudget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MonthlyBudget",
      required: true,
    },

    /**
     * Controls the display order of categories in the UI.
     */
    displayOrder: {
      type: Number,
      required: true,
      min: 0,
      max: 999,
    },

    /**
     * The user-facing category name.
     *
     * Examples:
     * - Housing
     * - Groceries
     * - Freelance
     */
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
      maxLength: 50,
    },

    /**
     * Visual emoji associated with the category. String names are
     * converted into visual emojis.
     *
     * Examples:
     * 🏠 🍔 🚗 💰
     */
    emoji: {
      type: String,
      required: true,
      minLength: 0,
      maxLength: 100,
    },

    /**
     * Hex color used when displaying the category.
     *
     * Examples:
     * #FF5733
     * #4CAF50
     */
    color: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 6,
    },

    /**
     * Indicates whether the category contains income
     * or expense budget items.
     */
    categoryType: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    /**
     * Total planned amount assigned to this category.
     */
    plannedAmount: {
      type: Number,
      min: 0,
      max: 999999999,
      default: 0,
    },
  },
  { timestamps: true },
);

/**
 * Prevents duplicate category names within the same budget.
 *
 * Valid:
 * Housing (June 2026) & Housing (July 2026)
 * Utilities (June 2026) & Car (June 2026)
 *
 * Invalid:
 * Housing (June 2026) & Housing (June 2026)
 */
budgetCategorySchema.index({ monthlyBudget: 1, name: 1 }, { unique: true });

budgetCategorySchema.index({
  monthlyBudget: 1,
  displayOrder: 1,
});

/**
 * BudgetCategory model.
 */
const BudgetCategory = mongoose.model("BudgetCategory", budgetCategorySchema);

export default BudgetCategory;
