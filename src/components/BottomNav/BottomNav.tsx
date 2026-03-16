import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { motion } from "motion/react";

const BottomNav = () => {
    const { pathname } = useLocation();

    const navItems = [
        { icon: <MdHome size={24} />, label: "Home", path: "/" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass-v4 border-t px-4 py-2 flex justify-around items-center">
            {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? "text-primary" : "text-base-content/50 hover:text-base-content"}`}
                    >
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            className={`${isActive ? "text-primary drop-shadow-[0_0_8px_rgba(13,242,89,0.5)]" : ""}`}
                        >
                            {item.icon}
                        </motion.div>
                        <span className="text-[10px] font-medium uppercase tracking-tighter">
                            {item.label}
                        </span>
                        {isActive && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#0df259]"
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

export default BottomNav;
