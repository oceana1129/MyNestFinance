import React from 'react'

const CardStandard = ({content, size = "medium"}) => {
  const paddingY = {
    small: 10,
    medium: 12,
    large: 16,
  };
  const sizing = "py-" + paddingY[size]

  return (
    <div className={`flex flex-col gap-6 px-10 ${sizing} rounded-2xl bg-white shadow-xl`}>
      {content}
    </div>
  )
}

export default CardStandard
