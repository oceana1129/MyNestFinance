import React from "react";

// displays icon, header, text, extra content (dropdown, toggle, button)
const InfoDisplay = ({
  variant = "default", // default, item, detail
  icon: Icon, // icon
  header, // header/title
  subtitle, // subtitle
  text,
  color = "purple",
  content, // dropdown, toggle, or button
}) => {
  const bgColor = `bg-${color}-100`;
  const iconColor = `text-${color}-700`;
  const headerTextColor =
    variant === "detail" ? "text-slate-500" : "text-slate-700";
  const iconRounded = variant === "default" ? "rounded-md" : "rounded-full";
  const direction =
    variant === "default" || variant === "item"
      ? "flex-col"
      : "flex-col-reverse";

  return (
    <div className="flex gap-4 items-center">
      {/* Icon */}
      {Icon && (
        <div>
          <div className={`p-2 ${bgColor} ${iconRounded}`}>
            <Icon size={20} className={iconColor} />
          </div>
        </div>
      )}
      {/* Main info text */}
      <div className={`flex ${direction} grow`}>
        <h4 className={`text-lg font-bold ${headerTextColor}`}>{header}</h4>
        <p className={`text-slate-500 text-sm`}>{text}</p>
      </div>
      {content && <div>{content}</div>}
      {subtitle && (
        <h6 className="text-xl font-bold text-slate-700">{subtitle}</h6>
      )}
    </div>
  );
};

export default InfoDisplay;
