import HeaderStandard from "../data-display/HeaderStandard";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import DashboardSection from "./DashboardSection";
import DisplayActivities from "../data-display/DisplayActivities";
import RecentActivity from "./sections/RecentActivity";

export default function MonthView({ data, pushView }) {
  const categories = data?.categories ?? [];
  const recentActivity = data?.recentActivity ?? [];

  return (
    <div className="flex flex-col gap-8">
      <HeaderStandard
        header={data?.title ?? "Your month"}
        text={data?.subtitle}
      />

      <BudgetMetricCard actual={data?.actual} planned={data?.planned} />

      <DashboardSection title="Categories">
        <DisplayActivities
          activities={categories.map((category) => ({
            ...category,
            variant: "item",
            header: category.name,
            text: `${category.percentage ?? 0}% of spending`,
            // NOTE: the category breakdown response uses `actual`, not
            // `amount` (the original had `category.amount`, which doesn't
            // exist on that response shape).
            subtitle: `$${category.actual ?? 0}`,
            onClick: () => pushView("category", category),
          }))}
        />
      </DashboardSection>

      <RecentActivity activities={recentActivity} />
    </div>
  );
}
