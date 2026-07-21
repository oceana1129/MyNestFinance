import React from 'react'
import AppPageDisplay from '../components/data-display/AppPageDisplay.jsx';
import NavBar from '../components/navigation/NavBar.jsx';
import HeaderStandard from '../components/data-display/HeaderStandard.jsx'
import SettingsCurrency from '../components/forms/SettingsCurrency.jsx';
import SettingsNotifications from '../components/forms/SettingsNotifications.jsx';
import SettingsAccount from '../components/forms/SettingsAccount.jsx';

const SettingsPage = () => {
  return (
    <AppPageDisplay 
      nav={<NavBar activePage='settings'/>}
      contentPrimary={
          <div className='p-12 flex flex-col gap-12'>
          <HeaderStandard 
            header='Settings'
            text='Adjust how MyNest looks and works for you.'
          />
          <div className='flex flex-col gap-6'>
            <SettingsCurrency />
            <SettingsNotifications />
            <SettingsAccount />
          </div>
        </div>
      }
    />
  )
}

export default SettingsPage
