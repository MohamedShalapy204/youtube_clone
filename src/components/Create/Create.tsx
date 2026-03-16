import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    MdFileUpload,
    MdLiveTv,
    MdPostAdd,
    MdVideoCall,
    MdCloudUpload,
    MdInfoOutline,
    MdHistory,
    MdClose
} from "react-icons/md";
import Sidebar from "../Sidebar";

const Create = () => {
    const [selectedTab, setSelectedTab] = useState<"upload" | "live" | "post">("upload");
    const [dragActive, setDragActive] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Delay notification slightly for better UX
        const timer = setTimeout(() => setShowNotification(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="flex gap-2 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto pb-32">
                <motion.header
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-white flex items-center gap-4">
                                <MdVideoCall className="text-primary" />
                                Content Creator
                                <span className="text-xl font-medium text-white/20">Studio Beta</span>
                            </h1>
                            <p className="text-white/40 mt-2 text-lg">Deploy your vision to the global network</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-v4 border border-white/10 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                <MdHistory />
                                Drafts
                            </button>
                            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                                <MdInfoOutline />
                                Sandbox Env
                            </div>
                        </div>
                    </div>
                </motion.header>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Creative Options */}
                    <div className="w-full lg:w-80 flex flex-col gap-4">
                        {[
                            { id: "upload", label: "Ship Video", icon: <MdFileUpload />, desc: "Upload high-fidelity video files", color: "bg-primary" },
                            { id: "live", label: "Live Uplink", icon: <MdLiveTv />, desc: "Real-time stream to subscribers", color: "bg-red-500" },
                            { id: "post", label: "Broadcast Post", icon: <MdPostAdd />, desc: "Transmit text and image updates", color: "bg-blue-500" }
                        ].map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedTab(item.id as "upload" | "live" | "post")}
                                className={`flex items-start gap-4 p-6 rounded-[var(--radius-box)] border transition-all cursor-pointer group ${selectedTab === item.id
                                    ? "glass-v4 border-primary shadow-[0_0_30px_rgba(var(--color-primary),0.1)]"
                                    : "bg-transparent border-white/5 hover:bg-white/5"
                                    }`}
                            >
                                <div className={`p-3 rounded-2xl text-white ${item.color} shadow-lg transition-transform group-hover:scale-110`}>
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className={`font-black uppercase tracking-widest text-xs ${selectedTab === item.id ? "text-primary" : "text-white/60"}`}>
                                        {item.label}
                                    </h3>
                                    <p className="text-[11px] text-white/30 mt-1 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.button>
                        ))}

                        <div className="mt-8 p-8 rounded-[var(--radius-box)] glass-v4 border border-white/5 bg-linear-to-b from-transparent to-primary/5">
                            <h4 className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-[0.2em] mb-4">
                                <div className="w-1 h-4 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)]" />
                                Protocols
                            </h4>
                            <ul className="text-[11px] text-white/30 space-y-3">
                                <li className="flex gap-2">
                                    <span className="text-primary">01</span>
                                    Maintain visual transmission quality.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">02</span>
                                    Authorization checks for all assets.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">03</span>
                                    Sync with community frequencies.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Action Area */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {selectedTab === "upload" && (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="h-full min-h-[550px]"
                                >
                                    <div
                                        className={`h-full border-2 border-dashed rounded-[var(--radius-box)] flex flex-col items-center justify-center p-12 transition-all relative overflow-hidden group ${dragActive ? "border-primary bg-primary/10" : "border-white/10 glass-v4"
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={(e) => {
                                            handleDrag(e);
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

                                        <div className="w-32 h-32 rounded-full bg-black/60 border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative z-10 transition-transform group-hover:scale-110">
                                            <MdCloudUpload className="text-6xl text-primary animate-pulse" />
                                        </div>

                                        <h2 className="text-3xl font-black text-white mb-3 text-center uppercase tracking-tighter relative z-10">
                                            Initiate File Upload
                                        </h2>
                                        <p className="text-white/40 mb-10 text-center max-w-sm text-sm relative z-10">
                                            Streamline your workflow by dragging and dropping local transmission files here.
                                        </p>

                                        <button className="px-12 py-4 bg-primary text-black font-black rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(var(--color-primary),0.3)] relative z-10">
                                            SELECT LOCAL FILES
                                        </button>

                                        <div className="mt-16 grid grid-cols-2 gap-12 text-center relative z-10 border-t border-white/5 pt-12 w-full max-w-lg">
                                            <div>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] mb-2">Maximum Capacity</p>
                                                <p className="text-xl font-black text-white">2.5 GB / File</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] mb-2">Protocol Format</p>
                                                <p className="text-xl font-black text-white">MKV, MP4, AV1</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {selectedTab === "live" && (
                                <motion.div
                                    key="live"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-12 rounded-[var(--radius-box)] glass-v4 border border-red-500/20 flex flex-col items-center justify-center text-center min-h-[550px] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-linear-to-b from-red-500/5 to-transparent pointer-events-none" />

                                    <div className="relative mb-10">
                                        <div className="p-10 rounded-full bg-red-500/10 border border-red-500/20 animate-pulse">
                                            <MdLiveTv className="text-8xl text-red-500" />
                                        </div>
                                        <span className="absolute top-2 right-2 flex h-6 w-6">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 shadow-[0_0_15px_#f87171]"></span>
                                        </span>
                                    </div>

                                    <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Emergency Uplink</h2>
                                    <p className="text-white/40 mb-10 max-w-md text-sm leading-relaxed">
                                        Establish a direct satellite branch to your subscriber base. Low latency, high fidelity, 100% control.
                                    </p>

                                    <div className="flex gap-4">
                                        <button className="px-12 py-4 bg-red-500 text-white font-black rounded-full hover:scale-110 transition-all cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                            GO LIVE NOW
                                        </button>
                                        <button className="px-12 py-4 glass-v4 text-white font-black rounded-full hover:bg-white/10 transition-all cursor-pointer border border-white/10">
                                            SCHEDULE LINK
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {/* Notification Toast */}
                <AnimatePresence>
                    {showNotification && (
                        <motion.div
                            initial={{ opacity: 0, y: -100, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: -100, x: "-50%" }}
                            className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-full max-w-fit px-4"
                        >
                            <div className="glass-v4 border border-primary/40 p-4 px-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6 pointer-events-auto backdrop-blur-2xl bg-black/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
                                    <p className="text-white text-sm font-bold tracking-wide">
                                        <span className="text-primary uppercase mr-2">System Notice:</span>
                                        This module is currently in <span className="text-primary italic">Beta Design Mode</span>. Actions are not persisted.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/5 active:scale-90"
                                    aria-label="Close notification"
                                >
                                    <MdClose size={20} className="text-white/40 group-hover:text-white group-hover:rotate-90 transition-all" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Create;
