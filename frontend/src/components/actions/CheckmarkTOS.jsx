import React from 'react'
import Checkbox from './Checkbox'

const CheckmarkTOS = ({ checked, onChange}) => {
  return (
    <div className='flex gap-4 bg-purple-100 px-2 py-3'>
      <Checkbox checked={checked} onChange={onChange}/>
      <p>
        I agree to the terms and conditions. Your data is never sold.
      </p>
    </div>
  )
}

export default CheckmarkTOS
