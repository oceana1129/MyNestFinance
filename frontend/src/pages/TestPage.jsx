import React from 'react'
import toast from "react-hot-toast"

const TestPage = () => {
  return (
    <div>
      Testing!
      <button onClick={() => toast.success("Yay!")}>Click me</button>

    </div>
  )
}

export default TestPage
