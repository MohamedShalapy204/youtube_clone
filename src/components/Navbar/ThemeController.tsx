import { useState, useEffect } from "react";
import { MdPalette, MdCheckCircle } from "react-icons/md";

const themes = [
    { id: "green", name: "Green", color: "bg-emerald-500" },
    { id: "red", name: "Red", color: "bg-red-500" },
    { id: "purple", name: "Purple", color: "bg-purple-500" },
    { id: "blue", name: "Blue", color: "bg-blue-500" },
    { id: "gold", name: "Gold", color: "bg-amber-500" },
];

const ThemeController = () => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "green";
    });

    const handleThemeChange = (themeId: string) => {
        setCurrentTheme(themeId);
        document.documentElement.setAttribute("data-theme", themeId);
        localStorage.setItem("theme", themeId);
    };

    // Listen for theme changes from other components (like the Themes page)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme && savedTheme !== currentTheme) {
                setCurrentTheme(savedTheme);
                document.documentElement.setAttribute("data-theme", savedTheme);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // Custom event for same-window updates
        window.addEventListener("themeChange", ((e: CustomEvent) => {
            setCurrentTheme(e.detail);
        }) as EventListener);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("themeChange", ((e: CustomEvent) => {
                setCurrentTheme(e.detail);
            }) as EventListener);
        };
    }, [currentTheme]);

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle text-primary hover:bg-primary/10 transition-colors"
                title="Change Theme"
            >
                <MdPalette size={24} />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-2xl z-50 w-52 p-2 shadow-2xl border border-white/5 mt-4"
            >
                <li className="px-4 py-3 border-b border-white/5 mb-1">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Select Theme</span>
                </li>
                {themes.map((theme) => (
                    <li key={theme.id}>
                        <button
                            onClick={() => {
                                handleThemeChange(theme.id);
                                // Dispatch custom event for other components in same window
                                window.dispatchEvent(new CustomEvent("themeChange", { detail: theme.id }));
                            }}
                            className={`flex items-center justify-between w-full px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/5 ${currentTheme === theme.id ? "text-primary font-bold bg-primary/5" : "text-base-content/70"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${theme.color} shadow-[0_0_8px_currentColor]`} />
                                {theme.name}
                            </div>
                            {currentTheme === theme.id && <MdCheckCircle size={16} />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeController;
