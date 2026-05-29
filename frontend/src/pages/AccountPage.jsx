import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import HomeBarNav from "../components/navigation/HomeNavBar"

const AccountPage = () => {
const {user, logout} = UserAuth();

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logout()
    navigate("/")
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <div>
      <HomeBarNav />
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Account Page</h1>
        <p>User Email: {user && user.email}</p>
        <button onClick={handleLogout} className='btn btn-primary'>Log Out</button>
      </div>
    </div>
  )
}

export default AccountPage
