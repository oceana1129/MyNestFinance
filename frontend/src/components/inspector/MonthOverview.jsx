import React from "react";
import { useState } from "react";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import HeaderStandard from "../data-display/HeaderStandard";
import InfoDisplay from "../data-display/InfoDisplay";
import DisplayActivities from "../data-display/DisplayActivities";
import DashboardSection from "./DashboardSection";
import { Zap, Home, Car } from "lucide-react";

const MonthOverview = ({ dashboardMetrics, monthlyActivity, userSettings }) => {
  return (
    <>
      <HeaderStandard
        header="Your month"
        text="A peak at how things are going."
      />
      <BudgetMetricCard
        color="white"
        spent={dashboardMetrics?.actual}
        income={dashboardMetrics?.planned}
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
  );
};

export default MonthOverview;
