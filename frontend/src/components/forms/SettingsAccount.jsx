import React from 'react'
import { useState } from 'react'

import CardStandard from '../data-display/CardStandard'
import HeaderStandard from '../data-display/HeaderStandard';
import InfoDisplay from '../data-display/InfoDisplay';
import Button from '../actions/Button';
import { Trash } from "lucide-react";

const SettingsAccount = () => {
    // TODO: change user settings in backend

    function handleDelete() {
        // will pop up an 'are you sure' component
        // the component will provide the delete account functionality
        console.log('clicked delete')
        
    }

  return (
    <CardStandard 
        size="small"
        content={
            <>
                <HeaderStandard 
                    header="Account Management"
                    text="Manage your account information."
                />
                {/* settings */}
                <div className='p-4 border-t border-slate-300'>
                    <InfoDisplay 
                        icon ={Trash}
                        header="Delete account"
                        text="Permanently remove your account and all data."
                        content={
                            <Button 
                                variant="danger" 
                                text="Delete"
                                onClick={handleDelete}
                            />
                        }
                    />
                </div>
                
            </>
        }
    />
  )
}

export default SettingsAccount
