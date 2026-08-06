import InspectorPage from "./InspectorPage";
import HeaderStandard from "../data-display/HeaderStandard";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import ItemDetails from "./sections/ItemDetails";
import RecentActivity from "./sections/RecentActivity";
import Button from "../actions/Button";

export default function ItemView({
  data,
  pushView,
  goBack,
  onRecordActivity,
  onDeleteItem,
}) {
  return (
    <InspectorPage
      backText="Back to Category"
      onBack={goBack}
      header={
        <HeaderStandard
          header={data?.name}
          text={`${data?.actual ?? 0} spent`}
          icon={data?.icon}
        />
      }
      metric={
        <BudgetMetricCard actual={data?.actual} planned={data?.planned} />
      }
      primaryButton={
        <Button
          text="Record Activity"
          onClick={() => onRecordActivity?.(data)}
        />
      }
      dangerButton={
        <Button
          variant="ghostDanger"
          text="Delete Item"
          onClick={() => onDeleteItem?.(data)}
        />
      }
    >
      {/* ItemDetails already wraps itself in a "Item Details" DashboardSection
          — the original double-wrapped it with an outer one too, which would
          have rendered the "Item Details" heading twice. */}
      <ItemDetails item={data} />

      <RecentActivity
        activities={data?.activities ?? []}
        onActivityClick={(activity) => pushView("activity", activity)}
      />
    </InspectorPage>
  );
}
