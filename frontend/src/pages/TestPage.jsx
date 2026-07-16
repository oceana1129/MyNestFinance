import React from 'react'
import { useState } from "react"
import toast from "react-hot-toast"
import { Check, Mail, Lock, User, Banknote } from "lucide-react";
import NavBar from "../components/navigation/HomeNavBar.jsx"
import Toggle from '../components/actions/toggle.jsx'
import CheckmarkTOS from '../components/actions/CheckmarkTOS.jsx'
import HeaderStandard from '../components/data-display/HeaderStandard.jsx'
import InputText from '../components/data-input/InputText.jsx'
import CardStandard from '../components/data-display/CardStandard.jsx';
import Button from '../components/actions/Button.jsx';
import MultiSelect from '../components/actions/MultiSelect.jsx';

const TestPage = () => {
  const [checked, setChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [input, setInput] = useState("");
  const [multiSelect, setMultiSelect] = useState(false);

  return (
    <div className='max-h-screen'>
        Testing!
        <NavBar />
        <CardStandard 
          content={
            <>
              <HeaderStandard 
              header="Hi there! What's your name?"
              subheader="personalization"
              text="We'll use it to make things feel a little more personal."/>
            <MultiSelect 
              icon={Banknote}
              checked={multiSelect}
              onChange={setMultiSelect}
              title="Track my spending"
              />
            <InputText 
              labelText="Your Name"
              labelIcon={User}
              inputType="text"
              inputStyle="default"
              placeholderText="your@email.com"
              inputValue={input}
              onChange={(e) => {
                setInput(e.target.value);
              }} />
              <div className="flex gap-2">
                <Button variant="secondary" iconLeft={User}/>
                <Button text="Click me!" to="/login" fill={true}/>
              </div>
              
            </>
          }/>
        <Toggle checked={checked} onChange={setChecked}/>
        <CheckmarkTOS checked={checkboxChecked} onChange={setCheckboxChecked}/>
        

        <p>Input: {input}</p>
        <InputText
          labelText="Your Name"
          labelIcon={User}
          inputType="password"
          inputStyle="error"
          placeholderText="your@email.com"
          inputValue={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          warningInfo={
            <div>
              <p className=' text-sm text-rose-500'>Please enter a valid password.</p>
              <ul className="list-disc list-inside text-sm text-rose-500">
                <li>Must be at least 8 characters</li>
                <li>Include at least one number</li>
                <li>Include at least one symbol</li>
              </ul>
            </div>
            }
        />
        
    </div>
  )
}

export default TestPage
