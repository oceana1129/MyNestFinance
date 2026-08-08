import DashboardSection from "../DashboardSection";
import DisplayActivities from "../../data-display/DisplayActivities";

export default function TopItems({
  items,
  onItemClick,
}) {
  
  return (
    <DashboardSection title="Top Items">
      <div className="flex flex-col gap-4 p-6 rounded-xl bg-white border border-slate-100 shadow-sm">

        <DisplayActivities
          activities={items}
          maxActivities={5}
          onItemClick={onItemClick}
        />

      </div>
    </DashboardSection>
  );
}