import InspectorPage from "./InspectorPage";
import HeaderStandard from "../data-display/HeaderStandard";
import DashboardSection from "./DashboardSection";
import ActivityDetails from "./sections/ActivityDetails";
import Button from "../actions/Button";

export default function ActivityView({
  data,
  goBack,
  onDeleteActivity,
  onEditActivity,
  userSettings,
}) {
  return (
    <InspectorPage
      backText="Back to Item"
      onBack={goBack}
      header={<HeaderStandard header="Activity Log" text={data?.name} />}
      primaryButton={null}
      dangerButton={
        <Button
          variant="ghostDanger"
          text="Delete Activity"
          onClick={() => onDeleteActivity?.(data)}
        />
      }
    >
      {/* ActivityDetails wraps itself in a "Activity Details" DashboardSection */}
      <ActivityDetails data={data} />

      <DashboardSection title="Notes">
        <p>{data?.notes || "No notes for this activity."}</p>
      </DashboardSection>
    </InspectorPage>
  );
}
