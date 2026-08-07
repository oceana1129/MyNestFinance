import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext.jsx";
import { getCurrentUser } from "../../endpoint/UserApi.jsx";
import { getUserBudgets } from "../../endpoint/BudgetApi.jsx";
import {
  getCategoryByBudget,
  createCategory,
} from "../../endpoint/CategoryApi.jsx";
import {
  getMonthlyDashboardSummary,
  getMonthlyActivity,
  getCategoryBreakdown,
} from "../../endpoint/DashboardApi.jsx";
import { createItem } from "../../endpoint/ItemApi.jsx";
import { CircleAlert, Zap } from "lucide-react";
import { ICONS } from "../../utils/IconMap.js";
import HeaderStandard from "../data-display/HeaderStandard";
import MonthDisplay from "../data-display/MonthDisplay";
import BudgetCardAdd from "../data-display/BudgetCardAdd.jsx";
import CategoryDisplay from "../data-display/CategoryDisplay.jsx";
import GlassDisplay from "../data-display/GlassDisplay.jsx";
import CreateCategory from "../forms/CreateCategory.jsx";
import CreateItem from "../forms/CreateItem.jsx";
import CreateActivity from "../forms/CreateActivity.jsx";

import BudgetMetricCard from "../data-display/BudgetMetricCard.jsx";
import MonthOverview from "../inspector/MonthOverview.jsx";
import Button from "../actions/Button.jsx";

// ("ahead" | "behind" | "on-target") reaction colors
const REACTION_COLOR = {
  ahead: "green",
  behind: "red",
  "on-target": "blue",
};

function formatCurrency(amount) {
  return (amount ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const Dashboard = () => {
  const { user } = UserAuth(); // the current user
  const [displayName, setDisplayName] = useState("Friend"); // the user display name
  const [budgets, setBudgets] = useState([]); // the user's historical budgets

  const [currentBudget, setCurrentBudget] = useState(null); // the user's currently displayed budget
  const [currentCategories, setCurrentCategories] = useState([]); // the user's currently displayed categories
  const [currentCategory, setCurrentCategory] = useState([]); // the user's currently selected category
  const [currentItem, setCurrentItem] = useState([]); // the user's currently selected item
  const [currentActivity, setCurrentActivity] = useState([]); // the user's currently selected activity

  const [dashboardMetrics, setDashboardMetrics] = useState(null); // the user's current month metrics
  const [monthlyActivity, setMonthlyActivity] = useState(null); // the user's most recent activity for the month

  const [loading, setLoading] = useState(true); // if the user information is loading
  const [secondaryLoading, setSecondaryLoading] = useState(true); // if the current budget's details are loading
  const [secondaryError, setSecondaryError] = useState(false); // if loading the current budget's details failed

  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showCreateActivity, setShowCreateActivity] = useState(false);

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
    console.log("current budget", currentBudget);
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
        // console.log(categories);
      } catch (error) {
        console.error(error);
      } finally {
        setSecondaryLoading(false);
      }
    }

    loadBudgetDetails();
  }, [currentBudget]);

  const hasBudget = Boolean(currentBudget);

  // creat a category under the current budget
  // createCategory(categoryData)
  // pull up 'create category' component
  // monthlyBudget,
  //     displayOrder,
  //     name,
  //     emoji,
  //     color,
  //     categoryType,
  async function handleCreateCategory(categoryData) {
    try {
      let created = await createCategory(categoryData);
      created = created.savedCategory;

      setCurrentCategories((prev) =>
        [...prev, created].sort((a, b) => a.displayOrder - b.displayOrder),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateItem(itemData) {
    try {
      let created = await createItem(itemData);
      created = created.savedItem;
      console.log("handlecreateitem()");
      console.log(created);

      setCurrentCategories((prev) =>
        prev.map((category) => {
          if (category._id !== created.budgetCategory) {
            return category;
          }

          return {
            ...category,
            items: [...category.items, created].sort(
              (a, b) => a.displayOrder - b.displayOrder,
            ),
            itemCount: category.itemCount + 1,
          };
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateActivity(activityData) {
    console.log(activityData);
  }
  // console.log(monthlyActivity);

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
                subtext={formatCurrency(dashboardMetrics.actualIncome)}
              />
              <GlassDisplay
                color="slate"
                text="spent"
                subtext={formatCurrency(dashboardMetrics.actualExpenses)}
              />
              <GlassDisplay
                color="blue"
                text="saved"
                subtext={formatCurrency(dashboardMetrics.actualRemaining)}
              />
            </div>

            <GlassDisplay
              subtext=""
              text="Every dollar tracked is a small win. Keep going!"
            />

            {/* map out categories the user has */}
            {currentCategories?.map((category) => (
              <CategoryDisplay
                onClick={() => {
                  console.log("current budget", currentBudget._id);
                  console.log("Selected category", category);
                  setCurrentCategory(category);
                  console.log("Selected category", category);
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
            month={currentBudget.month}
            year={currentBudget.year}
          />
        )}
      </main>
      {/* SIDEBAR STYLING */}
      <aside className="sticky top-0 self-start h-screen min-w-[200px] ">
        <div
          className="flex h-full flex-col gap-8 border-2 border-white
               bg-white/70 px-8 py-10 text-slate-700"
        >
          <MonthOverview
            dashboardMetrics={dashboardMetrics ? dashboardMetrics : null}
            monthlyActivity={monthlyActivity ? monthlyActivity : null}
          />
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
