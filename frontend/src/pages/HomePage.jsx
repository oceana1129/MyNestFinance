import React from 'react'
import { Link } from "react-router"
import NavBar from "../components/navigation/HomeNavBar.jsx"


const HomePage = () => {
  return (
    <div>
      <NavBar defaultPage={true} signupPage={false} loginPage={false}/>
      <main className='min-h-screen'>
        {/* FIRST SECTION */}
        <section className='flex flex-col p-4 gap-4'>
          <h6 className='pill'>Budgets for neurodivergent minds</h6>
          <h1 className='text-8xl font-bold text-sky-900 font-sans tracking-tighter text-center'>Budgeting that feels <br />like home.</h1>
          <p className='text-center'>MyNest is a calm, flexible budgeting tool built for real life. It’s for days when your brain doesn't want to open a spreadsheet.</p>
          <div>
            <Link to={"/signup"} className='text-2xl text-sky-100 btn btn-primary'>
              get started now
            </Link>
            
            <button className='text-2xl text-sky-100 btn btn-secondary'>see how it works</button>
          </div>
          
        </section>

        {/* SECOND SECTION */}
        <section>
          <div>
            <h6 className='pill'>What's Inside</h6>
            <h2>Everything you need.</h2>
            <p>We cut out the noise so you can focus on what matters: understanding your money without feeling any of the overwhelm.</p>
          </div>
          <div>
            <div>
              <div>icon</div>
              <h4>Custom categories</h4>
              <p>Create income, expense, and debt categories that actually match your life and needs.</p>
            </div>

            <div>
              <div>icon</div>
              <h4>Plan vs actual</h4>
              <p>Set a planned budget each month, then track what you actually spent. See the gap at a glance without digging through rows.</p>
            </div>

            <div>
              <div>icon</div>
              <h4>Recurring plan</h4>
              <p>Mark subscriptions, rent, or bills as recurring so they show up automatically every month. No copy pasting required.</p>
            </div>
          </div>

        </section>

        {/* THIRD SECTION */}
        <section>
          <div>
            <h6 className='pill'>Built for real people</h6>
            <h2>Built for neurodivergent minds in mind.</h2>
            <p>MyNest was designed from the ground up to represent the needs of those who are under served. Everyone deserves a budgeting experience that doesn’t punish them for how their brain works.</p>
          </div>
        </section>

        {/* FOURTH SECTION */}
        <section>
          <div>
            <h2>Your nest is waiting.</h2>
            <p>Start building a budget that works with your brain, not against it. Free to use, no pressure, no spreadsheets.</p>
          </div>
          <Link to={"/signup"} className='text-2xl text-sky-100 btn btn-primary'>
              Create your free account
            </Link>
        </section>
      </main>
    </div>
  )
}

export default HomePage
