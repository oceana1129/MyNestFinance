import React from 'react'
import AppPageDisplay from '../components/data-display/AppPageDisplay.jsx';
import NavBar from '../components/navigation/NavBar.jsx';

const ExportPage = () => {
  return (
    <AppPageDisplay 
      nav={<NavBar activePage='export'/>}
      contentPrimary={
        <div>
          export
        </div>
      }/>
  )
}

export default ExportPage
