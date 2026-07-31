import React from "react";

const HeaderStandard = ({
  textAlign = "left",
  header = "header",
  subheader,
  text = "paragraph",
  size = "text-4xl",
  className,
}) => {
  const align = textAlign === "center" ? "text-center" : "text-left";
  return (
    <div className={`flex gap-2 flex-col ${align} ${className}`}>
      {subheader && (
        <p className="font-bold uppercase tracking-wide text-purple-400">
          {subheader}
        </p>
      )}
      <h2 className={`${size} font-extrabold text-slate-800`}>{header}</h2>
      <p className="text-lg text-slate-500">{text}</p>
    </div>
  );
};

export default HeaderStandard;
