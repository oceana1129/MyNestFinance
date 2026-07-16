import Checkbox from "./Checkbox";

const MultiSelect = ({
    icon: Icon,
    title = "Multi select answer",
    subtitle,
    orientation = "horizontal",
    checked,
    onChange
}) => {
    const textColor = checked ? "text-purple-700" : "text-slate-600";
    const stateStyle = checked
        ? "border-purple-500 bg-purple-100 hover:bg-purple-100"
        : "border-slate-200";
    const orientationStyle = orientation === "horizontal" ? "flex-row" : "flex-col";

    return (
        <div
            className={`flex items-center gap-4 px-4 py-2 rounded-full border-2 transition
                cursor-pointer hover:bg-purple-50
                ${stateStyle} ${textColor} ${orientationStyle}`}
            onClick={() => onChange(!checked)}
        >
            {orientation === "horizontal" && (
                <>
                    <Checkbox variant="circle" checked={checked} onChange={onChange} />
                    {Icon && <Icon size={22} />}
                    <div>
                        <p className="font-bold text-lg">{title}</p>
                        {subtitle && <p className="text-md">{subtitle}</p>}
                    </div>
                </>
            )}

            {orientation === "vertical" && (
                <>
                    {Icon && <Icon size={30} />}
                    <p className="font-bold text-lg">{title}</p>
                    {subtitle && <p className="text-md">{subtitle}</p>}
                </>
            )}
        </div>
    );
};

export default MultiSelect;