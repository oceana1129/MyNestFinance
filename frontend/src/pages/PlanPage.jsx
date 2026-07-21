import React from 'react'
import AppPageDisplay from '../components/data-display/AppPageDisplay.jsx';
import NavBar from '../components/navigation/NavBar.jsx';

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
