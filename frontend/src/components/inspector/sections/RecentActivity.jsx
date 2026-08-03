import DashboardSection from "../DashboardSection";
import DisplayActivities from "../../data-display/DisplayActivities";

export default function RecentActivity({
  activities,
  onActivityClick,
}) {
  return (
    <DashboardSection title="Recent Activity">
      <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100 shadow-sm">

        <DisplayActivities
          activities={activities}
          maxActivities={10}
          onItemClick={onActivityClick}
        />

      </div>
    </DashboardSection>
  );
}