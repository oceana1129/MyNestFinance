import HeaderStandard from "../data-display/HeaderStandard";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import DashboardSection from "./DashboardSection";
import DisplayActivities from "../data-display/DisplayActivities";
import RecentActivity from "./sections/RecentActivity";

export default function MonthView({ data, pushView, userSettings }) {

  const categories = data?.categories ?? [];
  const recentActivity = data?.recentActivity ?? [];

  return (
    <div className="flex flex-col gap-8">
      <HeaderStandard
        header={data?.title ?? "Your month"}
        text={data?.subtitle ?? "A peak at how things are going."}
      />

      <BudgetMetricCard actual={data?.actual} planned={data?.planned} userSettings={userSettings}/>

      {/* <DashboardSection 
      title="Recent Activity">
      <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
          <DisplayActivities
          activities={categories.map((category) => ({
            ...category,
            variant: "item",
            header: category.name,
            text: `${category.percentage ?? 0}% of spending`,
            subtitle: `$${category.actual ?? 0}`,
            onClick: () => pushView("category", category),
          }))}
        />
        </div>
        
      </DashboardSection> */}

      <RecentActivity activities={recentActivity} userSettings={userSettings} />
    </div>
  );
}
