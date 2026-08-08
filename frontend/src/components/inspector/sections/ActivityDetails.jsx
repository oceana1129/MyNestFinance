import InfoDisplay from "../../data-display/InfoDisplay";
import DashboardSection from "../DashboardSection";
import { DollarSign, CalendarDays } from "lucide-react";

/**
 * This component didn't exist yet — ActivityView referenced it but it was
 * never created. Built to match ItemDetails' pattern/props shape.
 *
 * ASSUMPTION: a BudgetActivityLog only has `amount` and `activityDate`
 * (per the model fields seen elsewhere) — no other fields are shown here.
 * Adjust if the real activity log doc has more to display.
 */
export default function ActivityDetails({ data }) {
  return (
    <DashboardSection title="Activity Details">
      <div className="flex flex-col gap-8">
        <InfoDisplay
          variant="detail"
          icon={DollarSign}
          color="teal"
          text="Amount"
          header={`$${data?.amount ?? 0}`}
        />

        <InfoDisplay
          variant="detail"
          icon={CalendarDays}
          color="blue"
          text="Date"
          header={
            data?.activityDate
              ? new Date(data.activityDate).toLocaleDateString()
              : "—"
          }
        />
      </div>
    </DashboardSection>
  );
}
