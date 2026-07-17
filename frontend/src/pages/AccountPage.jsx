import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import HomeBarNav from "../components/navigation/HomeNavBar"
import CardStandard from '../components/data-display/CardStandard'
import HeaderStandard from '../components/data-display/HeaderStandard'
import SettingsCurrency from '../components/forms/SettingsCurrency';

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
      <HeaderStandard 
        textAlign='left'
        header="Account"
        text="Your account information"
      />
      
      
      <div className='p-4 flex flex-col gap-4'>
        <p>User Email: {user && user.email}</p>
        <button onClick={handleLogout} className='btn btn-primary'>Log Out</button>
      </div>
    </div>
  )
}

export default AccountPage
