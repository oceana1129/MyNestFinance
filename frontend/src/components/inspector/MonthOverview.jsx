import React from "react";
import {useState} from "react"
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import HeaderStandard from "../data-display/HeaderStandard";
import InfoDisplay from "../data-display/InfoDisplay";
import DisplayActivities from "../data-display/DisplayActivities";
import DashboardSection from "./DashboardSection";
import { Zap, Home, Car } from "lucide-react";

const MonthOverview = () => {
  const [activities] = useState([
  {
    id: 1,
    variant: "item",
    icon: Zap,
    header: "Groceries",
    text: "May 28 - Food",
    subtitle: "-$98.54",
  },
  {
    id: 2,
    variant: "item",
    icon: Home,
    header: "Rent",
    text: "May 27 - Housing",
    subtitle: "-$1200.00",
  },
  {
    id: 3,
    variant: "item",
    icon: Car,
    header: "Gas",
    text: "May 26 - Transportation",
    subtitle: "-$42.11",
  },
]);

  return (
    <div className="flex flex-col gap-8 px-8 py-10 h-screen sticky shrink-0 top-0 bg-white bg-opacity-70 text-slate-700 border-2 border-white">
      <HeaderStandard
        header="Your month"
        text="A peak at how things are going."
      />
      <BudgetMetricCard color="white"/>
      
      <DashboardSection title="Recent Activity" 
      children={<div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
        <DisplayActivities
          activities={activities}
          maxActivities={10}
        />
      </div>}/>
      
    </div>
  );
};

export default MonthOverview;
