import React from "react";
import { useState } from "react";
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
import MonthOverview from "../components/data-display/MonthOverview.jsx";

const TestPage = () => {
  return (
    <AppPageDisplay
      nav={<NavBar />}
      contentPrimary={<Dashboard />}
      contentSecondary={<MonthOverview />}
    />
  );
};

export default TestPage;
