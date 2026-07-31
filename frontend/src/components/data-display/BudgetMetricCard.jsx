import React from "react";
import ProgressBar from "../data-input/ProgressBar";
import { formatCurrency } from "../../utils/FormatCurrency";

const BudgetMetricCard = ({
  title = "Planned Budget",
  spent = 1000,
  income = 2000,
}) => {
  const leftover = formatCurrency(income - spent);
  const leftoverPercentage = (((income - spent) / income) * 100).toFixed(2);
  const formatLeftover = formatCurrency(leftover);
  const formatSpent = formatCurrency(spent);
  const formatIncome = formatCurrency(income);

  return (
    <div className="flex flex-col gap-2">
      {/* title */}
      <p3 className="text-xl font-bold text-slate-500">{title}</p3>
      <div className="flex gap-3  pb">
        {/* x amount leftover */}
        <p className="text-xl font-bold text-slate-700">{leftover}</p>
        {/* % leftover */}
        <p className="self-end text-slate-500 text-sm">
          {leftoverPercentage}% leftover
        </p>
      </div>
      <div>
        <ProgressBar value={leftoverPercentage} />
        <div className="flex justify-between text-sm">
          {/* spent */}
          <p>{formatSpent} spent</p>
          {/* income */}
          <p>{formatIncome} income</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetMetricCard;
