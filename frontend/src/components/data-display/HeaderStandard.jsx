import React from "react";
import { getColorTheme } from "../../utils/ColorThemeLight";

const HeaderStandard = ({
  textAlign = "left",
  header = "header",
  subheader,
  subheader2,
  text = "paragraph",
  size = "text-4xl",
  icon: Icon,
  className,
  color,
}) => {
  const align = textAlign === "center" ? "text-center" : "text-left";
  const colors = getColorTheme(color)
  return (
    <div className="flex gap-8">
      {Icon && (
        <div>
          <div className={`p-4 ${colors.bgExtraLight} rounded-2xl border-4 border-white shadow-lg`}>
            <Icon size={32} className={colors.text} />
          </div>
        </div>
        
      )}
      <div className={`flex gap-2 flex-col ${align} ${className}`}>
      {subheader && (
        <p className={`font-bold uppercase tracking-wide ${colors.subtext}`}>
          {subheader}
        </p>
      )}
      <h2 className={`${size} font-extrabold text-slate-800`}>{header}</h2>
      {subheader2 && (
        <p className="font-bold uppercase tracking-wide ${}">
          {subheader2}
        </p>
      )}
      <p className="text-lg text-slate-500">{text}</p>
    </div>
    </div>
    
  );
};

export default HeaderStandard;
