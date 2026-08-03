import { useState } from "react";

import MonthView from "./views/MonthView";
import CategoryView from "./views/CategoryView";
import ItemView from "./views/ItemView";
import ActivityView from "./views/ActivityView";

const viewMap = {
    month: MonthView,
    category: CategoryView,
    item: ItemView,
    activity: ActivityView,
};

export default function Inspector() {

    const [stack, setStack] = useState([
        {
            type: "month",
            data: {}
        }
    ]);

    const current = stack[stack.length - 1];

    const View = viewMap[current.type];

    function pushView(type, data) {
        setStack(prev => [
            ...prev,
            {
                type,
                data
            }
        ]);
    }

    function goBack() {
        if (stack.length === 1) return;

        setStack(prev => prev.slice(0, -1));
    }

    return (
        <View
            data={current.data}
            pushView={pushView}
            goBack={goBack}
        />
    );
}