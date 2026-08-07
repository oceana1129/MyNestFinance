import React from "react";
import InfoDisplay from "./InfoDisplay";
import { ICONS } from "../../utils/IconMap";
import { formatDate } from "../../utils/FormatDate";
import { formatCurrency } from "../../utils/FormatCurrency";

const DisplayActivities = ({
  activities,
  variant,
  maxActivities = activities.length,
  userSettings,
}) => {
  {
    // console.log("Activities", activities);]
    // console.log(activities);
    // console.log(formatDate(activity.activityDate));

    return (
      <>
        {activities && activities.length > 0 ? (
          activities
            .slice(0, maxActivities)
            .map((activity) => (
              <InfoDisplay
                key={activity._id}
                variant={variant}
                icon={ICONS[activity.emoji] || ICONS["CircleHelp"]}
                header={activity.name}
                subtitle={formatCurrency(activity.amount, userSettings)}
                color={activity.budgetItem}
                text={
                  activity?.activityDate
                    ? formatDate(activity.activityDate)
                    : ""
                }
              />
            ))
        ) : (
          <InfoDisplay
            header="No activities"
            text="Start adding activities to your budget."
          />
        )}
      </>
    );
  }
};

export default DisplayActivities;
