import React from "react";
import { getColorTheme } from "../../utils/ColorThemeLight";

const GlassDisplay = ({
  text = "Loading",
  subtext = "Loading",
  color = "slate",
  align = "",
}) => {
  const colors = getColorTheme(color);
  const style = `${colors.text} ${align} text-xl font-bold`;

  return (
    <div className="flex flex-col flex-grow gap-4 p-4 rounded-2xl bg-white bg-opacity-70 text-slate-700 border-2 border-white shadow-md ">
      {text !== "" && <h6 className="text-lg text-slate-500">{text}</h6>}
      {subtext !== "" && <h5 className={style}>{subtext}</h5>}
    </div>
  );
};

export default GlassDisplay;
