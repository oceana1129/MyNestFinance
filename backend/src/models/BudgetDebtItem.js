import mongoose from "mongoose";

const budgetDebtItemSchema = new mongoose.Schema(
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
     * Type of debt being tracked.
     */
    debtType: {
      type: String,
      enum: [
        "credit-card",
        "student-loan",
        "auto-loan",
        "mortgage",
        "personal-loan",
        "medical-debt",
        "other",
      ],
      default: "other",
    },
    /**
     * Original amount borrowed.
     */
    originalBalance: {
      type: Number,
      min: 0,
      max: 999999999,
      required: false,
    },

    /**
     * Remaining balance owed.
     */
    currentBalance: {
      type: Number,
      min: 0,
      max: 999999999,
      required: true,
    },

    /**
     * Required minimum monthly payment.
     */
    minimumPayment: {
      type: Number,
      min: 0,
      max: 999999999,
      required: false,
    },

    /**
     * Annual Percentage Rate (APR).
     * Example:
     * 18.99 = 18.99%
     */
    interestRate: {
      type: Number,
      min: 0,
      max: 100,
      required: false,
    },

    /**
     * Desired payoff timeline.
     */
    preferredPayoffInYears: {
      type: Number,
      min: 1,
      default: 5,
      required: false,
    },
  },
  { timestamps: true },
);

/**
 * BudgetDebtItem model.
 */
const BudgetDebtItem = mongoose.model("BudgetDebtItem", budgetDebtItemSchema);

export default BudgetDebtItem;
