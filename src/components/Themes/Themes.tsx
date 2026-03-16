import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    MdColorLens,
    MdCheckCircle,
    MdFormatPaint,
    MdInvertColors,
    MdRoundedCorner,
    MdLineWeight,
    MdBlurOn,
    MdSettingsBackupRestore,
    MdLayers,
    MdGrain,
    MdSpaceDashboard,
    MdFormatSize,
    MdLightbulb,
    MdContrast,
    MdSlowMotionVideo,
    MdBrightness2
} from "react-icons/md";
import Sidebar from "../Sidebar";

const themes = [
    {
        id: "green",
        name: "Emerald Neon",
        color: "bg-emerald-500",
        preview: "from-emerald-900 via-emerald-800 to-black",
        description: "The classic high-tech green look with sharp contrast."
    },
    {
        id: "red",
        name: "Crimson Forge",
        color: "bg-red-500",
        preview: "from-red-950 via-red-900 to-black",
        description: "Aggressive and powerful red theme for bold creators."
    },
    {
        id: "purple",
        name: "Amethyst Night",
        color: "bg-purple-500",
        preview: "from-purple-950 via-purple-900 to-black",
        description: "Elegant and mystical purple with deep shadows."
    },
    {
        id: "blue",
        name: "Cyan Deep",
        color: "bg-blue-500",
        preview: "from-blue-950 via-blue-900 to-black",
        description: "Cool and professional blue for a focused experience."
    },
    {
        id: "gold",
        name: "Golden Sands",
        color: "bg-amber-500",
        preview: "from-amber-950 via-amber-900 to-black",
        description: "Premium and luxurious gold accents for the elite."
    },
];

const Themes = () => {
    // Basic Theme State
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "green";
    });

    // Advanced CSS Variables State
    const [config, setConfig] = useState(() => {
        const savedConfig = localStorage.getItem("themeConfig");
        if (savedConfig) return JSON.parse(savedConfig);
        return {
            radius: 1, // multiplier
            border: 1, // width in pixels
            blur: 1,   // multiplier
            noise: 0.02,
            depth: 1,
            spacing: 1,
            fontSize: 1,
            glow: 0,
            saturation: 100,
            speed: 0.1,
            brightness: 100
        };
    });

    const handleThemeChange = (themeId: string) => {
        setCurrentTheme(themeId);
        window.dispatchEvent(new CustomEvent("themeChange", { detail: themeId }));
    };

    const updateConfig = (key: string, value: number) => {
        const newConfig = { ...config, [key]: value };
        setConfig(newConfig);
        localStorage.setItem("themeConfig", JSON.stringify(newConfig));
    };

    const resetConfig = () => {
        const defaultConfig = {
            radius: 1,
            border: 1,
            blur: 1,
            noise: 0.02,
            depth: 1,
            spacing: 1,
            fontSize: 1,
            glow: 0,
            saturation: 100,
            speed: 0.1,
            brightness: 100
        };
        setConfig(defaultConfig);
        localStorage.setItem("themeConfig", JSON.stringify(defaultConfig));
    };

    useEffect(() => {
        const handleThemeUpdate = (e: any) => {
            setCurrentTheme(e.detail);
        };
        window.addEventListener("themeChange", handleThemeUpdate);
        return () => window.removeEventListener("themeChange", handleThemeUpdate);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);

        // Apply Advanced Config via CSS Variables
        const root = document.documentElement;
        root.style.setProperty("--radius-selector", `${0.75 * config.radius}rem`);
        root.style.setProperty("--radius-field", `${0.75 * config.radius}rem`);
        root.style.setProperty("--radius-box", `${1 * config.radius}rem`);
        root.style.setProperty("--border", `${config.border}px`);
        root.style.setProperty("--depth", `${config.depth}`);
        root.style.setProperty("--noise", `${config.noise}`);
        root.style.setProperty("--glow-intensity", `${config.glow}`);
        root.style.setProperty("--speed", `${config.speed}s`);

        // Global Spacing & Typography
        root.style.setProperty("--spacing-multiplier", `${config.spacing}`);
        root.style.setProperty("font-size", `${16 * config.fontSize}px`);

        // Filter based settings
        root.style.filter = `saturate(${config.saturation}%) brightness(${config.brightness}%)`;

    }, [currentTheme, config]);

    return (
        <div className="flex gap-2 min-h-screen bg-black/95">
            <Sidebar />

            <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-4xl font-extrabold text-white flex items-center gap-4">
                            <MdColorLens className="text-primary" />
                            Themes & Style
                        </h1>
                        <p className="text-white/40 mt-2 text-lg">Fine-tune the interface to match your workflow</p>
                    </div>

                    <button
                        onClick={resetConfig}
                        className="btn btn-sm btn-ghost gap-2 text-white/50 hover:text-white"
                    >
                        <MdSettingsBackupRestore />
                        Reset Defaults
                    </button>
                </motion.header>

                <div className="flex flex-col xl:flex-row gap-12">
                    {/* Theme Selector */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <MdFormatPaint className="text-primary" />
                            Color Palettes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {themes.map((theme, idx) => (
                                <motion.button
                                    key={theme.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => handleThemeChange(theme.id)}
                                    className={`group relative overflow-hidden rounded-3xl border transition-all p-1 ${currentTheme === theme.id
                                        ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(var(--color-primary),0.1)]"
                                        : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                                        }`}
                                >
                                    <div className={`h-24 rounded-2xl bg-gradient-to-br ${theme.preview} mb-3 relative overflow-hidden p-4 flex flex-col justify-end`}>
                                        <div className="absolute top-3 right-3">
                                            {currentTheme === theme.id && <MdCheckCircle className="text-2xl text-primary" />}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${theme.color} shadow-[0_0_8px_currentColor]`} />
                                            <span className="font-bold text-white text-lg">{theme.name}</span>
                                        </div>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <p className="text-xs text-white/40 leading-relaxed line-clamp-1">{theme.description}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Controls */}
                    <div className="w-full xl:w-96 flex flex-col gap-8 p-8 rounded-3xl bg-white/5 border border-white/5 h-fit max-h-[80vh] overflow-y-auto scrollbar-hide">
                        <h2 className="glass-v4 text-xl rounded-box font-bold text-white flex items-center gap-2 sticky top-0 bg-white/5 py-2 z-10">
                            <MdInvertColors className="text-primary" />
                            Feel & Finish
                        </h2>

                        <div className="flex flex-col gap-8">
                            {/* Border Radius Control */}
                            <div className="flex flex-col gap-4">
                                <div className=" flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdRoundedCorner />
                                        Corner Radius
                                    </span>
                                    <span className="text-primary font-mono">{config.radius}x</span>
                                </div>
                                <input
                                    type="range" min="0" max="3" step="0.25"
                                    value={config.radius}
                                    onChange={(e) => updateConfig("radius", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Glow Intensity Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdLightbulb />
                                        Primary Glow
                                    </span>
                                    <span className="text-primary font-mono">{config.glow}x</span>
                                </div>
                                <input
                                    type="range" min="0" max="2" step="0.1"
                                    value={config.glow}
                                    onChange={(e) => updateConfig("glow", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Background Dim Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdBrightness2 />
                                        Global Brightness
                                    </span>
                                    <span className="text-primary font-mono">{config.brightness}%</span>
                                </div>
                                <input
                                    type="range" min="30" max="100" step="5"
                                    value={config.brightness}
                                    onChange={(e) => updateConfig("brightness", parseInt(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Saturation Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdContrast />
                                        Color Saturation
                                    </span>
                                    <span className="text-primary font-mono">{config.saturation}%</span>
                                </div>
                                <input
                                    type="range" min="50" max="200" step="5"
                                    value={config.saturation}
                                    onChange={(e) => updateConfig("saturation", parseInt(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Border Width Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdLineWeight />
                                        Border Thickness
                                    </span>
                                    <span className="text-primary font-mono">{config.border}px</span>
                                </div>
                                <input
                                    type="range" min="0" max="4" step="1"
                                    value={config.border}
                                    onChange={(e) => updateConfig("border", parseInt(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Animation Speed Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdSlowMotionVideo />
                                        Motion Speed
                                    </span>
                                    <span className="text-primary font-mono">{config.speed}s</span>
                                </div>
                                <input
                                    type="range" min="0.1" max="1" step="0.05"
                                    value={config.speed}
                                    onChange={(e) => updateConfig("speed", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Spacing Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdSpaceDashboard />
                                        Layout Spacing
                                    </span>
                                    <span className="text-primary font-mono">{config.spacing}x</span>
                                </div>
                                <input
                                    type="range" min="0.5" max="2" step="0.1"
                                    value={config.spacing}
                                    onChange={(e) => updateConfig("spacing", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Font Size Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdFormatSize />
                                        Base Font Size
                                    </span>
                                    <span className="text-primary font-mono">{Math.round(config.fontSize * 100)}%</span>
                                </div>
                                <input
                                    type="range" min="0.8" max="1.4" step="0.05"
                                    value={config.fontSize}
                                    onChange={(e) => updateConfig("fontSize", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Glassmorphism / Blur Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdBlurOn />
                                        Glass Intensity
                                    </span>
                                    <span className="text-primary font-mono">{config.blur}x</span>
                                </div>
                                <input
                                    type="range" min="0" max="2" step="0.1"
                                    value={config.blur}
                                    onChange={(e) => updateConfig("blur", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Depth Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdLayers />
                                        Visual Depth
                                    </span>
                                    <span className="text-primary font-mono">{config.depth}x</span>
                                </div>
                                <input
                                    type="range" min="0" max="4" step="0.5"
                                    value={config.depth}
                                    onChange={(e) => updateConfig("depth", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>

                            {/* Noise Control */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60 flex items-center gap-2">
                                        <MdGrain />
                                        Grain Texture
                                    </span>
                                    <span className="text-primary font-mono">{Math.round(config.noise * 100)}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="0.1" step="0.01"
                                    value={config.noise}
                                    onChange={(e) => updateConfig("noise", parseFloat(e.target.value))}
                                    className="range range-primary range-xs"
                                />
                            </div>
                        </div>

                        {/* Visual Preview Box */}
                        <div className="mt-4 p-6 rounded-box border border-primary/20 bg-primary/5 flex flex-col gap-3">
                            <p className="text-[10px] uppercase tracking-widest text-primary font-black">Live Preview</p>
                            <div className="flex gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 animate-pulse" />
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="h-3 w-full rounded bg-white/10" />
                                    <div className="h-3 w-2/3 rounded bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 p-8 rounded-3xl bg-linear-to-r from-primary/5 to-transparent border border-white/5 flex items-center gap-6"
                >
                    <div className="p-4 rounded-2xl bg-white/5 text-primary">
                        <MdColorLens size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Local Config System</h3>
                        <p className="text-white/40 text-sm">Styles are applied globally via CSS Variables and saved to your local storage for a persistent custom experience.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Themes;



