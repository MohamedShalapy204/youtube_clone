import { useParams, Link } from "react-router-dom";
import { usePlaylist } from "../../hooks/usePlaylist";
import { MdPlayArrow, MdShuffle, MdMoreVert, MdPlaylistPlay, MdShare, MdDownload } from "react-icons/md";
import Sidebar from "../Sidebar";
import { motion } from "framer-motion";

const PlaylistDetails = () => {
    const { id } = useParams();
    const { playlist, items, isLoading, isError, error } = usePlaylist(id);

    if (isError) {
        return (
            <div className="flex min-h-screen bg-black">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center p-8 glass-v4 rounded-(--radius-box) border border-white/10">
                        <h2 className="text-2xl font-bold text-error mb-2">Oops! Something went wrong.</h2>
                        <p className="text-white/40">{(error as Error).message}</p>
                    </div>
                </div>
            </div>
        );
    }

    const playlistThumbnail = playlist?.snippet?.thumbnails?.maxres?.url ||
        playlist?.snippet?.thumbnails?.high?.url ||
        items?.[0]?.snippet?.thumbnails?.high?.url ||
        items?.[0]?.snippet?.thumbnails?.medium?.url ||
        items?.[0]?.snippet?.thumbnails?.default?.url;

    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar />

            <div className="flex-1 flex flex-col md:flex-row gap-8 p-4 md:p-8 overflow-x-hidden pb-32">
                {/* Left Panel: Playlist Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-[360px] lg:w-[400px] shrink-0"
                >
                    <div className="sticky top-24 rounded-(--radius-box) overflow-hidden glass-v4 border border-white/10 flex flex-col">
                        {/* Background Blur */}
                        <div className="relative h-[250px] w-full overflow-hidden">
                            <img
                                src={playlistThumbnail}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-50"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />

                            {/* Static Thumbnail with Play All Link */}
                            <div className="absolute inset-0 p-6 flex items-center justify-center">
                                <Link to={`/video/${items?.[0]?.snippet?.resourceId?.videoId}/playlist/${id}`} className="relative group cursor-pointer aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                                    <img src={playlistThumbnail} alt={playlist?.snippet?.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                                            <MdPlayArrow size={24} />
                                            <span className="font-bold text-sm uppercase">Play All</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-[10px] font-bold flex items-center gap-1">
                                        <MdPlaylistPlay /> {items?.length || 0} VIDEOS
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-6">
                            <h1 className="text-2xl font-black text-white mb-2 leading-tight">
                                {playlist?.snippet?.title || "Playlist Videos"}
                            </h1>

                            <div className="flex flex-col gap-1 mb-6">
                                <Link to={`/channel/${playlist?.snippet?.channelId}`} className="text-sm font-bold text-white hover:text-primary transition-colors">
                                    {playlist?.snippet?.channelTitle}
                                </Link>
                                <div className="flex items-center gap-2 text-xs text-white/40">
                                    <span>{items?.length} videos</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span>Updated {new Date(playlist?.snippet?.publishedAt || "").toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mb-6">
                                <Link
                                    to={`/video/${items?.[0]?.snippet?.resourceId?.videoId}/playlist/${id}`}
                                    className="flex-1 btn btn-primary rounded-full gap-2 flex items-center justify-center h-10 border-none no-animation font-bold uppercase transition-all"
                                >
                                    <MdPlayArrow size={24} />
                                    Play all
                                </Link>
                                <button className="flex-1 btn bg-white/10 hover:bg-white/20 text-white rounded-full gap-2 flex items-center justify-center h-10 border-none transition-all font-bold uppercase">
                                    <MdShuffle size={20} />
                                    Shuffle
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                                    <MdShare size={20} />
                                </button>
                                <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                                    <MdDownload size={20} />
                                </button>
                                <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                                    <MdMoreVert size={20} />
                                </button>
                            </div>

                            {playlist?.snippet?.description && (
                                <p className="mt-8 text-sm text-white/40 line-clamp-3 leading-relaxed">
                                    {playlist.snippet.description}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel: Video List */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-xl animate-pulse">
                                    <div className="w-40 aspect-video bg-white/5 rounded-lg shrink-0" />
                                    <div className="flex-1 flex flex-col gap-2 py-1">
                                        <div className="h-4 bg-white/5 rounded w-3/4" />
                                        <div className="h-3 bg-white/5 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {items?.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer items-start"
                                >
                                    <div className="text-white/20 font-bold text-sm w-4 pt-10 text-center group-hover:text-primary transition-colors text-[10px] tracking-tighter">
                                        {idx + 1}
                                    </div>

                                    <Link to={`/video/${item.snippet.resourceId.videoId}/playlist/${id}`} className="relative w-40 md:w-48 aspect-video rounded-lg overflow-hidden shrink-0 shadow-lg group-hover:shadow-primary/5">
                                        <img
                                            src={item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url}
                                            alt={item.snippet.title}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-primary">
                                            <MdPlayArrow size={32} />
                                        </div>
                                    </Link>

                                    <div className="flex-1 flex flex-col gap-1 py-1 overflow-hidden">
                                        <Link to={`/video/${item.snippet.resourceId.videoId}/playlist/${id}`}>
                                            <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                                {item.snippet.title}
                                            </h3>
                                        </Link>
                                        <Link to={`/channel/${item.snippet.channelId}`} className="text-xs text-white/40 hover:text-white transition-colors">
                                            {item.snippet.channelTitle}
                                        </Link>
                                    </div>

                                    <button className="opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-white transition-opacity">
                                        <MdMoreVert size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlaylistDetails;
