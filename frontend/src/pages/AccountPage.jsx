import React from 'react'
import HomeBarNav from "../components/navigation/HomeNavBar"

const AccountPage = () => {
  return (
    <div>
      <HomeBarNav />
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Account Page</h1>
        <p>User Email: </p>
        <button className='btn btn-primary'>Logout</button>
      </div>
    </div>
  )
}

export default AccountPage
