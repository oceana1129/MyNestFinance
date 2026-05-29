import React from 'react'

const InputText = ({onChange, value, placeholder, type}) => {
  return (
    <div>
      <input 
        className="input input-primary min-w-full"
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        type={type} 
         />
    </div>
  )
}

export default InputText
