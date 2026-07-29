import { getColorTheme } from "../../utils/ColorThemeLight";

const BudgetCardAdd = ({ text = "add expense +", color = "green" }) => {
  const colors = getColorTheme(color);
  const style = `flex p-4 rounded-2xl bg-white border-dashed border-2 ${colors.border} hover:${colors.bgExtraLight}  hover:cursor-pointer`;
  const textStyle = `grow text-center font-bold ${colors.text}`;
  return (
    <div className={style}>
      <p4 className={textStyle}>{text}</p4>
    </div>
  );
};

export default BudgetCardAdd;
