import React from 'react'
import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import TestPage from "./pages/TestPage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import AccountPage from './pages/AccountPage.jsx'

const App = () => {
  return (
    <div data-theme="nord">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/account" element={<AccountPage />} />
        </Routes>
    </div>
  )
}

export default App
