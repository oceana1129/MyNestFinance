import React from 'react'
import InfoDisplay from './InfoDisplay';

const DisplayActivities = ({activities,
  maxActivities = activities.length,}) => {
  {
    console.log(activities)
  return (
    <>
      {activities
        .slice(0, maxActivities)
        .map((activity) => (
          <InfoDisplay
            key={activity.id}
            variant={activity.variant}
            icon={activity.icon}
            header={activity.name}
            text={activity.name}
            subtitle={activity.name}
          />
        ))}
    </>
  );
}
}

export default DisplayActivities
