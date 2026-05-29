import React from 'react'
import { Link } from "react-router"
import { useState } from "react"
import { useNavigate } from 'react-router'
import { UserAuth} from "../../context/AuthContext"

import InputText from '../data-input/InputText'

const LogInForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { signIn } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signIn(email, password)
      navigate("/account")
      
    } catch (error) {
      setError(error.message)
      console.error({message: "Log In handle submit error", error})
    }
  }

  return (
    <div className='flex flex-col gap-4 bg-seconday max-w-[700px] mx-auto'>
      <h1 className='text-center text-3xl font-bold'>Log in and start budgeting</h1>
      <p className='text-center'>Don't have an account? <Link to="/signup" className='underline'>Sign Up</Link></p> 
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <InputText onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"email"} type={"email"}/>
        <InputText onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"password"} type={"password"}/>
        <button className='btn btn-primary'>
            Log In
        </button>
      </form>
    </div>
  )
}

export default LogInForm
