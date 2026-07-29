import { CircleAlert, Zap } from "lucide-react";
import { getColorTheme } from "../../utils/ColorThemeLight";
import ProgressBar from "../data-input/ProgressBar";

const BudgetCard = ({
  icon: Icon = Zap,
  title = "Expense",
  subtitle = "on track",
  currentAmount = "0",
  targetAmount = "0",
  overBudget = false,
  income = false,
  color = "green",
  active = false,
}) => {
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  const colors = getColorTheme(color);
  const overBudgetColors = getColorTheme("rose");

  const textColor = overBudget ? overBudgetColors.text : colors.text;
  const iconBg = overBudget
    ? overBudgetColors.bgExtraLight
    : colors.bgExtraLight;
  const iconStyling = `p-2 rounded-2xl border-2 border-white ${textColor}
         ${iconBg} shadow-sm`;
  const moneyStyling = `text-lg font-bold  ${overBudget ? overBudgetColors.text : textColor}`;
  const budgetCardStyling = `flex flex-col gap-4 rounded-2xl bg-[#FBF6F8] p-4 shadow-sm border-2  
        hover:bg-[#FFFBFD] ${active ? "bg-white border-purple-500" : "bg-"}  hover:cursor-pointer`;

  return (
    <div className={budgetCardStyling}>
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex items-start">
          <div className={iconStyling}>{Icon && <Icon size={32} />}</div>
        </div>
        {/* card information */}
        <div className="flex flex-col gap grow">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {overBudget ? (
            <div className="flex items-center gap-2 text-md font-semibold text-pink-600">
              <CircleAlert size={18} />
              Over budget
            </div>
          ) : (
            <p className="text-md text-slate-700">{subtitle}</p>
          )}
        </div>
        {/* current and target amounts */}
        <div className="flex gap flex-col text-right ">
          {/* current amount */}
          <div className={moneyStyling}>${currentAmount}</div>
          {/* target amount */}
          <div className="text-md text-slate-500">of ${targetAmount}</div>
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
