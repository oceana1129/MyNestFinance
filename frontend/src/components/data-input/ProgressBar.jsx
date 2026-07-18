const ProgressBar = ({
    value = 0,
    rounded = true,
    color = "bg-purple-500",
    colorTwo = "to-purple-700",           // e.g. "to-emerald-500" if you want a gradient
    trackColor = "bg-purple-100",
    height = "h-3",
}) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const shape = rounded ? "rounded-full" : "rounded-none";

    // if colorTwo is given, build a two-color gradient; otherwise flat fill
    const mainColor = colorTwo
        ? `bg-gradient-to-r from-purple-500 ${colorTwo}`
        : color;

    return (
        <div
            className={`w-full ${height} ${trackColor} ${shape} overflow-hidden`}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className={`h-full ${mainColor} ${shape} transition-all duration-300`}
                style={{ width: `${clampedValue}%` }}
            />
        </div>
    );
};

export default ProgressBar;