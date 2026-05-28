import React from 'react'

const InputText = ({placeholder, type}) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} className="input input-primary min-w-full" />
    </div>
  )
}

export default InputText
