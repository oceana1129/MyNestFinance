import React from "react";
import ProgressBar from "../data-input/ProgressBar";
import { formatCurrency } from "../../utils/FormatCurrency";

const BudgetMetricCard = ({
  title = "Planned Expenses",
  actual = 0,
  planned = 0,
  color = "pink",
  userSettings
}) => {

  const leftover = formatCurrency((planned - actual), userSettings);
  const leftoverPercentage =
    planned === 0
      ? 0
      : Math.max(0, ((planned - actual) / planned) * 100);
  
  const formatActual = formatCurrency(actual, userSettings);
  const formatPlanned = formatCurrency(planned, userSettings);

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
          {formatActual}
        </p>

        <p className="mt-1 text-lg text-slate-500">
          of <span className="font-medium">{formatPlanned}</span> planned
        </p>
      </div>

      {/* Progress */}
      <div className="mt-8">
        <ProgressBar
          value={(actual / planned) * 100}
          color="from-pink-500"
          colorTwo="to-fuchsia-500"
        />
      </div>

      {/* Status */}
      <div className="mt-3">
        <p
          className={`font-semibold ${
            actual > planned ? "text-pink-500" : "text-emerald-500"
          }`}
        >
          {actual > planned ? (
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
