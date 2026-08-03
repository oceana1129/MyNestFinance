export default function CategoryView({

    data,

    pushView,

    goBack,

}) {

    return (

        <InspectorPage

            backText="Back to Overview"

            onBack={goBack}

            header={
                <HeaderStandard
                    header={data.name}
                    text={`${data.itemCount} items`}
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
                <Button
                    text="Add Expense"
                    iconLeft={Plus}
                />
            }

            dangerButton={
                <Button
                    variant="ghostDanger"
                    text="Delete Category"
                />
            }

        >

            <DashboardSection title="Top Items">

                <DisplayActivities

                    activities={data.items}

                    maxActivities={3}

                    onClick={(item) =>
                        pushView("item", item)
                    }

                />

            </DashboardSection>

            <DashboardSection title="Insights">

                <CategoryInsights
                    data={data.insights}
                />

            </DashboardSection>

        </InspectorPage>

    );

}