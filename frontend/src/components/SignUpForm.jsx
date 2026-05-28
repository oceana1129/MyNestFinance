import React from 'react'
import { Link } from "react-router"
import InputText from './data-input/InputText'
import BtnLoginEmail from './actions/buttons/BtnLoginEmail'
import BtnLoginGoogle from './actions/buttons/BtnLoginGoogle'

const SignUpForm = () => {
  return (
    <div className='flex flex-col gap-4 bg-seconday max-w-[700px] mx-auto'>
      <h1 className='text-center text-3xl font-bold'>Sign up for a free account</h1>
      <p className='text-center'>Already have an account? <Link to="/login" className='underline'>Log In</Link></p> 
      <form className='flex flex-col gap-4'>
        <InputText placeholder={"email"} type={"email"}/>
        <InputText placeholder={"password"} type={"password"}/>
        <button className='btn btn-primary'>
            Sign Up
        </button>
      </form>
      
      {/* <BtnLoginEmail />
      <BtnLoginGoogle /> */}
      
    </div>
  )
}

export default SignUpForm
