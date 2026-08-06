import React from "react";
import AppPageDisplay from "../components/data-display/AppPageDisplay.jsx";
import NavBar from "../components/navigation/NavBar.jsx";
import Button from "../components/actions/Button.jsx";
import HeaderStandard from "../components/data-display/HeaderStandard.jsx";
import Dashboard from "../components/forms/Dashboard.jsx";
import BudgetMetricCard from "../components/data-display/BudgetMetricCard.jsx";

import {
  CATEGORY_EXPENSES,
  CATEGORY_DEBT,
  CATEGORY_INCOME,
  CATEGORY_HOUSING,
} from "../onboardingSteps.js";

const PlanPage = () => {
  return (
    <AppPageDisplay
      nav={<NavBar activePage="plan" />}
      contentPrimary={<Dashboard />}
      removePrimaryStyle={true}
    />
  );
};

export default PlanPage;
