import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from "lucide-react";

const Dropdown = ({ value, options, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='relative'>
            {/* toggle dropdown */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between border-2 border-purple-300 rounded-md px-4 py-1.5 min-w-32
                text-sm font-medium text-slate-700 bg-white"
            >
                {value}
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* add options available when open */}
            {open && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-100 rounded-md shadow-md z-10 min-w-32">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className="block text-left px-4 py-2 text-sm hover:bg-purple-50 whitespace-nowrap min-w-full"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;