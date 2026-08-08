import InspectorPage from "./InspectorPage";
import HeaderStandard from "../data-display/HeaderStandard";
import DashboardSection from "./DashboardSection";
import ActivityDetails from "./sections/ActivityDetails";
import Button from "../actions/Button";
import { Plus, Pencil, Trash } from "lucide-react";

export default function ActivityView({
  data,
  goBack,
  onClickActivity,
  onDeleteActivity,
  onEditActivity,
  userSettings,
}) {
  console.log(data);
  return (
    <InspectorPage
      backText="Back to Item"
      onBack={goBack}
      header={<HeaderStandard text="Activity Log" header={data?.name} />}
      primaryButton={null}
      secondaryButton={
        <Button
          variant="ghost"
          text="Edit Activity"
          iconLeft={Pencil}
          onClick={() => onEditActivity?.(data)}
        />
      }
      dangerButton={
        <Button
          variant="ghostDanger"
          text="Delete Activity"
          iconLeft={Trash}
          onClick={() => onDeleteActivity?.(data)}
        />
      }
    >
      <ActivityDetails onClick={() => onClickActivity(data)} data={data} />

      <DashboardSection title="Notes">
        <p>{data?.notes || "No notes for this activity."}</p>
      </DashboardSection>
    </InspectorPage>
  );
}
