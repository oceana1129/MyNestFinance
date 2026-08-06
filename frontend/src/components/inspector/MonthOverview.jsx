import React from "react";
import { useState } from "react";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import HeaderStandard from "../data-display/HeaderStandard";
import InfoDisplay from "../data-display/InfoDisplay";
import DisplayActivities from "../data-display/DisplayActivities";
import DashboardSection from "./DashboardSection";
import { Zap, Home, Car } from "lucide-react";

const MonthOverview = ({ dashboardMetrics, monthlyActivity }) => {
  // console.log(monthlyActivity);
  console.log(dashboardMetrics);

  return (
    <>
      <HeaderStandard
        header="Your month"
        text="A peak at how things are going."
      />
      <BudgetMetricCard
        color="white"
        spent={dashboardMetrics?.actualExpenses}
        income={dashboardMetrics?.plannedExpenses}
      />

      <DashboardSection
        title="Recent Activity"
        children={
          <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
            <DisplayActivities
              activities={monthlyActivity}
              variant={"item"}
              maxActivities={10}
            />
          </div>
        }
      />
    </>
    // <div className="flex flex-col gap-8 px-8 py-10 h-screen sticky shrink-0 top-0 bg-white bg-opacity-70 text-slate-700 border-2 border-white">

    // </div>
  );
};

export default MonthOverview;
