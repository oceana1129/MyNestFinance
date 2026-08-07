import InfoDisplay from "../../data-display/InfoDisplay";
import DashboardSection from "../DashboardSection";
import { formatCurrency } from "../../../utils/FormatCurrency";

import {
  DollarSign,
  CalendarDays,
  Repeat,
  Bell,
} from "lucide-react";

export default function ItemDetails({
  item,
  userSettings
}) {  
  
  return (

    <DashboardSection title="Item Details">

      <div className="flex flex-col gap-4">

        <InfoDisplay
          variant="detail"
          icon={DollarSign}
          color="green"
          header={`${formatCurrency(item.planned, userSettings)}`}
          text="Planned Budget"
        />

        <InfoDisplay
          variant="detail"
          icon={CalendarDays}
          color="teal"
          header={item.dueDate || "No date set"}
          text="Due Date"
        />

        <InfoDisplay
          variant="detail"
          icon={Repeat}
          color="sky"
          header={item.repeat || "Does not repeat"}
          text="Repeats"
        />

        {/* <InfoDisplay
          variant="toggle"
          icon={Bell}
          header={`${item.reminderDays} days before`}
          text="Reminder me"
          checked={item.hasReminder}
        /> */}

      </div>

    </DashboardSection>

  );

}