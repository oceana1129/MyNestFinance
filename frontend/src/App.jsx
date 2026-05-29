import React from 'react'
import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import TestPage from "./pages/TestPage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
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
        </Routes>
      </AuthContextProvider>
        
    </div>
  )
}

export default App
