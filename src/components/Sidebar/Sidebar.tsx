import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../Redux/store";
import { setSelectedCategory } from "../../Redux/features/sideBar/sideBarSlice";
import { categories } from "../../utils/constants";
import { motion, AnimatePresence, type Variants } from "motion/react";

const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
    const selectedCategory = useSelector((state: RootState) => state.sidebar.selectedCategory);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            },
        },
    };

    const sidebarVariants: Variants = {
        open: {
            width: 256,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
        closed: {
            width: 80, // Matches sm:w-20
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        }
    };

    return (
        <motion.aside
            initial={false}
            animate={isSidebarOpen ? "open" : "closed"}
            variants={sidebarVariants}
            className="hidden lg:block sticky top-[64px] h-[calc(100vh-64px)] z-40 glass-v4 border-r overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 px-3"
        >
            <motion.div
                className="flex flex-col gap-2 py-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {categories.map((category) => (
                    <motion.button
                        key={category.name}
                        layout
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => dispatch(setSelectedCategory(category.name))}
                        className={`flex items-center gap-4 py-3 rounded-box group
                        ${category.name === selectedCategory
                                ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(13,242,89,0.1)]"
                                : "text-base-content/70 hover:bg-base-content/5 hover:text-base-content"}
                        ${!isSidebarOpen && "justify-center"}
                        cursor-pointer
                        `}
                    >
                        <motion.span
                            layout
                            className={`text-2xl ${category.name === selectedCategory ? "text-primary" : "group-hover:text-primary transition-colors"}`}
                        >
                            {category.icon}
                        </motion.span>

                        <AnimatePresence mode="wait">
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm font-medium whitespace-nowrap"
                                >
                                    {category.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                ))}

                <div className="divider opacity-10 my-4" />

                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-4 text-xs text-base-content/30"
                        >
                            <p>© 2026 YouTube Clone</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.aside>
    );
};

export default Sidebar;


