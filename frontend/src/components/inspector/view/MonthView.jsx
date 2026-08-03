export default function MonthView({

    data,

    push,

}) {

    return (

        <div className="flex flex-col gap-8">

            <HeaderStandard

                header={data.title}

                text={data.subtitle}

            />

            <BudgetMetricCard

                actual={data.actual}

                planned={data.planned}

            />

            <DashboardSection title="Categories">

                <DisplayActivities

                    activities={data.categories.map(category => ({

                        ...category,

                        variant: "item",

                        header: category.name,

                        text: `${category.percentage}% of spending`,

                        subtitle: `$${category.amount}`,

                        onClick: () =>
                            push("category", category),

                    }))}

                />

            </DashboardSection>

            <DashboardSection title="Recent Activity">

                <DisplayActivities

                    activities={data.recentActivity}

                />

            </DashboardSection>

        </div>

    );

}