import React from 'react'

const Toggle = ({checked, onChange}) => {
  return (
    <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-12 h-7 rounded-full transition-colors relative ${
            checked ? "bg-emerald-500" : "bg-gray-200"
        }`}>
            <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
            }`}
      />
    </button>
  )
}

export default Toggle
