import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext.jsx";
import { getCurrentUser } from "../../endpoint/UserApi.jsx";
import { getUserBudgets } from "../../endpoint/BudgetApi.jsx";
import {
  getCategoryByBudget,
  createCategory,
  updateCategory, 
  deleteCategory, 
  reorderCategories
} from "../../endpoint/CategoryApi.jsx";
import { 
  createItem,
  getItem,
  updateItem,
  deleteItem,
  reorderItems
} from "../../endpoint/ItemApi.jsx";
import {
  createActivityLog,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog
} from "../../endpoint/ActivityApi.jsx"
import {
  getMonthlyDashboardSummary,
  getMonthlyActivity,
  getCategoryBreakdown,
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
        setUserSettings(currentUser.settings ?? {currencyPreference: "$", showDecimals: true})
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

  // create a category under the current budget
  async function handleCreateCategory(categoryData) {
    try {
      let created = await createCategory(categoryData);
      created = created.savedCategory;

      setCurrentCategories((prev) =>
        [...prev, created].sort((a, b) => a.displayOrder - b.displayOrder),
      );
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
          if (category._id !== created.budgetCategory) {
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
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  }

  async function handleCreateActivity(activityData) {
    try {
      console.log(activityData);

      // TODO:
      // const created = await createActivity(activityData);
      // Merge into currentCategories and monthlyActivity.
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
  async function handleEditCategory(category) {
    try {
      console.log("TODO: edit category", category);

      // const updated = await updateCategory(...);
      // Update currentCategories state.
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  }

  // edit item
  async function handleEditItem(item) {
    try {
      console.log("TODO: edit item", item);

      // const updated = await updateItem(...);
      // Update currentCategories state.
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  // edit activity
  async function handleEditActivity(activity) {
    try {
      console.log("TODO: edit activity", activity);

      // const updated = await updateActivity(...);
      // Update currentCategories/monthlyActivity state.
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  }

  // delete category
  async function handleDeleteCategory(category) {
  try {
    console.log(currentCategories)
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
        }))
      );

      setCurrentCategories(reorderedCategories);

      if (currentCategory?._id === category._id) {
        setCurrentCategory(null);
      }
    }
    
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }
  // delete item
  async function handleDeleteItem(item) {
    try {
      console.log("TODO: delete item", item);

      const deletedItem = await deleteItem(item._id);
      console.log(deletedItem)

    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  // delete activity
  async function handleDeleteActivity(activity) {
    try {
      console.log("TODO: delete activity", activity);

      // await deleteActivity(activity._id);
      // Remove from currentCategories/monthlyActivity.
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
                subtext={formatCurrency(dashboardMetrics.actualIncome, userSettings)}
              />
              <GlassDisplay
                color="slate"
                text="spent"
                subtext={formatCurrency(dashboardMetrics.actualExpenses, userSettings)}
              />
              <GlassDisplay
                color="blue"
                text="saved"
                subtext={formatCurrency(dashboardMetrics.actualRemaining, userSettings)}
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
                key={category._id}
                title={category.name}
                subtitle={category.categoryType}
                currentAmount={category.actual}
                targetAmount={category.planned}
                color={category.color}
                items={category.items}
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
              onDeleteCategory={handleDeleteCategory}
              onDeleteItem={handleDeleteItem}
              onDeleteActivity={handleDeleteActivity}
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
