import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext.jsx";
import { getCurrentUser } from "../../endpoint/UserApi.jsx";
import { createBudget, getUserBudgets } from "../../endpoint/BudgetApi.jsx";
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
  const [currentActivity, setCurrentActivity] = useState(null); // which item CreateActivity should attach to

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

  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showEditActivity, setShowEditActivity] = useState(false);

  // inspector navigation stack
  const [stack, setStack] = useState([{ type: "month", data: {} }]);

  function pushView(type, data) {
    // populate activities
    if (type === "item" && !data.activities) {
      data = {
        ...data,
        activities: (monthlyActivity ?? []).filter(
          (a) => idOf(a.budgetItem) === idOf(data._id),
        ),
      };
    }

    setStack((prev) => [...prev, { type, data }]);
  }

  function goBack() {
    setStack((prev) => (prev.length === 1 ? prev : prev.slice(0, -1)));
  }

  // patch stack frame matches
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

  // useEffect(() => {
  //   console.log("current thing", currentActivity);
  // }, [currentCategories]);

  // normalize id fields
  function idOf(value) {
    if (value == null) return value;
    if (typeof value === "object") return String(value._id ?? value);
    return String(value);
  }

  // refetch dashboard metrics
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

      // keep category view in sync
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

  // refetch item information
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

  async function handleCreateBudget() {
    try {
      let createdBudget = await createBudget({
        month: month.month,
        year: month.year,
      });

      createdBudget = createdBudget.savedBudget;

      const [income, expense] = await Promise.all([
        createCategory({
          monthlyBudget: createdBudget._id,
          displayOrder: 0,
          name: "Income",
          emoji: "DollarSign",
          color: "green",
          categoryType: "income",
        }),
        createCategory({
          monthlyBudget: createdBudget._id,
          displayOrder: 0,
          name: "Housing",
          emoji: "House",
          color: "blue",
          categoryType: "expense",
        }),
        createCategory({
          monthlyBudget: createdBudget._id,
          displayOrder: 1,
          name: "Expenses",
          emoji: "Wallet",
          color: "rose",
          categoryType: "expense",
        }),
      ]);

      const categories = [income.savedCategory, expense.savedCategory];

      // update state
      setBudgets((prev) => [...prev, createdBudget]);
      setCurrentBudget(createdBudget);
      setCurrentCategories(categories);
      setMonthlyActivity([]);
      setDashboardMetrics({
        plannedIncome: 0,
        actualIncome: 0,
        plannedExpenses: 0,
        actualExpenses: 0,
      });

      // reset inspector to the new month
      setStack([
        {
          type: "month",
          data: {
            title: "Your month",
            subtitle: "A peek at how things are going.",
            planned: 0,
            actual: 0,
            categories,
            recentActivity: [],
          },
        },
      ]);
    } catch (error) {
      console.error("Failed to create budget:", error);
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
      created = created.savedItem;

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
    setCurrentItem(item);
    setShowCreateActivity(true);
  }

  // edit category
  async function handleEditCategory(updates) {
    try {
      let updated = await updateCategory(updates._id, updates);
      updated = updated.updatedCategory;

      setCurrentCategories((prev) =>
        prev
          .map((c) => (c._id === updated._id ? { ...c, ...updated } : c))
          .sort((a, b) => a.displayOrder - b.displayOrder),
      );
      updateStack("category", updated._id, () => updated);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  }

  // edit item
  async function handleEditItem(updates) {
    try {
      let updated = await updateItem(updates._id, updates);
      updated = updated.updatedItem;
      setCurrentCategories((prev) =>
        prev.map((category) => {
          if (
            !(category.items ?? []).some(
              (item) => idOf(item._id) === idOf(updates._id),
            )
          ) {
            return category;
          }
          return {
            ...category,
            items: category.items
              .map((item) =>
                idOf(item._id) === idOf(updates._id)
                  ? { ...item, ...updated }
                  : item,
              )
              .sort((a, b) => a.displayOrder - b.displayOrder),
          };
        }),
      );

      updateStack("item", updated._id, () => updated);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  // edit activity
  async function handleEditActivity(updates) {
    try {
      let updated = await updateActivityLog(updates._id, updates);
      updated = updated.updatedActivityLog;

      // Update monthly activity list
      setMonthlyActivity((prev) =>
        (prev ?? []).map((activity) =>
          idOf(activity._id) === idOf(updated._id)
            ? { ...activity, ...updated }
            : activity,
        ),
      );

      // Update activity under its item
      setCurrentCategories((prev) =>
        prev.map((category) => ({
          ...category,
          items: (category.items ?? []).map((item) => {
            if (
              !(item.activities ?? []).some(
                (activity) => idOf(activity._id) === idOf(updated._id),
              )
            ) {
              return item;
            }

            return {
              ...item,
              activities: item.activities.map((activity) =>
                idOf(activity._id) === idOf(updated._id)
                  ? { ...activity, ...updated }
                  : activity,
              ),
            };
          }),
        })),
      );

      updateStack("activity", updated._id, () => updated);
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  }

  // edit
  function onEditCategory(category) {
    setCurrentCategory(category);
    setShowEditCategory(true);
  }

  function onEditItem(item) {
    const parentCategory = currentCategories.find((c) =>
      (c.items ?? []).some((i) => idOf(i._id) === idOf(item._id)),
    );

    setCurrentCategory(parentCategory ?? null);
    setCurrentItem(item);
    setShowEditItem(true);
  }

  function onEditActivity(activity) {
    let parentItem = null;

    for (const category of currentCategories) {
      const found = (category.items ?? []).find((item) =>
        (item.activities ?? []).some((a) => idOf(a._id) === idOf(activity._id)),
      );
      if (found) {
        parentItem = found;
        break;
      }
    }

    if (parentItem) setCurrentItem(parentItem);
    setCurrentActivity(activity);
    setShowEditActivity(true);
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
        const reorderedItems = (category?.items ?? [])
          .filter((i) => i._id !== item._id)
          .map((i, index) => ({ ...i, displayOrder: index }));

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
              subtext="Set up a budget to start tracking"
              color="slate"
              align="text-center"
              flexGrow={false}
            />
            <BudgetCardAdd
              text="create a budget "
              color="green"
              onClick={handleCreateBudget}
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
              flexGrow={false}
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
        {/* edit category component */}
        {currentBudget && (
          <CreateCategory
            edit={true}
            editData={currentCategory}
            open={showEditCategory}
            onClose={() => setShowEditCategory(false)}
            onCreate={handleEditCategory}
            monthlyBudgetId={currentBudget?._id}
            displayOrder={currentCategories.length}
          />
        )}
        {currentBudget && (
          <CreateItem
            edit={true}
            editData={currentItem}
            open={showEditItem}
            onClose={() => setShowEditItem(false)}
            onCreate={handleEditItem}
            monthlyBudgetId={currentBudget?._id}
            budgetCategoryId={currentCategory?._id}
            categoryType={currentCategory?.categoryType}
          />
        )}
        {currentBudget && (
          <CreateActivity
            edit={true}
            editData={currentActivity}
            open={showEditActivity}
            onClose={() => setShowEditActivity(false)}
            onCreate={handleEditActivity}
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
              onClickActivity={(activity) => {
                pushView("activity", activity);
                setCurrentActivity(activity);
              }}
              userSettings={userSettings}
              onAddItem={handleAddItem}
              onAddActivity={handleAddActivity}
              onEditCategory={onEditCategory}
              onEditItem={onEditItem}
              onEditActivity={onEditActivity}
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
