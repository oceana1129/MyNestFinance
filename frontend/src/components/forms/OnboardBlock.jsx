import React from 'react'
import MultiSelect from '../actions/MultiSelect';

// named layout presets
const layoutPresets = {
    list: { orientation: "horizontal", containerClass: "flex flex-col gap-3" },
    grid: { orientation: "vertical", containerClass: "grid grid-cols-2 gap-3" },
    "list-grid": { orientation: "horizontal", containerClass: "grid grid-cols-2 gap-3" },
};

// renders one question
// single-select or multi-select, laid out per `block.layout`
const OnboardBlock = ({ block, value, onChange }) => {
    const isMulti = block.selectMode === "multi";
    const { orientation, containerClass } = layoutPresets[block.layout] || layoutPresets.list;

    const isSelected = (optionValue) =>
        isMulti ? (value || []).includes(optionValue) : value === optionValue;

    const toggleOption = (optionValue) => {
        if (isMulti) {
            const current = value || [];
            const next = current.includes(optionValue)
                ? current.filter((v) => v !== optionValue) // deselect
                : [...current, optionValue];                // select
            onChange(next);
        } else {
            // is a single select option
            // picking a new option always replaces the old one
            onChange(optionValue);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {block.label && <p className="font-bold text-slate-700">{block.label}</p>}
            <div className={containerClass}>
                {block.options.map((opt) => (
                    <MultiSelect
                        key={opt.value}
                        icon={opt.icon}
                        title={opt.label}
                        subtitle={opt.text}
                        orientation={orientation}
                        checked={isSelected(opt.value)}
                        onChange={() => toggleOption(opt.value)}
                    />
                ))}
            </div>
        </div>
    );
};

export default OnboardBlock;
