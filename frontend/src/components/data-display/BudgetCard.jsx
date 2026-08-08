import { CircleAlert, Zap } from "lucide-react";
import { getColorTheme } from "../../utils/ColorThemeLight";
import { ICONS } from "../../utils/IconMap.js";
import { formatCurrency } from "../../utils/FormatCurrency.js";
import ProgressBar from "../data-input/ProgressBar";

const BudgetCard = ({
  item,
  color,
  active = false,
  onClick,
  userSettings,
  plannedAmount,
  isExpense = true,
}) => {
  const progress = Math.min((item.actual / item.planned) * 100, 100);
  const colors = getColorTheme(color);
  const overBudgetColors = isExpense ? getColorTheme("rose") : colors;

  const overBudget = item.difference < 0;
  const textColor = overBudget ? overBudgetColors.text : colors.text;
  const iconBg = overBudget
    ? overBudgetColors.bgExtraLight
    : colors.bgExtraLight;
  const iconStyling = `p-2 rounded-2xl border-2 border-white ${textColor}
         ${iconBg} shadow-sm`;
  const moneyStyling = `text-lg font-bold  ${overBudget ? overBudgetColors.text : textColor}`;
  const budgetCardStyling = `flex flex-col gap-4 rounded-2xl bg-[#FBF6F8] p-4 shadow-sm border-2  
        hover:bg-[#FFFBFD] ${
          active
            ? "bg-white border-purple-500 shadow-md"
            : "bg-[#FBF6F8] border-transparent hover:bg-[#FFFBFD]"
        } hover:cursor-pointer`;

  const Icon = ICONS[item.emoji] || ICONS["CircleHelp"];
  return (
    <div className={budgetCardStyling} onClick={onClick}>
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex items-start">
          <div className={iconStyling}>{item.emoji && <Icon size={32} />}</div>
        </div>
        {/* card information */}
        <div className="flex flex-col gap grow">
          <h3 className="text-lg font-bold text-slate-900">
            {item.name || "Item"}
          </h3>
          {overBudget && isExpense ? (
            <div className="flex items-center gap-2 text-md font-semibold text-pink-600">
              <CircleAlert size={18} />
              Over budget
            </div>
          ) : (
            <p className="text-md text-slate-700">{"on track"}</p>
          )}
        </div>
        {/* current and target amounts */}
        <div className="flex gap flex-col text-right ">
          {/* current amount */}
          <div className={moneyStyling}>
            {formatCurrency(item.actual, userSettings)}
          </div>
          {/* target amount */}
          <div className="text-md text-slate-500">
            of{" "}
            {item.planned
              ? formatCurrency(item.planned, userSettings)
              : formatCurrency(item.plannedAmount, userSettings)}
          </div>
        </div>
      </div>

      <ProgressBar
        value={progress}
        color={overBudget ? overBudgetColors.bgDark : colors.bgDark}
        trackColor={overBudget ? overBudgetColors.bgLight : colors.bgLight}
      />
    </div>
  );
};

export default BudgetCard;
