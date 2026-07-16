import React from 'react'
import HeaderStandard from './HeaderStandard'

const CardStandard = ({content, size = "medium"}) => {
  const py = {
    small: 10,
    medium: 12,
    large: 16,
  }
  return (
    <div className={`m-12 flex flex-col gap-6 px-10 py-12 rounded-2xl bg-white shadow-xl`}>
      {content}
    </div>
  )
}

export default CardStandard
