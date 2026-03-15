import { Link } from "react-router-dom";
import { MdSearch, MdVideoCall, MdNotifications, MdAccountCircle, MdMenu } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../Redux/features/sideBar/sideBarSlice";
import ThemeController from "./ThemeController";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between p-4 glass-v4 border-b">
            {/* Left Section: Menu & Logo */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="btn btn-ghost btn-circle text-base-content"
                >
                    <MdMenu size={26} />
                </button>
                <Link to="/" className="flex items-center gap-1 group">
                    <BsYoutube size={32} className="text-primary transition-transform group-hover:scale-105" />
                    <span className="text-base-content font-bold text-xl tracking-tighter hidden sm:block">YouTube</span>
                </Link>
            </div>

            {/* Middle Section: Search Bar (Neon Green Accents) */}
            <div className="flex-1 max-w-2xl px-6">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-primary w-full bg-base-300/50 text-base-content pl-5 pr-12 rounded-field border-white/5 
                        shadow-[inset_0_1px_4px_rgba(13,242,89,0.1)] focus:outline-none 
                        focus:shadow-[0_0_15px_rgba(13,242,89,0.15)] transition-all duration-300 placeholder:text-base-content/30"
                    />
                    <button className="absolute right-0 top-0 h-full px-5 btn btn-primary rounded-l-none rounded-r-field 
                        hover:brightness-110 transition-all border-none">
                        <MdSearch size={22} className="text-primary-content" />
                    </button>
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 sm:gap-5 text-base-content/80">
                {/* Theme Controller Dropdown */}
                <ThemeController />

                <button className="btn btn-ghost btn-circle hidden md:flex" title="Create">
                    <MdVideoCall size={26} />
                </button>
                <button className="btn btn-ghost btn-circle relative" title="Notifications">
                    <MdNotifications size={24} />
                    <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border border-base-100 shadow-[0_0_5px_#0df259]"></span>
                </button>
                <button className="btn btn-ghost btn-circle" title="User Profile">
                    <MdAccountCircle size={32} className="text-primary" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;