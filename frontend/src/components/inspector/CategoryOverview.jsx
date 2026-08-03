import React from "react";
import {useState} from "react"
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import HeaderStandard from "../data-display/HeaderStandard";
import DashboardSection from "./DashboardSection";
import InfoDisplay from "../data-display/InfoDisplay";
import DisplayActivities from "../data-display/DisplayActivities";
import { Zap, Home, Car, MoveLeft, Ellipsis, Plus, Trash } from "lucide-react";
import Button from "../actions/Button";


const CategoryOverview = () => {
  const [activities] = useState([
  {
    id: 1,
    variant: "item",
    icon: Zap,
    header: "Groceries",
    text: "60% of spending",
    subtitle: "-$98.54",
  },
  {
    id: 2,
    variant: "item",
    icon: Home,
    header: "Rent",
    text: "20% of spending",
    subtitle: "-$70.00",
  },
  {
    id: 3,
    variant: "item",
    icon: Car,
    header: "Gas",
    text: "12% of spending",
    subtitle: "-$28.11",
  },
]);

  return (
    <div className="flex flex-col gap-8  px-8 py-10 h-screen sticky shrink-0 top-0
     bg-white bg-opacity-70 text-slate-700 border-2 border-white">
      <div className="flex justify-between">
        <Button iconLeft={MoveLeft} variant="glass" text="back to overview" color="purple"/>
        <Button iconLeft={Ellipsis} variant="ghost"/>
      </div>
      <HeaderStandard
        header="Utilities"
        text="3 items"
        size="text-2xl"
        icon={Zap}
        color="purple"
        subheader2={"Expense"}
      />
      <BudgetMetricCard color="white"/>
      
      
      <DashboardSection title="Top Items" 
      children={<div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100">
        <DisplayActivities
          activities={activities}
          maxActivities={3}
        />
      </div>}/>
      <Button iconLeft={Plus} text={"Add Expense"}/>
      <Button variant="ghostDanger" iconLeft={Trash} text={"Delete item"}/>
      
    </div>
  );
}

export default CategoryOverview
