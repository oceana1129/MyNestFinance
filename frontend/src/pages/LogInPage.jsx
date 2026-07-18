import React from 'react'
import LogInForm from '../components/forms/LogInForm'
import HomeNavBar from "../components/navigation/HomeNavBar"
import DefaultPageDisplay from '../components/data-display/DefaultPageDisplay'

const LogInPage = () => {
  return (
    <DefaultPageDisplay
      nav={<HomeNavBar defaultPage={false} loginPage={true} />}
      content={<LogInForm />}
    />
  )
}

export default LogInPage
