import { motion } from "motion/react";
import {
    MdHistory,
    MdPlaylistPlay,
    MdThumbUp,
    MdWatchLater,
    MdVideoLibrary,
    MdMoreVert,
    MdPlayArrow,
    MdPerson,
    MdVerified
} from "react-icons/md";
import Sidebar from "../Sidebar";

// Mock data for the demonstration
const historyVideos = [
    { id: "1", title: "Future of AI in 2025", author: "TechLens", views: "1.2M", time: "2 days ago", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400" },
    { id: "2", title: "Building a YouTube Clone with React", author: "CodeWithMe", views: "850K", time: "5 hours ago", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400" },
    { id: "3", title: "The Art of Minimalist Living", author: "AuraVibe", views: "2.5M", time: "1 week ago", thumbnail: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400" },
    { id: "4", title: "Deep Sea Exploration Log #42", author: "OceanDeep", views: "500K", time: "3 days ago", thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=400" },
];

const playlists = [
    { id: "p1", name: "Favorites", count: 124, thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400" },
    { id: "p2", name: "Coding Chill", count: 45, thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400" },
    { id: "p3", name: "Watch Later", count: 12, thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400" },
];

const Library = () => {
    return (
        <div className="flex gap-2 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col p-4 md:p-8 overflow-x-hidden pb-32">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row gap-8 items-center mb-12 p-8 rounded-[var(--radius-box)] glass-v4 border border-white/10"
                >
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-emerald-900 p-1">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <MdPerson size={80} className="text-white/20" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-black border-2 border-primary rounded-full flex items-center justify-center">
                            <MdVerified className="text-primary text-lg" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-white mb-2">Neon Creator</h1>
                        <p className="text-white/40 mb-4 flex items-center justify-center md:justify-start gap-2">
                            <span>@neon_creator</span>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span>42.5K Subscribers</span>
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60">
                                <span className="text-white font-bold mr-1">1,240</span> Videos Watched
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60">
                                <span className="text-white font-bold mr-1">15</span> Playlists
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-primary rounded-full px-8">Manage Account</button>
                    </div>
                </motion.div>

                {/* History Section */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <MdHistory className="text-primary" />
                            History
                        </h2>
                        <button className="text-primary text-sm font-semibold hover:underline">See all</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {historyVideos.map((video, idx) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-video rounded-[var(--radius-box)] overflow-hidden mb-3 border border-white/5">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center shadow-lg shadow-primary/20">
                                            <MdPlayArrow size={32} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-bold">14:20</div>
                                </div>
                                <h3 className="text-white font-bold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
                                <p className="text-white/40 text-xs">{video.author} • {video.views} views</p>
                                <p className="text-[10px] text-primary/60 mt-1 uppercase tracking-wider font-bold">{video.time}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Playlists Section */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <MdPlaylistPlay className="text-primary" />
                            Playlists
                        </h2>
                        <button className="text-primary text-sm font-semibold hover:underline">See all</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {playlists.map((playlist, idx) => (
                            <motion.div
                                key={playlist.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="relative rounded-[var(--radius-box)] overflow-hidden aspect-[16/10] group cursor-pointer border border-white/5"
                            >
                                <img src={playlist.thumbnail} alt={playlist.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-2xl font-black text-white mb-1">{playlist.name}</h3>
                                    <div className="flex items-center gap-4 text-white/60 text-sm">
                                        <span className="flex items-center gap-1">
                                            <MdVideoLibrary />
                                            {playlist.count} Videos
                                        </span>
                                        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                            <MdMoreVert />
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 p-3 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">
                                    <MdPlaylistPlay size={24} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Quick Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-8 rounded-[var(--radius-box)] glass-v4 border border-white/10 flex items-center justify-between group cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                <MdThumbUp size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Liked Videos</h3>
                                <p className="text-white/40">452 videos</p>
                            </div>
                        </div>
                        <MdPlayArrow size={24} className="text-white/20 group-hover:text-primary transition-colors" />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-8 rounded-[var(--radius-box)] glass-v4 border border-white/10 flex items-center justify-between group cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">
                                <MdWatchLater size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Watch Later</h3>
                                <p className="text-white/40">12 videos</p>
                            </div>
                        </div>
                        <MdPlayArrow size={24} className="text-white/20 group-hover:text-primary transition-colors" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Library;
