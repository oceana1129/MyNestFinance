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
 * The stack itself is now owned by Dashboard (not Inspector), since clicks
 * in the main dashboard panel (e.g. clicking a category card) need to push
 * onto the *same* stack as clicks inside the inspector's own views (e.g.
 * clicking an item inside CategoryView) — that only works if both places
 * call the same `pushView`.
 *
 * onAddItem / onRecordActivity / onDeleteCategory / onDeleteItem /
 * onDeleteActivity are just forwarded to the active view, since the actual
 * create/delete overlays live in Dashboard, not here.
 */
export default function Inspector({
  stack,
  pushView,
  goBack,
  onAddItem,
  onRecordActivity,
  onDeleteCategory,
  onDeleteItem,
  onDeleteActivity,
}) {
  const current = stack[stack.length - 1];
  const View = viewMap[current.type];

  if (!View) return null;

  return (
    <View
      data={current.data}
      pushView={pushView}
      goBack={goBack}
      onAddItem={onAddItem}
      onRecordActivity={onRecordActivity}
      onDeleteCategory={onDeleteCategory}
      onDeleteItem={onDeleteItem}
      onDeleteActivity={onDeleteActivity}
    />
  );
}
