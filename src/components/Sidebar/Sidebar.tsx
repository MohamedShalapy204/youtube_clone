import { useSelector } from "react-redux";
import { type RootState } from "../../Redux/store";
import { categories } from "../../utils/constants";

const Sidebar = () => {
    const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

    return (
        <aside
            className={`
        sticky top-[72px] h-[calc(100vh-72px)] 
        transition-all duration-300 z-40
        glass-v4 border-r overflow-y-auto overflow-x-hidden
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20
        ${isSidebarOpen ? "w-64 px-3" : "w-0 sm:w-20 sm:px-2"}

        `}
        >
            <div className="flex flex-col gap-2 py-4">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className={`flex items-center gap-4 py-3 rounded-box transition-all group
                        ${category.name === "New"
                                ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(13,242,89,0.1)]"
                                : "text-base-content/70 hover:bg-base-content/5 hover:text-base-content"}
                        ${!isSidebarOpen && "justify-center"}
                        cursor-pointer
                        `}
                    >
                        <span className={`text-2xl ${category.name === "New" ? "text-primary" : "group-hover:text-primary transition-colors"}`}>
                            {category.icon}
                        </span>
                        <span className={`
              text-sm font-medium whitespace-nowrap transition-all duration-300
              ${!isSidebarOpen ? "hidden" : "block"}
            `}>
                            {category.name}
                        </span>
                    </button>
                ))}

                <div className="divider opacity-10 my-4" />

                <div className={`px-4 text-xs text-base-content/30 ${!isSidebarOpen && "hidden"}`}>
                    <p>© 2024 YouTube V4 Clone</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
