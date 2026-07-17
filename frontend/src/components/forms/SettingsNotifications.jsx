import React from 'react'
import { useState } from 'react'

import CardStandard from '../data-display/CardStandard'
import HeaderStandard from '../data-display/HeaderStandard';
import InfoDisplay from '../data-display/InfoDisplay';
import Toggle from '../actions/toggle';
import { Mail, Bell } from "lucide-react";

const SettingsNotifications = () => {
  const [emailNotification, setEmailNotification] = useState(true)
  const [inAppNotification, setInAppNotification] = useState(true)
    // TODO: change user settings in backend
    // should have toast every time a change is made

  return (
    <CardStandard 
        size="small"
        content={
            <>
                <HeaderStandard 
                    header="Notifications"
                    text="Choose how we can reach you."
                />
                {/* settings */}
                <div>
                    <div className='p-4 border-y border-slate-300'>
                        <InfoDisplay 
                            icon ={Mail}
                            header="Email notifications"
                            text="Reminders sent to your inbox."
                            content={
                                <Toggle checked={emailNotification} onChange={setEmailNotification}/>
                            }
                        />
                    </div>
                    <div className='p-4'>
                        <InfoDisplay 
                            icon ={Bell}
                            header="In-app notifications"
                            text={`Alerts inside MyNest`}
                            content={
                                <Toggle checked={inAppNotification} onChange={setInAppNotification}/>
                            }
                        />
                    </div>
                </div>
                
            </>
        }
    />
  )
}

export default SettingsNotifications
