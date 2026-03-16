import { Link, useLocation } from "react-router-dom";
import { MdHome, MdExplore, MdSubscriptions, MdVideoLibrary, MdAddCircleOutline } from "react-icons/md";
import { motion, AnimatePresence } from "motion/react";

const BottomNav = () => {
    const { pathname } = useLocation();

    const navItems = [
        { icon: <MdHome size={24} />, label: "Home", path: "/" },
        { icon: <MdExplore size={24} />, label: "Explore", path: "/explore" },
        { icon: <MdAddCircleOutline size={32} />, label: "", path: "/create", isCreate: true },
        { icon: <MdSubscriptions size={24} />, label: "Subs", path: "/subscriptions", badge: 5 },
        { icon: <MdVideoLibrary size={24} />, label: "Library", path: "/library", badge: "new" },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg">
            <nav className="glass-v4 border border-white/10 rounded-3xl p-2 px-4 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8, y: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={`relative flex flex-col items-center gap-1 ${isActive
                                    ? "text-primary drop-shadow-[0_0_12px_var(--color-primary)]"
                                    : "text-base-content/50 hover:text-base-content"
                                    }`}
                            >
                                <div className="relative">
                                    {item.icon}

                                    {/* Badge System */}
                                    <AnimatePresence>
                                        {item.badge && (
                                            <motion.span
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[8px] font-bold text-error-content border-2 border-base-100"
                                            >
                                                {item.badge === "new" ? "" : item.badge}
                                                {item.badge === "new" && (
                                                    <span className="absolute inset-0 rounded-full bg-error animate-ping" />
                                                )}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Dynamic Label - Only shows label for active or specific items if desired */}
                                {item.label && (
                                    <motion.span
                                        initial={false}
                                        animate={{
                                            opacity: isActive ? 1 : 0.6,
                                            scale: isActive ? 1 : 0.9,
                                            y: isActive ? 0 : 2
                                        }}
                                        className="text-[9px] font-black uppercase tracking-widest"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </motion.div>

                            {/* Active Indicator Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavBG"
                                    className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default BottomNav;
