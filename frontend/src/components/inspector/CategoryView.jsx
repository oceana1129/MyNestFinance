import InspectorPage from "./InspectorPage";
import HeaderStandard from "../data-display/HeaderStandard";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import DashboardSection from "./DashboardSection";
import TopItems from "./sections/TopItems";
import Insights from "./sections/Insights";
import Button from "../actions/Button";
import { Plus, Pencil } from "lucide-react";
import { use } from "react";

export default function CategoryView({
  data,
  pushView,
  goBack,
  onAddItem,
  onEditCategory,
  onDeleteCategory,
  userSettings,
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
        <BudgetMetricCard
          actual={data?.actual}
          planned={data?.planned}
          userSettings={userSettings}
        />
      }
      primaryButton={
        <Button text="Add" iconLeft={Plus} onClick={() => onAddItem?.(data)} />
      }
      secondaryButton={
        <Button
          variant="ghost"
          text="Edit"
          iconLeft={Pencil}
          onClick={() => onEditCategory?.(data)}
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
      {/* <TopItems items={items} onItemClick={(item) => pushView("item", item)} /> */}

      {/* {data?.insights && (
        <DashboardSection title="Insights">
          <Insights insights={data.insights} />
        </DashboardSection>
      )} */}
    </InspectorPage>
  );
}
