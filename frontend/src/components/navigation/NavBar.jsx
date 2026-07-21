import React, { useState } from "react";
import { Link } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router'
import {
    Calendar,
    BarChart2,
    Download,
    Settings,
    Power,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// collapses to only icon
const NavItem = ({ icon: Icon, label, to, collapsed, active, onClick }) => {
    const content = (
        <>
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
        </>
    );

    const sharedStyle = `flex items-center gap-3 mx-3 px-3 py-2 rounded-full font-bold transition-colors
        ${active
            ? "bg-white shadow-md text-slate-700"
            : "text-slate-400 hover:text-slate-600"
        }`;

    // if there's a route, it's a navigation link
    if (to) {
        return (
            <Link to={to} className={sharedStyle}>
                {content}
            </Link>
        );
    }

    // otherwise it's an action button
    return (
        <button type="button" onClick={onClick} className={sharedStyle}>
            {content}
        </button>
    );
};

const NavBar = ({ activePage = "plan" }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {user, logout} = UserAuth();
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            console.log("log out clicked")
            await logout()
            navigate("/")
        } catch (error) {
            console.log(error.message)
        }
    }

    const topItems = [
        { key: "plan", label: "plan", icon: Calendar, to: "/plan" },
        { key: "insights", label: "insights", icon: BarChart2, to: "/insights" },
        { key: "export", label: "export", icon: Download, to: "/export" },
    ];

    const bottomItems = [
        { key: "settings", label: "settings", icon: Settings, to: "/settings" },
        { key: "logout", label: "log out", icon: Power, onClick: handleLogout },
    ];

    return (
        <div
            className={`h-screen flex flex-col justify-between bg-white bg-opacity-70 border-r border-white transition-all
                ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* top */}
            <div>
                <div className="flex items-center justify-between px-4 py-6">
                    <Link to="/" className="flex items-center gap-2 min-w-0">
                        <span className="text-2xl shrink-0">🪺</span>
                        {!collapsed && (
                            <h1 className="text-2xl font-bold text-slate-800 font-serif truncate">
                                MyNest
                            </h1>
                        )}
                    </Link>
                    <button
                        onClick={() => setCollapsed((c) => !c)}
                        className="text-purple-500 shrink-0"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className="flex flex-col gap-2 mt-2">
                    {topItems.map((item) => (
                        <NavItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            to={item.to}
                            collapsed={collapsed}
                            active={activePage === item.key}
                        />
                    ))}
                </nav>
            </div>

            {/* bottom */}
            <nav className="flex flex-col gap-2 mb-6">
                {bottomItems.map((item) => (
                    <NavItem
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        to={item.to}
                        collapsed={collapsed}
                        active={activePage === item.key}
                        onClick={item.onClick}
                    />
                ))}
            </nav>
        </div>
    );
};

export default NavBar;
