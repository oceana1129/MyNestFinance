import React from 'react'
import SignUpForm from '../components/forms/SignUpForm'
import HomeNavBar from "../components/navigation/HomeNavBar"
import DefaultPageDisplay from '../components/data-display/DefaultPageDisplay'

const SignUpPage = () => {
  return (
    <DefaultPageDisplay
      nav={<HomeNavBar defaultPage={false} signupPage={true} />}
      content={<SignUpForm />}
    />
  )
}

export default SignUpPage
