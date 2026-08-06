import InspectorPage from "./InspectorPage";
import HeaderStandard from "../data-display/HeaderStandard";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import DashboardSection from "./DashboardSection";
import TopItems from "./sections/TopItems";
import Insights from "./sections/Insights";
import Button from "../actions/Button";
import { Plus } from "lucide-react";

export default function CategoryView({
  data,
  pushView,
  goBack,
  onAddItem,
  onDeleteCategory,
}) {
  const items = data?.items ?? [];

  return (
    <InspectorPage
      backText="Back to Overview"
      onBack={goBack}
      header={
        <HeaderStandard
          header={data?.name}
          text={`${data?.itemCount ?? items.length} items`}
          icon={data?.icon}
        />
      }
      metric={
        <BudgetMetricCard actual={data?.actual} planned={data?.planned} />
      }
      primaryButton={
        <Button
          text="Add Expense"
          iconLeft={Plus}
          onClick={() => onAddItem?.(data)}
        />
      }
      dangerButton={
        <Button
          variant="ghostDanger"
          text="Delete Category"
          onClick={() => onDeleteCategory?.(data)}
        />
      }
    >
      <TopItems items={items} onItemClick={(item) => pushView("item", item)} />

      {/* NOTE: category breakdown doesn't currently return an `insights`
          field (see getCategoryBreakdown) — this section just won't render
          until that's added. Also: the original called a `CategoryInsights`
          component that doesn't exist anywhere in what's been shared; this
          uses the real `Insights` component instead (and its actual prop
          name, `insights`, not `data`). */}
      {data?.insights && (
        <DashboardSection title="Insights">
          <Insights insights={data.insights} />
        </DashboardSection>
      )}
    </InspectorPage>
  );
}
