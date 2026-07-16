import React from "react";
import { Check } from "lucide-react";

const Checkbox = ({ checked, onChange, variant = "square" }) => {
  const shape = variant === "circle" ? "rounded-full" : "rounded-md";

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 flex items-center justify-center border-2 transition-colors ${shape} ${
        checked
          ? "bg-purple-500 border-purple-500"
          : "bg-white border-gray-300"
      }`}
    >
      <Check size={18} className="text-white" strokeWidth={3} />
    </button>
  );
};

export default Checkbox;

