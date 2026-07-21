import React from 'react'
import AppPageDisplay from '../components/data-display/AppPageDisplay.jsx';
import NavBar from '../components/navigation/NavBar.jsx';

const InsightsPage = () => {
  return (
    <AppPageDisplay 
      nav={<NavBar activePage='insights'/>}
      contentPrimary={
        <div>
          insights
        </div>
      }/>
  )
}

export default InsightsPage
