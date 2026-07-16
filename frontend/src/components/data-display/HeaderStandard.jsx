import React from 'react'

const HeaderStandard = ({ textAlign = "left", header = "header", subheader, text = "paragraph" }) => {
  const align = textAlign === "center" ? "text-center" : "text-left";
  return (
    <div className={`flex gap-2 flex-col ${align}`}>
      {subheader && 
        <p 
            className='text-sm font-bold uppercase tracking-wide text-purple-400'>
                {subheader}
        </p>}
      <h2  className="text-4xl font-extrabold text-slate-800">{header}</h2>
      <p className="text-lg text-slate-500">{text}</p>
    </div>
  );
};

export default HeaderStandard
