import React from 'react'
import AppPageDisplay from '../components/data-display/AppPageDisplay.jsx';
import NavBar from '../components/navigation/NavBar.jsx';
import {CATEGORY_EXPENSES, CATEGORY_DEBT, CATEGORY_INCOME, CATEGORY_HOUSING} from "../onboardingSteps.js"

const PlanPage = () => {
  return (
    <AppPageDisplay 
      nav={<NavBar activePage='plan'/>}
      contentPrimary={
        <div>
          plan
        </div>
      }/>
  )
}

export default PlanPage
