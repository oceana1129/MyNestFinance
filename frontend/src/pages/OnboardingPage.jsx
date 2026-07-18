import React from 'react'
import NavBar from '../components/navigation/NavBar.jsx';
import DefaultPageDisplay from '../components/data-display/DefaultPageDisplay.jsx';
import ProgressBar from '../components/data-input/ProgressBar.jsx';

const OnboardingPage = () => {
  const [steps, setSteps] = useState(2)
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <DefaultPageDisplay 
    />
  )
}

export default OnboardingPage
