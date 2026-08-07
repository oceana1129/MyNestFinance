import MonthView from "./MonthView";
import CategoryView from "./CategoryView";
import ItemView from "./ItemView";
import ActivityView from "./ActivityView";

const viewMap = {
  month: MonthView,
  category: CategoryView,
  item: ItemView,
  activity: ActivityView,
};

/**
 * Renders whichever view is on top of the navigation stack.
 *
 * The stack itself is now owned by Dashboard since clicks happen in the
 * dashboard
 *
 * onAddItem / onRecordActivity / onDeleteCategory / onDeleteItem /
 * onDeleteActivity are just forwarded to the active view, since the actual
 * create/delete overlays live in Dashboard
 */
export default function Inspector({
  stack,
  pushView,
  userSettings,
  goBack,
  onAddItem,
  onAddActivity,
  onEditCategory,
  onEditItem,
  onEditActivity,
  onDeleteCategory,
  onDeleteItem,
  onDeleteActivity,
}) {
  const current = stack[stack.length - 1];
  const View = viewMap[current.type];

  if (!View) return null;

  // console.log(current.data);

  return (
    <View
      data={current.data}
      pushView={pushView}
      goBack={goBack}
      userSettings={userSettings}
      onAddItem={onAddItem}
      onAddActivity={onAddActivity}
      onEditCategory={onEditCategory}
      onEditItem={onEditItem}
      onEditActivity={onEditActivity}
      onDeleteCategory={onDeleteCategory}
      onDeleteItem={onDeleteItem}
      onDeleteActivity={onDeleteActivity}
    />
  );
}
