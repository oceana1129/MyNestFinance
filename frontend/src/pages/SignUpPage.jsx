import React from 'react'
import SignUpForm from '../components/SignUpForm'
import HomeNavBar from "../components/navigation/HomeNavBar"

const SignUpPage = () => {
  return (
    <div>
        <HomeNavBar />
        <main className='p-4'>
          <SignUpForm />
        </main>
        
    </div>
  )
}

export default SignUpPage
