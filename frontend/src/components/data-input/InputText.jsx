import React, { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";

const InputText = ({
  onChange,
  disabled = false,
  inputStyle = "default",
  inputType = "text",
  inputValue,
  placeholderText,
  labelText,
  labelIcon: LabelIcon,
  leftIcon: LeftIcon,
  warningInfo,
}) => {
  const id = inputType;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = inputType === "password";

  // if password field, flip between "password" and "text" based on the toggle
  const actualType = isPassword ? (showPassword ? "text" : "password") : inputType;

  const styleMap = {
    default: isFocused
      ? "border-purple-500 bg-white text-slate-800"
      : "border-slate-300 bg-white text-slate-800",
    error: "border-rose-500 bg-rose-50 text-slate-800",
    success: "border-emerald-600 bg-white text-slate-800",
  };

  const iconColorMap = {
    default: "text-slate-400",
    error: "text-rose-500",
    success: "text-emerald-600",
  };

  const boxStyle = disabled
    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
    : styleMap[inputStyle];

  const iconColor = disabled ? "text-gray-400" : iconColorMap[inputStyle];

  return (
    <div className="flex flex-col gap-2">
      {/* input label */}
      {labelText && (
        <label
          htmlFor={id}
          className="flex items-center gap-4 font-bold text-slate-700"
        >
          {LabelIcon && <LabelIcon size={16} className="text-slate-500" />}
          {labelText}
        </label>
      )}

      {/* actual input holder */}
      <div
        className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition-colors ${boxStyle}`}
      >
        {/* if left icon, add it */}
        {LeftIcon && <LeftIcon size={18} className={iconColor} />}
        {/* create the input, input stretches whole width*/}
        <input
          id={id}
          className="flex-1 bg-transparent outline-none placeholder:text-slate-400"
          placeholder={placeholderText}
          value={inputValue}
          name={inputType}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type={actualType}
          disabled={disabled}
        />
        {/* if password input, add way to toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {/* change show password icon */}
            {showPassword ? (
              <Eye size={18} className={iconColor} />
            ) : (
              <EyeOff size={18} className={iconColor} />
            )}
          </button>
        )}
      </div>

      {/* input warning */}
      {warningInfo && <div className='flex gap-4'>
        <Info size={16} className={iconColor} />
        {warningInfo}
      </div>}
    </div>
  );
};

export default InputText;
