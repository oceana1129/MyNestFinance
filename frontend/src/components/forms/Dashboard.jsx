import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext.jsx";
import { getDisplayName } from "../../services/UserApi.jsx";
import { CircleAlert, Zap } from "lucide-react";
import HeaderStandard from "../data-display/HeaderStandard";
import MonthDisplay from "../data-display/MonthDisplay";
import BudgetCard from "../data-display/BudgetCard.jsx";
import BudgetCardAdd from "../data-display/BudgetCardAdd.jsx";
import CategoryDisplay from "../data-display/CategoryDisplay.jsx";
import GlassDisplay from "../data-display/GlassDisplay.jsx";

const Dashboard = () => {
  const { user } = UserAuth();
  const [displayName, setDisplayName] = useState("Friend");

  // find the users username
  useEffect(() => {
    async function loadDisplayName() {
      if (!user) {
        setDisplayName("Friend");
        return;
      }

      try {
        const name = await getDisplayName();
        setDisplayName(name ?? "Friend");
      } catch (error) {
        console.error(error);
        setDisplayName("Friend");
      }
    }

    loadDisplayName();
  }, [user]);

  // local storage
  const storageKey = user
    ? `dashboard-month-${user.uid}`
    : `dashboard-month-development`;

  const today = new Date();

  // set the current date
  const [month, setMonth] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load saved dashboard month", error);
    }

    return {
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <MonthDisplay value={month} onChange={setMonth} />
      <HeaderStandard
        header={`Hi ${displayName}, you're doing great.`}
        text={"Here's your nest this month"}
        textAlign="center"
        className={"font-serif"}
      />
      <div className="flex gap-4">
        <GlassDisplay />
        <GlassDisplay color="slate" />
        <GlassDisplay color="blue" />
      </div>
      <GlassDisplay
        subtext=""
        text="Every dollar tracked is a small win. Keep going!"
      />
      <CategoryDisplay
        title="Income"
        subtitle="income"
        color="green"
        currentAmount={1720}
        targetAmount={1900}
        items={[
          {
            id: 1,
            title: "Paycheck 1",
            subtitle: "on track",
            currentAmount: 1600,
            targetAmount: 1600,
            color: "green",
          },
          {
            id: 2,
            title: "Commissions",
            subtitle: "below target",
            currentAmount: 120,
            targetAmount: 300,
            color: "green",
          },
        ]}
      />
      <CategoryDisplay
        title="Income"
        subtitle="expense"
        color="purple"
        currentAmount={0}
        targetAmount={0}
      />
      <BudgetCardAdd text="add category + " />
    </div>
  );
};

export default Dashboard;
