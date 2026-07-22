import React from 'react'
import { getColorTheme } from '../../utils/ColorThemeLight';

// the category callout at the top of each "setting up categories"
const Blurb = ({ icon: Icon, title, text, color = "purple" }) => {
    const theme = getColorTheme(color);
    const textColor = getColorTheme("slate")

    return (
        <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${theme.bg} ${theme.border}`}>
            {Icon && (
                <div className={`${theme.iconText}`}>
                    <Icon size={32} />
                </div>
            )}
            <div>
                <p className={`font-bold ${theme.text}`}>{title}</p>
                {text && <p className={`text-sm ${textColor.subtext}`}>{text}</p>}
            </div>
        </div>
    );
};

export default Blurb;
