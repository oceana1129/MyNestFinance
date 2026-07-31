import React from "react";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import HeaderStandard from "./HeaderStandard";
import InfoDisplay from "./InfoDisplay";
import { Zap } from "lucide-react";

const MonthOverview = () => {
  return (
    <div className=" px-8 py-10 h-screen sticky shrink-0 top-0 bg-white bg-opacity-70 text-slate-700 border-2 border-white">
      <HeaderStandard
        header="Your month"
        text="A peak at how things are going."
        size="text-2xl"
      />
      <BudgetMetricCard />
      <InfoDisplay
        variant="item"
        icon={Zap}
        header="Groceries"
        text={"May 28th - food"}
        subtitle="-$98.54"
      />
    </div>
  );
};

export default MonthOverview;
