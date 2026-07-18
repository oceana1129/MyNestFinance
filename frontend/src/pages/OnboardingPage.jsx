import React from 'react'
import { useState } from 'react';
import HomeNavBar from '../components/navigation/HomeNavBar.jsx';
import DefaultPageDisplay from '../components/data-display/DefaultPageDisplay.jsx';
import ProgressBar from '../components/data-input/ProgressBar.jsx';
import CardStandard from '../components/data-display/CardStandard.jsx';
import HeaderStandard from '../components/data-display/HeaderStandard.jsx';
import InputText from '../components/data-input/InputText.jsx';
import Button from '../components/actions/Button.jsx';
import { UserRound } from 'lucide-react';

const OnboardingPage = () => {
  const [steps, setSteps] = useState(2)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentProgress, setCurrentProgress] = useState((currentStep / steps).toFixed(2) * 100)
  const [name, setName] = useState("")

  console.log(currentProgress)

  const handleSetName = async (e) => {
    e.preventDefault();

    try {
        // TODO: persist name to backend — see note below
        setCurrentStep((prev) => prev + 1);
    } catch (error) {
        console.error("Failed to save name:", error);
    }
};

  return (
    <DefaultPageDisplay 
      nav={<HomeNavBar defaultPage={false} onboarding={true} />}
      progress={<ProgressBar 
        value={currentProgress}
        rounded={false}
        color='from-blue-300' 
        colorTwo='to-blue-700' 
        trackColor='bg-blue-100'
        height='h-2'
        />}
      content={
        <CardStandard 
        size='small'
        content={
          <>
            <HeaderStandard 
              header="Hi there! What's your name?"
              subheader="Personalization"
              text="We'll use it to make things feel a little more personal."
            />
            <InputText 
              onChange={(e) => setName(e.target.value)}
              inputType='text'
              inputValue={name}
              labelText={"Your name"}
              labelIcon={UserRound}
              placeholderText={"Lucy"}
            />
            <Button onClick={handleSetName} text={"continue"}/>
          </>
          

        }
        />
      }
    />
  )
}

export default OnboardingPage
