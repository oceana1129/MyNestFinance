import InfoDisplay from "../../data-display/InfoDisplay";
import DashboardSection from "../DashboardSection";

import {
  DollarSign,
  CalendarDays,
  Repeat,
  Bell,
} from "lucide-react";

export default function ItemDetails({
  item,
}) {

  return (

    <DashboardSection title="Item Details">

      <div className="flex flex-col gap-8">

        <InfoDisplay
          variant="detail"
          icon={DollarSign}
          header="Planned Budget"
          text={`$${item.planned}`}
        />

        <InfoDisplay
          variant="detail"
          icon={CalendarDays}
          header="Due Date"
          text={item.dueDate}
        />

        <InfoDisplay
          variant="detail"
          icon={Repeat}
          header="Repeats"
          text={item.repeat}
        />

        <InfoDisplay
          variant="toggle"
          icon={Bell}
          header="Reminder"
          text={`${item.reminderDays} days before`}
          checked={item.hasReminder}
        />

      </div>

    </DashboardSection>

  );

}