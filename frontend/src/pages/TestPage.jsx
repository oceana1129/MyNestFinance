import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Check, Mail, Lock, User, Banknote } from "lucide-react";
import HomeNavBar from "../components/navigation/HomeNavBar.jsx";
import NavBar from "../components/navigation/NavBar.jsx";
import CheckmarkTOS from "../components/actions/CheckmarkTOS.jsx";
import HeaderStandard from "../components/data-display/HeaderStandard.jsx";
import InputText from "../components/data-input/InputText.jsx";
import CardStandard from "../components/data-display/CardStandard.jsx";
import Button from "../components/actions/Button.jsx";
import MultiSelect from "../components/actions/MultiSelect.jsx";
import ProgressBar from "../components/data-input/ProgressBar.jsx";
import Blurb from "../components/data-display/Blurb.jsx";
import AppPageDisplay from "../components/data-display/AppPageDisplay.jsx";
import Dashboard from "../components/forms/Dashboard.jsx";
// import MonthOverview from "../components/inspector/MonthOverview.jsx";
// import CategoryOverview from "../components/inspector/CategoryOverview.jsx";
import BudgetMetricCard from "../components/data-display/BudgetMetricCard.jsx";
import TopItems from "../components/inspector/sections/TopItems.jsx";
import Insights from "../components/inspector/sections/Insights.jsx";

import month from "./MockInspectorData.js";
import { Home, Zap, Car, Lightbulb } from "lucide-react";

import { getDisplayName } from "../endpoint/UserApi.jsx";
import { UserAuth } from "../context/AuthContext.jsx";

const TestPage = () => {
  const { user } = UserAuth();
  const [displayName, setDisplayName] = useState("");

  async function openItem(itemId) {
    const item = await getItemSummary(itemId);
    push("item", item);
  }

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

  return <p>Test</p>;
};

export default TestPage;
