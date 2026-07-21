import React from 'react'
import { useState } from 'react'

import CardStandard from '../data-display/CardStandard'
import HeaderStandard from '../data-display/HeaderStandard';
import InfoDisplay from '../data-display/InfoDisplay';
import Button from '../actions/Button';
import { Trash } from "lucide-react";

import { UserAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router';

const SettingsAccount = () => {
    const {deleteAccount} = UserAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        console.log('SettingsAccount.jsx: handleDelete()')
        const confirmed = window.confirm(
            "This will permanently delete your account and all data. This can't be undone."
        );
        if (!confirmed) return;

        try {
            // delete backend user
            await deleteAccount();
            navigate("/");
        } catch (error) {
            console.error(error.message);
            alert("problem deleting your account")
        }
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
