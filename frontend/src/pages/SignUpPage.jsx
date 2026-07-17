import React from 'react'
import SignUpForm from '../components/forms/SignUpForm'
import HomeNavBar from "../components/navigation/HomeNavBar"

const SignUpPage = () => {
  return (
    <div>
        <HomeNavBar defaultPage={false} signupPage={true} />
        <main className='p-4'>
          <SignUpForm />
        </main>
        
    </div>
  )
}

export default SignUpPage
