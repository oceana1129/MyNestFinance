import React from "react";
import InfoDisplay from "./InfoDisplay";
import { Info } from "lucide-react";

const DisplayActivities = ({
  activities,
  variant,
  maxActivities = activities.length,
}) => {
  {
    // console.log(activities);
    return (
      <>
        {activities && activities.length > 0 ? (
          activities
            .slice(0, maxActivities)
            .map((activity) => (
              <InfoDisplay
                key={activity._id}
                variant={variant}
                icon={activity.budgetItem.emoji}
                header={activity.name}
                text={`$${activity.amount}`}
                subtitle={formatDate(activity.activityDate)}
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
