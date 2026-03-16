import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import ItemsLayout from "../Feed/ItemsLayout";
import Sidebar from "../Sidebar";
import { motion } from "motion/react";
import { MdTrendingUp, MdMusicNote, MdSportsEsports, MdMovie, MdLiveTv, MdCheckroom, MdExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../Redux/features/sideBar/sideBarSlice";
import { type AppDispatch } from "../../Redux/store";

const exploreCategories = [
    { name: "Trending", icon: <MdTrendingUp />, color: "from-rose-500/20 to-rose-600/20", textColor: "text-rose-500" },
    { name: "Music", icon: <MdMusicNote />, color: "from-blue-500/20 to-cyan-500/20", textColor: "text-blue-400" },
    { name: "Gaming", icon: <MdSportsEsports />, color: "from-emerald-500/20 to-teal-600/20", textColor: "text-emerald-400" },
    { name: "Movies", icon: <MdMovie />, color: "from-amber-400/20 to-orange-500/20", textColor: "text-amber-400" },
    { name: "Live", icon: <MdLiveTv />, color: "from-red-600/20 to-red-800/20", textColor: "text-red-500" },
    { name: "Fashion", icon: <MdCheckroom />, color: "from-indigo-500/20 to-purple-600/20", textColor: "text-indigo-400" },
];

const Explore = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { data: trendingVideos, isLoading } = useQuery({
        queryKey: ['trending-videos'],
        queryFn: () => fetchFromAPI(`search?part=snippet&q=Trending`),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    const handleCategoryClick = (categoryName: string) => {
        dispatch(setSelectedCategory(categoryName));
        navigate("/");
    };

    return (
        <div className="flex gap-2 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col gap-8 p-4 md:p-8 overflow-y-auto pb-32">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
                        <MdExplore className="text-primary" />
                        Explore
                        <span className="text-xl font-medium text-white/20">Discovery Portal</span>
                    </h1>
                </motion.header>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {exploreCategories.map((cat, idx) => (
                        <motion.button
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`flex flex-col items-center justify-center p-8 rounded-[var(--radius-box)] glass-v4 border border-white/5 text-white/60 hover:text-white transition-all cursor-pointer group relative overflow-hidden`}
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className={`text-4xl mb-4 relative z-10 transition-transform group-hover:scale-110 ${cat.textColor}`}>
                                {cat.icon}
                            </div>
                            <span className="font-black tracking-widest text-[10px] uppercase relative z-10">{cat.name}</span>

                            <div className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-20 transition-opacity z-10">
                                <MdTrendingUp size={16} />
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="flex flex-col gap-8 mt-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                            <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)]" />
                            Trending Now
                        </h2>
                        <div className="h-[1px] flex-1 bg-white/5 mx-6" />
                        <span className="text-white/20 text-xs font-mono uppercase">Global Rankings</span>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-4 w-full">
                                    <div className="skeleton aspect-video w-full rounded-xl bg-white/5"></div>
                                    <div className="flex gap-3">
                                        <div className="skeleton h-9 w-9 shrink-0 rounded-full bg-white/5"></div>
                                        <div className="flex w-full flex-col gap-2">
                                            <div className="skeleton h-4 w-full bg-white/5"></div>
                                            <div className="skeleton h-4 w-2/3 bg-white/5"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ItemsLayout items={trendingVideos?.items || []} />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explore;
