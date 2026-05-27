import React from 'react'
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx"
import TestPage from "./pages/TestPage.jsx"

const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    </div>
  )
}

export default App
