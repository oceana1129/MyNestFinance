import React from 'react'
import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import TestPage from "./pages/TestPage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import PlanPage from './pages/PlanPage.jsx'
import InsightsPage from "./pages/InsightsPage.jsx"
import ExportPage from './pages/ExportPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'

import ProtectedRoute from './components/protected/ProtectedRoute.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


const App = () => {
  return (
    <div data-theme="nord">
      <AuthContextProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/account" element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
              } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
              } />
            <Route path="/plan" element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
              } />
            <Route path="/insights" element={
              <ProtectedRoute>
                <InsightsPage />
              </ProtectedRoute>
              } />
            <Route path="/export" element={
              <ProtectedRoute>
                <ExportPage />
              </ProtectedRoute>
              } />
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
              } />
        </Routes>
      </AuthContextProvider>
        
    </div>
  )
}

export default App
