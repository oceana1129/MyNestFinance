import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext.jsx";
import { getCurrentUser } from "../../endpoint/UserApi.jsx";
import { getUserBudgets } from "../../endpoint/BudgetApi.jsx";
import {
  getCategoryByBudget,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from "../../endpoint/CategoryApi.jsx";
import {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  reorderItems,
} from "../../endpoint/ItemApi.jsx";
import {
  createActivityLog,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
} from "../../endpoint/ActivityApi.jsx";
import {
  getMonthlyDashboardSummary,
  getMonthlyActivity,
  getCategoryBreakdown,
  getItemSummary,
} from "../../endpoint/DashboardApi.jsx";

import { CircleAlert, User, Zap } from "lucide-react";
import { ICONS } from "../../utils/IconMap.js";
import HeaderStandard from "../data-display/HeaderStandard";
import MonthDisplay from "../data-display/MonthDisplay";
import BudgetCardAdd from "../data-display/BudgetCardAdd.jsx";
import CategoryDisplay from "../data-display/CategoryDisplay.jsx";
import GlassDisplay from "../data-display/GlassDisplay.jsx";
import CreateCategory from "../forms/CreateCategory.jsx";
import CreateItem from "../forms/CreateItem.jsx";
import CreateActivity from "../forms/CreateActivity.jsx";
import { formatCurrency } from "../../utils/FormatCurrency.js";

import BudgetMetricCard from "../data-display/BudgetMetricCard.jsx";
import Button from "../actions/Button.jsx";

import Inspector from "../inspector/Inspector.jsx";
import ConfirmDialog from "../actions/ConfirmDialog.jsx";

// ("ahead" | "behind" | "on-target") reaction colors
const REACTION_COLOR = {
  ahead: "green",
  behind: "red",
  "on-target": "blue",
};

const Dashboard = () => {
  const { user } = UserAuth(); // the current user
  const [displayName, setDisplayName] = useState("Friend"); // the user display name
  const [userSettings, setUserSettings] = useState();
  const [budgets, setBudgets] = useState([]); // the user's historical budgets

  const [currentBudget, setCurrentBudget] = useState(null); // the user's currently displayed budget
  const [currentCategories, setCurrentCategories] = useState([]); // the user's currently displayed categories
  const [currentCategory, setCurrentCategory] = useState(null); // which category CreateItem should attach to
  const [currentItem, setCurrentItem] = useState(null); // which item CreateActivity should attach to

  const [dashboardMetrics, setDashboardMetrics] = useState(null); // the user's current month metrics
  const [monthlyActivity, setMonthlyActivity] = useState(null); // the user's most recent activity for the month

  const [loading, setLoading] = useState(true); // if the user information is loading
  const [secondaryLoading, setSecondaryLoading] = useState(true); // if the current budget's details are loading
  const [secondaryError, setSecondaryError] = useState(false); // if loading the current budget's details failed

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [objectToDelete, setObjectToDelete] = useState(null);
  const [deleteCallback, setDeleteCallback] = useState(null);

  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showCreateActivity, setShowCreateActivity] = useState(false);

  // Inspector's navigation stack, owned here so both the main-panel category
  // cards and the inspector's own internal clicks (category -> item ->
  // activity) push onto the same stack.
  const [stack, setStack] = useState([{ type: "month", data: {} }]);

  function pushView(type, data) {
    setStack((prev) => [...prev, { type, data }]);
  }

  function goBack() {
    setStack((prev) => (prev.length === 1 ? prev : prev.slice(0, -1)));
  }

  // default to the current month
  const today = new Date();
  const [month, setMonth] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  // load the user all their budgets
  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;

      try {
        setLoading(true);

        const currentUser = await getCurrentUser();
        setDisplayName(currentUser.displayName ?? "Friend");
        setUserSettings(
          currentUser.settings ?? {
            currencyPreference: "$",
            showDecimals: true,
          },
        );
        const budgets = await getUserBudgets(currentUser._id);
        setBudgets(budgets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [user]);

  // find the budget matching the selected month/year
  useEffect(() => {
    if (!budgets.length) {
      setCurrentBudget(null);
      return;
    }

    const budget = budgets.find(
      (budget) => budget.month === month.month && budget.year === month.year,
    );
    setCurrentBudget(budget ?? null);
  }, [budgets, month]);

  // load categories and dashboard metrics for whichever budget is selected
  useEffect(() => {
    async function loadBudgetDetails() {
      if (!currentBudget) {
        return;
      }

      try {
        setSecondaryLoading(true);
        setSecondaryError(false);

        const [categories, metrics, monthlyActivity] = await Promise.all([
          getCategoryBreakdown(currentBudget._id),
          getMonthlyDashboardSummary(currentBudget._id),
          getMonthlyActivity(currentBudget._id),
        ]);

        setCurrentCategories(categories);
        setDashboardMetrics(metrics);
        setMonthlyActivity(monthlyActivity);
      } catch (error) {
        console.error(error);
      } finally {
        setSecondaryLoading(false);
      }
    }

    loadBudgetDetails();
  }, [currentBudget]);

  const hasBudget = Boolean(currentBudget);

  // reset the inspector back to the month view whenever the budget changes
  useEffect(() => {
    setStack((prev) => [prev[0]]);
  }, [currentBudget?._id]);

  // keep the inspector's base month frame in sync with fresh dashboard
  // data, without disturbing how deep the user has navigated
  useEffect(() => {
    setStack((prev) => {
      const next = [...prev];
      next[0] = {
        type: "month",
        data: {
          title: "Your month",
          subtitle: "A peek at how things are going.",
          actual: dashboardMetrics?.actualExpenses,
          planned: dashboardMetrics?.plannedExpenses,
          categories: currentCategories,
          recentActivity: monthlyActivity,
        },
      };
      return next;
    });
  }, [dashboardMetrics, currentCategories, monthlyActivity]);

  // Normalizes an ID field that might be a plain string/ObjectId in one
  // response and a populated object ({_id, name, ...}) in another — e.g.
  // items loaded from getCategoryBreakdown vs. items just returned from
  // createItem(). Strict `===` between those two shapes silently fails,
  // which is why "pre-existing" items weren't matching category._id while
  // freshly-created ones (plain string ids) worked fine.
  function idOf(value) {
    if (value == null) return value;
    if (typeof value === "object") return String(value._id ?? value);
    return String(value);
  }

  function updateStack(type, id, updater) {
    setStack((prev) =>
      prev.map((view) => {
        if (view.type !== type || idOf(view.data?._id) !== idOf(id)) {
          return view;
        }

        return {
          ...view,
          data: updater(view.data),
        };
      }),
    );
  }

  // Re-fetch the real dashboardMetrics + category breakdown and merge them
  // in. Local optimistic patches (below) only ever touch arrays/counts —
  // planned/actual/reaction/percentage on categories, and the
  // earned/spent/saved totals, are computed server-side and were never
  // being recalculated here, which is why they only updated on a full
  // refresh. `items` arrays are preserved from existing state since
  // getCategoryBreakdown doesn't return them.
  async function refreshMonthMetrics() {
    if (!currentBudget) return;

    try {
      const [categories, metrics] = await Promise.all([
        getCategoryBreakdown(currentBudget._id),
        getMonthlyDashboardSummary(currentBudget._id),
      ]);

      setDashboardMetrics(metrics);

      setCurrentCategories((prev) =>
        categories.map((fresh) => {
          const existing = prev.find((c) => c._id === fresh._id);
          return { ...fresh, items: existing?.items ?? fresh.items ?? [] };
        }),
      );

      // keep an open CategoryView in sync too, not just the month frame
      // (the month frame already updates itself via the effect watching
      // dashboardMetrics/currentCategories)
      setStack((prevStack) =>
        prevStack.map((view) => {
          if (view.type !== "category") return view;

          const fresh = categories.find((c) => c._id === view.data?._id);
          if (!fresh) return view;

          return { ...view, data: { ...fresh, items: view.data.items } };
        }),
      );
    } catch (error) {
      console.error("Failed to refresh dashboard metrics:", error);
    }
  }

  // Re-fetch one item's real planned/actual/reaction/percentage (e.g. after
  // an activity log is added/edited/deleted against it) and merge it into
  // both currentCategories and an open ItemView, without needing to
  // re-fetch every category to get one item's numbers right.
  async function refreshItemMetrics(itemId, categoryId) {
    try {
      const fresh = await getItemSummary(itemId);

      setCurrentCategories((prev) =>
        prev.map((category) => {
          if (idOf(category._id) !== idOf(categoryId)) return category;

          return {
            ...category,
            items: (category.items ?? []).map((item) =>
              idOf(item._id) === idOf(itemId) ? { ...item, ...fresh } : item,
            ),
          };
        }),
      );

      updateStack("item", itemId, (data) => ({ ...data, ...fresh }));
    } catch (error) {
      console.error("Failed to refresh item metrics:", error);
    }
  }

  // create a category under the current budget
  async function handleCreateCategory(categoryData) {
    try {
      let created = await createCategory(categoryData);
      created = created.savedCategory;

      setCurrentCategories((prev) =>
        [...prev, created].sort((a, b) => a.displayOrder - b.displayOrder),
      );

      updateStack("month", undefined, (data) => ({
        ...data,
        categories: [...(data.categories ?? []), created].sort(
          (a, b) => a.displayOrder - b.displayOrder,
        ),
      }));

      await refreshMonthMetrics();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  }

  async function handleCreateItem(itemData) {
    try {
      let created = await createItem(itemData);
      console.log(created);
      created = created.savedItem;
      console.log(created);

      setCurrentCategories((prev) =>
        prev.map((category) => {
          if (idOf(category._id) !== idOf(created.budgetCategory)) {
            return category;
          }

          return {
            ...category,
            items: [...(category.items ?? []), created].sort(
              (a, b) => a.displayOrder - b.displayOrder,
            ),
            itemCount: category.itemCount + 1,
          };
        }),
      );

      updateStack("category", created.budgetCategory, (data) => ({
        ...data,
        items: [...(data.items ?? []), created].sort(
          (a, b) => a.displayOrder - b.displayOrder,
        ),
        itemCount: data.itemCount + 1,
      }));

      await refreshMonthMetrics();
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  }

  async function handleCreateActivity(activityData) {
    try {
      console.log("activityData", activityData);
      let created = await createActivityLog(activityData);
      created = created.savedActivityLog;

      // add most recent
      setMonthlyActivity((prev) => [created, ...(prev ?? [])]);

      // add to items recent activity
      setCurrentCategories((prev) =>
        prev.map((category) => ({
          ...category,
          items: (category.items ?? []).map((item) =>
            idOf(item._id) === idOf(created.budgetItem)
              ? { ...item, activities: [created, ...(item.activities ?? [])] }
              : item,
          ),
        })),
      );
      // update month view
      updateStack("month", undefined, (data) => ({
        ...data,
        recentActivity: [created, ...(data.recentActivity ?? [])],
      }));

      // update item view
      updateStack("item", created.budgetItem, (data) => ({
        ...data,
        activities: [created, ...(data.activities ?? [])],
      }));

      const parentCategory = currentCategories.find((category) =>
        (category.items ?? []).some(
          (item) => idOf(item._id) === idOf(created.budgetItem),
        ),
      );

      await Promise.all([
        refreshMonthMetrics(),
        refreshItemMetrics(created.budgetItem, parentCategory?._id),
      ]);
    } catch (error) {
      console.error("Failed to create activity:", error);
    }
  }

  // add an item to a category
  function handleAddItem(category) {
    setCurrentCategory(category);
    setShowCreateItem(true);
  }

  function handleAddActivity(item) {
    console.log("item", item);
    setCurrentItem(item);
    setShowCreateActivity(true);
  }

  // edit category
  async function handleEditCategory(categoryId, updates) {
    try {
      console.log("TODO: edit category");
      // let updated = await updateCategory(categoryId, updates);
      // updated = updated.savedCategory;

      // setCurrentCategories((prev) =>
      //   prev
      //     .map((c) => (c._id === categoryId ? { ...c, ...updated } : c))
      //     .sort((a, b) => a.displayOrder - b.displayOrder),
      // );
      // updateStack("category", updated._id, () => updated);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  }

  // edit item
  async function handleEditItem(itemId, updates) {
    try {
      console.log("TODO: edit item");
      // let updated = await updateItem(itemId, updates);
      // updated = updated.savedBudgetItem;
      // setCurrentCategories((prev) =>
      //   prev.map((category) => {
      //     if (!(category.items ?? []).some((item) => item._id === itemId)) {
      //       return category;
      //     }
      //     return {
      //       ...category,
      //       items: category.items
      //         .map((item) =>
      //           item._id === itemId ? { ...item, ...updated } : item,
      //         )
      //         .sort((a, b) => a.displayOrder - b.displayOrder),
      //     };
      //   }),
      // );

      // updateStack("item", updated._id, () => updated);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  // edit activity
  async function handleEditActivity(activity) {
    try {
      console.log("TODO: edit activity", activity);
      // let updated = await updateActivityLog(activityId, updates);
      // updated = updated.savedActivity; // ASSUMPTION, same wrapper convention

      // setMonthlyActivity((prev) =>
      //   (prev ?? []).map((activity) =>
      //     activity._id === activityId ? { ...activity, ...updated } : activity,
      //   ),
      // );

      // setCurrentCategories((prev) =>
      //   prev.map((category) => ({
      //     ...category,
      //     items: (category.items ?? []).map((item) => ({
      //       ...item,
      //       activities: (item.activities ?? []).map((activity) =>
      //         activity._id === activityId ? { ...activity, ...updated } : activity,
      //       ),
      //     })),
      //   })),
      // );

      // updateStack("item", updatedItem._id, () => updatedItem);
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  }

  function confirmDelete(object, callback) {
    setObjectToDelete(object);
    setDeleteCallback(() => callback);
    setShowDeleteDialog(true);
  }

  function removeFromStack(type, id) {
    setStack((prev) =>
      prev.filter(
        (view) => !(view.type === type && idOf(view.data?._id) === idOf(id)),
      ),
    );
  }

  // delete category
  async function handleDeleteCategory(category) {
    try {
      const deletedCategory = await deleteCategory(category._id);

      if (deletedCategory) {
        const reorderedCategories = currentCategories
          .filter((c) => c._id !== category._id)
          .map((c, index) => ({
            ...c,
            displayOrder: index,
          }));

        await reorderCategories(
          reorderedCategories.map((c) => ({
            id: c._id,
            displayOrder: c.displayOrder,
          })),
        );

        setCurrentCategories(reorderedCategories);

        if (currentCategory?._id === category._id) {
          setCurrentCategory(null);
        }
        setStack((prev) => [prev[0]]);
        removeFromStack("category", category._id);

        await refreshMonthMetrics();
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }
  // delete item
  async function handleDeleteItem(item) {
    try {
      const response = await deleteItem(item._id);
      const deletedItem = response.deletedItem;

      if (deletedItem) {
        const category = currentCategories.find(
          (c) => idOf(c._id) === idOf(deletedItem.budgetCategory),
        );
        console.log("category", category);
        const reorderedItems = (category?.items ?? [])
          .filter((i) => i._id !== item._id)
          .map((i, index) => ({ ...i, displayOrder: index }));

        console.log("reorderedItems", reorderedItems);
        await reorderItems(
          reorderedItems.map((i) => ({
            id: i._id,
            displayOrder: i.displayOrder,
          })),
        );

        setCurrentCategories((prev) =>
          prev.map((category) => {
            if (idOf(category._id) !== idOf(item.budgetCategory)) {
              return category;
            }

            const reorderedItems = category.items
              .filter((i) => i._id !== item._id)
              .map((i, index) => ({
                ...i,
                displayOrder: index,
              }));

            return {
              ...category,
              items: reorderedItems,
              itemCount: reorderedItems.length,
            };
          }),
        );

        if (currentItem?._id === item._id) {
          setCurrentItem(null);
        }
        // setStack((prev) => [prev[0]]);
        removeFromStack("item", item._id);

        updateStack("category", item.budgetCategory, (data) => {
          const filtered = (data.items ?? []).filter((i) => i._id !== item._id);

          return {
            ...data,
            items: filtered,
            itemCount: filtered.length,
          };
        });

        await refreshMonthMetrics();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  // delete activity
  async function handleDeleteActivity(activity) {
    try {
      const deletedActivity = await deleteActivityLog(activity._id);

      if (deletedActivity) {
        setMonthlyActivity((prev) =>
          (prev ?? []).filter((a) => a._id !== activity._id),
        );

        let parentCategoryId = null;

        setCurrentCategories((prev) =>
          prev.map((category) => {
            const hasActivity = (category.items ?? []).some((item) =>
              (item.activities ?? []).some((a) => a._id === activity._id),
            );

            if (hasActivity) parentCategoryId = category._id;

            return {
              ...category,
              items: (category.items ?? []).map((item) => ({
                ...item,
                activities: (item.activities ?? []).filter(
                  (a) => a._id !== activity._id,
                ),
              })),
            };
          }),
        );

        updateStack("month", undefined, (data) => ({
          ...data,
          recentActivity: (data.recentActivity ?? []).filter(
            (a) => a._id !== activity._id,
          ),
        }));

        updateStack("item", activity.budgetItem, (data) => ({
          ...data,
          activities: (data.activities ?? []).filter(
            (a) => a._id !== activity._id,
          ),
        }));

        removeFromStack("activity", activity._id);

        await Promise.all([
          refreshMonthMetrics(),
          refreshItemMetrics(activity.budgetItem, parentCategoryId),
        ]);
      }
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_minmax(240px,400px)]  gap-8 ">
      {/* DASHBOARD STYLING */}
      <main className="flex flex-col gap-8 px-16 py-10">
        <MonthDisplay value={month} onChange={setMonth} />

        <HeaderStandard
          header={`Hi ${displayName}, you're doing great.`}
          text={"Here's your nest this month"}
          textAlign="center"
          className={"font-serif"}
        />

        {loading ? (
          <GlassDisplay text="Loading your dashboard..." />
        ) : !hasBudget ? (
          // user has no budget available
          <>
            <GlassDisplay
              text=""
              subtext="Create a category to start tracking"
              color="slate"
              align="text-center"
              flexGrow={false}
            />
            <BudgetCardAdd
              text="add category + "
              color="green"
              onClick={() => setShowCreateCategory(true)}
            />
          </>
        ) : secondaryLoading ? (
          <div className="flex gap-4">
            <GlassDisplay text="Loading..." />
            <GlassDisplay color="slate" text="Loading..." />
            <GlassDisplay color="blue" text="Loading..." />
          </div>
        ) : secondaryError ? (
          <div className="flex items-center gap-2">
            <CircleAlert className="text-red-500" />
            <GlassDisplay
              text="Something went wrong loading this budget."
              subtext="Try refreshing the page"
            />
          </div>
        ) : (
          // user has a budget this month
          <>
            <div className="flex gap-4">
              <GlassDisplay
                text="earned"
                subtext={formatCurrency(
                  dashboardMetrics.actualIncome,
                  userSettings,
                )}
              />
              <GlassDisplay
                color="slate"
                text="spent"
                subtext={formatCurrency(
                  dashboardMetrics.actualExpenses,
                  userSettings,
                )}
              />
              <GlassDisplay
                color="blue"
                text="saved"
                subtext={formatCurrency(
                  dashboardMetrics.actualRemaining,
                  userSettings,
                )}
              />
            </div>

            <GlassDisplay
              subtext=""
              text="Every dollar tracked is a small win. Keep going!"
            />

            {/* map out categories the user has */}
            {currentCategories?.map((category) => (
              <CategoryDisplay
                // clicking category changes the view
                onClick={() => pushView("category", category)}
                onClickItem={(item) => {
                  pushView("item", item);
                  setCurrentItem(item);
                }}
                onClickButton={() => {
                  setCurrentCategory(category);
                  setShowCreateItem(true);
                }}
                key={category?._id}
                title={category?.name}
                subtitle={category?.categoryType}
                currentAmount={category?.actual}
                targetAmount={category?.planned}
                color={category?.color}
                items={category?.items}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                userSettings={userSettings}
              />
            ))}

            <BudgetCardAdd
              text="add category + "
              color="green"
              onClick={() => setShowCreateCategory(true)}
            />
          </>
        )}
        {/* create category component */}
        <CreateCategory
          open={showCreateCategory}
          onClose={() => setShowCreateCategory(false)}
          onCreate={handleCreateCategory}
          monthlyBudgetId={currentBudget?._id}
          displayOrder={currentCategories.length}
        />
        {currentBudget && (
          <CreateItem
            open={showCreateItem}
            onClose={() => setShowCreateItem(false)}
            onCreate={handleCreateItem}
            monthlyBudgetId={currentBudget?._id}
            budgetCategoryId={currentCategory?._id}
            categoryType={currentCategory?.categoryType}
          />
        )}
        {currentBudget && (
          <CreateActivity
            open={showCreateActivity}
            onClose={() => setShowCreateActivity(false)}
            onCreate={handleCreateActivity}
            budgetItemId={currentItem?._id}
            emoji={currentItem?.emoji}
            month={currentBudget.month}
            year={currentBudget.year}
          />
        )}
        {showDeleteDialog && (
          <ConfirmDialog
            open={showDeleteDialog}
            title="Delete Item"
            message={`Are you sure you want to delete "${objectToDelete?.name}"?`}
            confirmText="Delete"
            cancelText="Cancel"
            onClose={async (confirmed) => {
              setShowDeleteDialog(false);

              if (!confirmed) {
                setObjectToDelete(null);
                setDeleteCallback(null);
                return;
              }

              if (deleteCallback) {
                await deleteCallback();
              }

              setObjectToDelete(null);
              setDeleteCallback(null);
            }}
          />
        )}
      </main>
      {/* SIDEBAR STYLING */}
      <aside className="sticky top-0 self-start h-screen min-w-[200px] ">
        <div
          className="flex h-full flex-col gap-8 border-2 border-white
               bg-white/70 px-8 py-10 text-slate-700 overflow-auto"
        >
          {hasBudget ? (
            <Inspector
              stack={stack}
              pushView={pushView}
              goBack={goBack}
              userSettings={userSettings}
              onAddItem={handleAddItem}
              onAddActivity={handleAddActivity}
              onEditCategory={handleEditCategory}
              onEditItem={handleEditItem}
              onEditActivity={handleEditActivity}
              onDeleteCategory={(category) =>
                confirmDelete(category, () => handleDeleteCategory(category))
              }
              onDeleteItem={(item) =>
                confirmDelete(item, () => handleDeleteItem(item))
              }
              onDeleteActivity={(activity) =>
                confirmDelete(activity, () => handleDeleteActivity(activity))
              }
            />
          ) : (
            <GlassDisplay text="Select or create a budget to see details" />
          )}
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
