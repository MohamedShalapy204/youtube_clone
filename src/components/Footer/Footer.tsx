import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-auto glass-v4 border-t p-8 pb-28">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand Section */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-1 group">
                        <BsYoutube size={28} className="text-primary transition-transform group-hover:scale-105" />
                        <span className="text-base-content font-bold text-xl tracking-tighter">YouTube</span>
                    </Link>
                    <p className="text-sm text-base-content/50 max-w-xs">
                        A modern YouTube clone built with React, Tailwind CSS, and Framer Motion.
                        Experience premium design and smooth interactions.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex gap-12 sm:gap-24">
                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-base-content uppercase tracking-widest opacity-30">Explore</h4>
                        <ul className="flex flex-col gap-2 text-sm text-base-content/60">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><button className="hover:text-primary transition-colors text-left">Gaming</button></li>
                            <li><button className="hover:text-primary transition-colors text-left">Music</button></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-base-content uppercase tracking-widest opacity-30">Legal</h4>
                        <ul className="flex flex-col gap-2 text-sm text-base-content/60">
                            <li><button className="hover:text-primary transition-colors text-left">Privacy</button></li>
                            <li><button className="hover:text-primary transition-colors text-left">Terms</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto divider opacity-10 my-8" />

            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-base-content/30 italic">
                <p>© 2026 YouTube Clone. All rights reserved.</p>
                <p>Designed with ❤️ for premium experience.</p>
            </div>
        </footer>
    );
};

export default Footer;
