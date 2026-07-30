import React from 'react'
import { getColorTheme } from '../../utils/ColorThemeLight'

const GlassDisplay = ({text="Income", subtext="$1,720.00", color="green"}) => {
    const colors = getColorTheme(color)
    const style = `${colors.text} text-xl font-bold`;

  return (
    <div className='flex flex-col gap-4 p-4 rounded-2xl bg-white bg-opacity-70 text-slate-700 border-2 border-white shadow-md '>
      <p6 className="text-lg text-slate-500">{text}</p6>
      <p5 className={style}>{subtext}</p5>
    </div>
  )
}

export default GlassDisplay
