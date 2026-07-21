import React from 'react'
import { useState } from 'react'
import CardStandard from '../data-display/CardStandard'
import HeaderStandard from '../data-display/HeaderStandard';
import InfoDisplay from '../data-display/InfoDisplay';
import Dropdown from '../actions/Dropdown';
import Toggle from '../actions/toggle';
import { PiggyBank, DecimalsArrowRight } from "lucide-react";

const SettingsCurrency = () => {
    const [currency, setCurrency] = useState("USD - $")
    const [showDecimals, setShowDecimals] = useState(true)
    // TODO: change user settings in backend
    // should have toast every time a change is made

  return (
    <CardStandard 
        size="small"
        content={
            <>
                <HeaderStandard 
                    header="Currency & numbers"
                    text="How amounts are displayed."
                />
                {/* settings */}
                <div>
                    <div className='p-4 border-y border-slate-300'>
                        <InfoDisplay 
                            icon ={PiggyBank}
                            header="Currency"
                            text="Used throughout your budget."
                            content={
                                <>
                                    <Dropdown
                                        value={currency}
                                        options={["USD - $", "EUR - €", "GBP - £", "JPY - ¥"]}
                                        onChange={setCurrency}
                                    />
                                </>
                            }
                        />
                    </div>
                    <div className='p-4'>
                        <InfoDisplay 
                            icon ={DecimalsArrowRight}
                            header="Show decimals"
                            text={`Amounts shown as 12${showDecimals ? ".00" : ""}`}
                            content={
                                <Toggle checked={showDecimals} onChange={setShowDecimals}/>
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
