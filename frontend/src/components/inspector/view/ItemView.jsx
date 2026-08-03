export default function ItemView({

    data,

    pushView,

    goBack,

}) {

    return (

        <InspectorPage

            backText="Back to Category"

            onBack={goBack}

            header={
                <HeaderStandard
                    header={data.name}
                    text={`${data.actual} spent`}
                    icon={data.icon}
                />
            }

            metric={
                <BudgetMetricCard
                    actual={data.actual}
                    planned={data.planned}
                />
            }

            primaryButton={
                <Button text="Record Activity" />
            }

            dangerButton={
                <Button
                    variant="ghostDanger"
                    text="Delete Item"
                />
            }

        >

            <DashboardSection title="Item Details">

                <ItemDetails data={data} />

            </DashboardSection>

            <DashboardSection title="Recent Activity">

                <DisplayActivities

                    activities={data.activities}

                    onClick={(activity) =>
                        pushView("activity", activity)
                    }

                />

            </DashboardSection>

        </InspectorPage>

    );

}