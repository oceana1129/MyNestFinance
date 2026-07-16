import React from 'react'
import { Link } from "react-router"
import { useState } from "react"
import { useNavigate } from 'react-router'
import { UserAuth} from "../../context/AuthContext.jsx"

import InputText from '../data-input/InputText.jsx'

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { createUser } = UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setError("")
    try {
      console.log("Email:", email)
    console.log("Password:", password)
      await createUser(email, password)
      navigate("/account")
    } catch (error) {
      setError(error.message)
      console.error({message: "Sign up handle submit error", error})
    }
  }

  return (
    <div className='flex flex-col gap-8 bg-seconday max-w-[700px] mx-auto'>
      <div>
        <h1 className='text-center text-3xl font-bold'>Create your nest</h1>
        <p className='text-center'>Start budgeting for free! No card required.</p>
      </div>
      
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        <fieldset className='flex gap-4 flex-col'>
          <InputText onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"email"} type={"email"}/>
          <InputText onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"password"} type={"password"}/>
        </fieldset>
        
        <button className='btn btn-primary'>
            Sign Up
        </button>
      </form>
      <p className='text-center'>Already have an account?<Link to="/login" className='underline'>Log In.</Link></p> 
    </div>
  )
}

export default SignUpForm
