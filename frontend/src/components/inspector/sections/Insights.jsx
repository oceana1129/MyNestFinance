import DashboardSection from "../DashboardSection";
import InfoDisplay from "../../data-display/InfoDisplay";

export default function Insights({

    insights,

}) {

    return (

        <DashboardSection title="Insights">

            <div className="grid grid-cols-3 gap-6">

                {insights.map(insight => (

                    <InfoDisplay

                        key={insight.id}

                        variant="stat"

                        icon={insight.icon}

                        header={insight.header}

                        text={insight.value}

                        subtitle={insight.subtitle}

                    />

                ))}

            </div>

        </DashboardSection>

    );

}