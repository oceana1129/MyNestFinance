import { getColorTheme } from "../../utils/ColorThemeLight";

const BudgetCardAdd = ({
  text = "add expense +",
  color = "green",
  onClick,
}) => {
  const colors = getColorTheme(color);
  const style = `flex p-4 rounded-2xl bg-white border-dashed border-2 ${colors.border} ${colors.hoverBgExtraLight} hover:cursor-pointer transition-colors duration-150`;
  const textStyle = `grow text-center font-bold ${colors.text}`;
  return (
    <button className={style} onClick={onClick}>
      <h4 className={textStyle}>{text}</h4>
    </button>
  );
};

export default BudgetCardAdd;
