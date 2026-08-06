import React from "react";
import ProgressBar from "../data-input/ProgressBar";
import { formatCurrency } from "../../utils/FormatCurrency";

const BudgetMetricCard = ({
  title = "Planned Expenses",
  spent = 1000,
  income = 2000,
  color = "pink",
}) => {
  const leftover = formatCurrency(income - spent);
  const leftoverPercentage = (((income - spent) / income) * 100).toFixed(2);
  const formatSpent = formatCurrency(spent);
  const formatIncome = formatCurrency(income);

  return (
    <div
      className={`rounded-2xl shadow-sm border p-6 
      ${
        color === "pink"
          ? "bg-gradient-to-br from-pink-50 to-white border-pink-100"
          : "bg-white"
      }`}
    >
      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-600">{title}</h3>

      {/* Main Amount */}
      <div className="mt-4">
        <p className={`text-3xl font-bold tracking-tight text-slate-800`}>
          {formatSpent}
        </p>

        <p className="mt-1 text-lg text-slate-500">
          of <span className="font-medium">{formatIncome}</span> planned
        </p>
      </div>

      {/* Progress */}
      <div className="mt-8">
        <ProgressBar
          value={(spent / income) * 100}
          color="from-pink-500"
          colorTwo="to-fuchsia-500"
        />
      </div>

      {/* Status */}
      <div className="mt-3">
        <p
          className={`font-semibold ${
            spent > income ? "text-pink-500" : "text-emerald-500"
          }`}
        >
          {spent > income ? (
            <>
              {leftover} over • {leftoverPercentage}% over budget
            </>
          ) : (
            <>
              {leftover} left •{" "}
              {typeof leftoverPercentage === "number" ? leftoverPercentage : 0}%
              remaining
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default BudgetMetricCard;
