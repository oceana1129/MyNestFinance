import React from 'react'
import toast from "react-hot-toast"

const TestPage = () => {
  return (
    <div>
        Testing!
        <button onClick={() => toast.success("Yay!")} className='btn btn-primary '>Click me</button>
        <button onClick={() => toast.error("Bad!")} className='btn btn-error'>Don't click me</button>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
  )
}

export default TestPage
