import React, { useState, useEffect } from 'react'
import CardStandard from '../data-display/CardStandard'
import HeaderStandard from '../data-display/HeaderStandard';
import InfoDisplay from '../data-display/InfoDisplay';
import Dropdown from '../actions/Dropdown';
import Toggle from '../actions/toggle';
import { PiggyBank, DecimalsArrowRight } from "lucide-react";
import { UserAuth } from '../../context/AuthContext';
import toast from "react-hot-toast"

// dropdown labels
// backend stores the currency
const CURRENCY_OPTIONS = {
    "USD - $": "$",
    "EUR - €": "€",
    "GBP - £": "£",
    "JPY - ¥": "¥",
};

// find the symbol in options
function labelForSymbol(symbol) {
    const match = Object.entries(CURRENCY_OPTIONS).find(([, sym]) => sym === symbol);
    return match ? match[0] : "USD - $";
}

const SettingsCurrency = () => {
    const { profile, updateSettings } = UserAuth();

    // load from user profile first and set as the use state
    // console.log(profile)
    const [currency, setCurrency] = useState("USD - $");
    const [showDecimals, setShowDecimals] = useState(true);

    // sync local state with user settings
    useEffect(() => {
        if (profile?.settings) {
            setCurrency(labelForSymbol(profile.settings.currencyPreference));
            setShowDecimals(profile.settings.showDecimals);
        }
    }, [profile]);

    const handleCurrencyChange = async (label) => {
        const previous = currency;
        setCurrency(label); 

        try {
            await updateSettings({ currencyPreference: CURRENCY_OPTIONS[label] });
            toast.success("Currency updated");
        } catch (error) {
            console.error("Failed to update currency:", error);
            setCurrency(previous); // revert on failure
            toast.error("Couldn't update currency");
        }
    };

    const handleDecimalsChange = async (checked) => {
        const previous = showDecimals;
        setShowDecimals(checked);

        try {
            await updateSettings({ showDecimals: checked });
            toast.success("Settings updated");
        } catch (error) {
            console.error("Failed to update decimals setting:", error);
            setShowDecimals(previous); // revert on failure
            toast.error("Couldn't update settings");
        }
    };

    return (
        <CardStandard
            size="small"
            content={
                <>
                    <HeaderStandard
                        header="Currency & numbers"
                        text="How amounts are displayed."
                    />
                    <div>
                        <div className='p-4 border-y border-slate-300'>
                            <InfoDisplay
                                icon={PiggyBank}
                                header="Currency"
                                text="Used throughout your budget."
                                content={
                                    <Dropdown
                                        value={currency}
                                        options={Object.keys(CURRENCY_OPTIONS)}
                                        onChange={handleCurrencyChange}
                                    />
                                }
                            />
                        </div>
                        <div className='p-4'>
                            <InfoDisplay
                                icon={DecimalsArrowRight}
                                header="Show decimals"
                                text={`Amounts shown as 12${showDecimals ? ".00" : ""}`}
                                content={
                                    <Toggle checked={showDecimals} onChange={handleDecimalsChange} />
                                }
                            />
                        </div>
                    </div>
                </>
            }
        />
    )
}

export default SettingsCurrency
