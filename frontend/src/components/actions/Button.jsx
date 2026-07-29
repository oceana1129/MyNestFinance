import React from "react";
import { Link } from "react-router";

const Button = ({
  iconLeft: IconLeft, // if there's an icon on the left
  iconRight: IconRight, // if there's an icon on the right
  text, // plain text
  children, // any children passed through
  variant = "primary", // primary, secondary, danger, ghost danger, danger, glass
  size = "medium", // dictates padding and font size (small, medium, large)
  fill = false, // if styling should take up full width of parent or not (flex-1 if true)
  onClick, // on click prop
  to, // internal route
  href, // exteneral URL
  disabled = false, // if button is disabled
  key,
  className = "", // additional classes
}) => {
  // variant styles
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    secondary:
      "bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-md",
    ghostDanger: "bg-transparent text-rose-700 hover:bg-rose-100",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    glass:
      "bg-white bg-opacity-70 text-slate-700 border-2 border-white shadow-md hover:bg-opacity-100",
    dotted:
      "bg-white border-2 border-dashed border-slate-300 text-slate-700 hover:bg-slate-50",
  };

  // padding and font size per size
  const sizeStyles = {
    small: "px-3 py-1.5 text-sm gap-1.5",
    medium: "px-4 py-2 text-base gap-2",
    large: "px-6 py-3 text-lg gap-2.5",
  };

  // icon pixel size per button size
  const iconSizes = {
    small: 14,
    medium: 18,
    large: 22,
  };

  const baseStyle = `inline-flex items-center justify-center rounded-lg font-semibold transition-colors ${
    fill ? "flex-1 w-full" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const iconSize = iconSizes[size];

  const content = (
    <>
      {IconLeft && <IconLeft size={iconSize} />}
      {text || children}
      {IconRight && <IconRight size={iconSize} />}
    </>
  );

  // internal navigation
  if (to) {
    return (
      <Link to={to} className={baseStyle} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  // external link or anchor
  if (href) {
    return (
      <a href={href} className={baseStyle} aria-disabled={disabled}>
        {content}
      </a>
    );
  }

  // button with js handler
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      key={key}
      className={baseStyle}
    >
      {content}
    </button>
  );
};

export default Button;
