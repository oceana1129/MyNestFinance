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
    <div className='flex flex-col gap-4 bg-seconday max-w-[700px] mx-auto'>
      <h1 className='text-center text-3xl font-bold'>Sign up for a free account</h1>
      <p className='text-center'>Already have an account? <Link to="/login" className='underline'>Log In</Link></p> 
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <InputText onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"email"} type={"email"}/>
        <InputText onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"password"} type={"password"}/>
        <button className='btn btn-primary'>
            Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
