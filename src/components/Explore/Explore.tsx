import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import ItemsLayout from "../Feed/ItemsLayout";
import Sidebar from "../Sidebar";
import { motion } from "motion/react";
import { MdTrendingUp, MdMusicNote, MdSportsEsports, MdMovie, MdLiveTv, MdCheckroom } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../Redux/features/sideBar/sideBarSlice";
import { type AppDispatch } from "../../Redux/store";

const exploreCategories = [
    { name: "Trending", icon: <MdTrendingUp />, color: "from-rose-500 to-pink-600" },
    { name: "Music", icon: <MdMusicNote />, color: "from-blue-500 to-cyan-500" },
    { name: "Gaming", icon: <MdSportsEsports />, color: "from-emerald-500 to-teal-600" },
    { name: "Movies", icon: <MdMovie />, color: "from-amber-400 to-orange-500" },
    { name: "Live", icon: <MdLiveTv />, color: "from-red-600 to-red-800" },
    { name: "Fashion", icon: <MdCheckroom />, color: "from-indigo-500 to-purple-600" },
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
        <div className="flex gap-2 min-h-screen bg-black/95">
            <Sidebar />
            <div className="flex-1 flex flex-col gap-8 p-4 md:p-8 overflow-y-auto">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <span className="text-primary">Explore</span>
                        <span className="text-xl font-medium text-white/40">New & Popular</span>
                    </h1>
                </motion.header>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {exploreCategories.map((cat, idx) => (
                        <motion.button
                            key={cat.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-linear-to-br ${cat.color} text-white shadow-lg hover:shadow-primary/20 transition-all cursor-pointer group relative overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl">{cat.icon}</span>
                            </div>
                            <span className="text-3xl mb-3 relative z-10">{cat.icon}</span>
                            <span className="font-bold relative z-10">{cat.name}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="flex flex-col gap-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <MdTrendingUp className="text-rose-500" />
                            Trending Videos
                        </h2>
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
