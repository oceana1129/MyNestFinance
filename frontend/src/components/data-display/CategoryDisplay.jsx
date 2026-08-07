import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { getColorTheme } from "../../utils/ColorThemeLight";
import { formatCurrency } from "../../utils/FormatCurrency";
import BudgetCard from "./BudgetCard";
import BudgetCardAdd from "./BudgetCardAdd";

const CategoryDisplay = ({
  title = "Category Name",
  subtitle = "income",
  currentAmount = 0,
  targetAmount = 0,
  color = "green",
  items = [],
  currentItem,
  setCurrentItem,
  onClick,
  onClickItem,
  onClickButton,
  userSettings
}) => {
  const [hidden, setHidden] = useState(true);

  const colors = getColorTheme(color);

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm"
      >
      {/* Header */}
      <div
        className="flex justify-between hover:cursor-pointer"
        onClick={() => setHidden((prev) => !prev)}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-slate-900 hover:text-slate-500 transition" onClick={onClick}>{title}</h2>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide
                ${colors.bgExtraLight} ${colors.text}`}
            >
              {subtitle}
            </span>

            <span className="text-lg text-slate-600">
              • {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="text-right">
            <div
              className={`text-3xl font-bold ${subtitle === "income" ? colors.text : "text-slate-900"}`}
            >
              {formatCurrency(currentAmount, userSettings)}
            </div>

            <div className="text-xl text-slate-500">of {formatCurrency(targetAmount, userSettings)}</div>
          </div>

          <button className="mt-2 rounded-lg p-1 transition hover:bg-slate-100">
            {hidden ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </button>
        </div>
      </div>

      {/* Cards */}
      {!hidden && (
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <BudgetCard
              key={item._id}
              item={item}
              color={color}
              active={currentItem?._id === item._id}
              onClick={() => onClickItem(item)}
              userSettings={userSettings}
            />
          ))}

          <BudgetCardAdd
            text={`add ${subtitle} +`}
            color={color}
            onClick={onClickButton}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryDisplay;
