import React from 'react'
import LogInForm from '../components/forms/LogInForm'
import HomeNavBar from "../components/navigation/HomeNavBar"

const LogInPage = () => {
  return (
    <div>
        <HomeNavBar />
        <main className='p-4'>
          <LogInForm />
        </main>
        
    </div>
  )
}

export default LogInPage
