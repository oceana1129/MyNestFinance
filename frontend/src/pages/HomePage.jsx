import React from 'react'
import { Link } from "react-router"
import NavBar from "../components/navigation/HomeNavBar.jsx"


const HomePage = () => {
  return (
    <div>
      <NavBar />
      <main className='min-h-screen'>
        <section className='flex flex-col p-4 gap-4'>
          <h1 className='text-8xl font-bold text-sky-900 font-sans tracking-tighter'>Your cozy place where you can budget</h1>
          <Link to={"/signup"} className="btn btn-primary">
            <span className='text-2xl text-sky-100'>get started now</span>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default HomePage
