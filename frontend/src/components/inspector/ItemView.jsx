import InspectorPage from "./InspectorPage";
import HeaderStandard from "../data-display/HeaderStandard";
import BudgetMetricCard from "../data-display/BudgetMetricCard";
import ItemDetails from "./sections/ItemDetails";
import RecentActivity from "./sections/RecentActivity";
import Button from "../actions/Button";
import { getActivityLogsByBudget } from "../../endpoint/ActivityApi";
import { Plus, Pencil } from "lucide-react";

export default function ItemView({
  data,
  pushView,
  goBack,
  onClickActivity,
  onAddActivity,
  onEditItem,
  onDeleteItem,
  userSettings,
}) {
  console.log(data);
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
        <BudgetMetricCard
          actual={data?.actual}
          planned={data?.planned}
          userSettings={userSettings}
        />
      }
      primaryButton={
        <Button
          text="Record Activity"
          iconLeft={Plus}
          onClick={() => onAddActivity?.(data)}
        />
      }
      secondaryButton={
        <Button
          variant="ghost"
          text="Edit"
          iconLeft={Pencil}
          onClick={() => onEditItem?.(data)}
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
      <ItemDetails item={data} userSettings={userSettings} />

      <RecentActivity
        activities={data?.activities ?? []}
        onClickActivity={onClickActivity}
      />
    </InspectorPage>
  );
}
