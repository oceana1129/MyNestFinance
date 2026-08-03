export default function ActivityView({

    data,

    goBack,

}) {

    return (

        <InspectorPage

            backText="Back to Item"

            onBack={goBack}

            header={
                <HeaderStandard
                    header="Activity Log"
                    text={data.name}
                />
            }

            primaryButton={null}

            dangerButton={
                <Button
                    variant="ghostDanger"
                    text="Delete Activity"
                />
            }

        >

            <DashboardSection title="Activity Details">

                <ActivityDetails
                    data={data}
                />

            </DashboardSection>

            <DashboardSection title="Notes">

                <p>{data.notes}</p>

            </DashboardSection>

        </InspectorPage>

    );

}