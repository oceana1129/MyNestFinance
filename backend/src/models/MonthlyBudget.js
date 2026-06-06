import mongoose from "mongoose";

const monthlyBudgetSchema = new mongoose.Schema(
  {
    /**
     * The user the monthly budget belongs to.
     */
    userProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    /**
     * The month of the budget.
     */
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },
    /**
     * The year of the budget.
     */
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 2500,
    },
  },
  { timestamps: true },
);

monthlyBudgetSchema.index(
  { userProfile: 1, month: 1, year: 1 },
  { unique: true },
);

monthlyBudgetSchema.index({
  userProfile: 1,
});

/**
 * MonthlyBudget model.
 */
const MonthlyBudget = mongoose.model("MonthlyBudget", monthlyBudgetSchema);

export default MonthlyBudget;
