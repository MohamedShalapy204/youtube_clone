import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { MdPlayArrow, MdCheckCircle, MdThumbUp, MdVisibility, MdClose } from "react-icons/md";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import { usePlaylist } from "../../hooks/usePlaylist";
import Comments from "../VideoDetails/Comments";
import { type Item } from "../../types";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";

const PlaylistPlayer = () => {
    const { videoId, playlistId } = useParams();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { playlist, items, isLoading: isLoadingPlaylist } = usePlaylist(playlistId);

    const { data: videoDetail, isLoading: isLoadingVideo } = useQuery<{ items: Item[] }>({
        queryKey: ['videoDetail', videoId],
        queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`),
        staleTime: 1000 * 60 * 10,
    });

    // Scroll active video into view in the playlist queue
    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.querySelector('.active-video');
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [videoId, items]);

    if (isLoadingVideo || isLoadingPlaylist) {
        return (
            <div className="flex h-screen bg-black animate-pulse">
                <Sidebar />
                <div className="flex-1 p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="aspect-video bg-white/5 rounded-2xl w-full" />
                        <div className="h-8 bg-white/5 rounded w-3/4 mt-6" />
                    </div>
                    <div className="lg:w-[400px] h-[600px] bg-white/5 rounded-2xl" />
                </div>
            </div>
        );
    }

    const video = videoDetail?.items?.[0];
    const currentIndex = items?.findIndex(item => item.snippet.resourceId.videoId === videoId) ?? -1;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen bg-black"
        >
            <Sidebar />

            <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-6 pb-32">
                {/* Main Content: Player and Details */}
                <div className="flex-1 min-w-0">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-base-300">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title={video?.snippet.title}
                            className="w-full h-full border-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <div className="mt-6">
                        <h1 className="text-xl lg:text-2xl font-black text-white leading-tight">
                            {video?.snippet.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b border-white/10 gap-4">
                            <Link to={`/channel/${video?.snippet.channelId}`} className="group flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg transition-transform group-hover:scale-110">
                                    {video?.snippet.channelTitle?.[0]}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <h2 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                                            {video?.snippet.channelTitle}
                                        </h2>
                                        <MdCheckCircle className="text-primary text-[10px]" />
                                    </div>
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Channel</span>
                                </div>
                            </Link>

                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full font-bold text-xs text-white/60">
                                    <MdThumbUp className="text-primary" />
                                    {parseInt(video?.statistics?.likeCount || "0").toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full font-bold text-xs text-white/60">
                                    <MdVisibility className="text-primary" />
                                    {parseInt(video?.statistics?.viewCount || "0").toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 glass-v4 rounded-2xl border border-white/5">
                            <p className={`text-sm text-white/60 whitespace-pre-wrap leading-relaxed ${showFullDescription ? '' : 'line-clamp-2'}`}>
                                {video?.snippet.description}
                            </p>
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-primary text-xs font-black mt-2 uppercase tracking-tighter hover:underline"
                            >
                                {showFullDescription ? "Show less" : "Read more"}
                            </button>
                        </div>

                        <div className="mt-8">
                            <Comments videoId={videoId!} />
                        </div>
                    </div>
                </div>

                {/* Sidebar: Playlist Queue */}
                <div className="lg:w-[400px] shrink-0">
                    <div className="sticky top-24 rounded-2xl overflow-hidden glass-v4 border border-white/10 flex flex-col h-[70vh] lg:h-[calc(100vh-120px)]">
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-white font-black text-lg line-clamp-1">{playlist?.snippet?.title}</h3>
                                <button className="text-white/20 hover:text-white transition-colors">
                                    <MdClose size={20} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase">
                                <span className="text-primary">{playlist?.snippet?.channelTitle}</span>
                                <span>•</span>
                                <span>{currentIndex + 1} / {items?.length}</span>
                            </div>
                        </div>

                        {/* List */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 p-2 flex flex-col gap-1"
                        >
                            {items?.map((item, idx) => {
                                const isPlaying = item.snippet.resourceId.videoId === videoId;
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/video/${item.snippet.resourceId.videoId}/playlist/${playlistId}`}
                                        className={`flex gap-3 p-2 rounded-xl transition-all group ${isPlaying ? 'bg-primary/10 active-video' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="text-[10px] font-black w-4 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors">
                                            {isPlaying ? <MdPlayArrow className="text-primary" size={16} /> : idx + 1}
                                        </div>

                                        <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0">
                                            <img src={item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url} alt="" className="w-full h-full object-cover" />
                                            {isPlaying && <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />}
                                        </div>

                                        <div className="flex-1 min-w-0 py-1">
                                            <h4 className={`text-xs font-bold line-clamp-2 leading-tight ${isPlaying ? 'text-primary' : 'text-white'}`}>
                                                {item.snippet.title}
                                            </h4>
                                            <p className="text-[10px] text-white/40 mt-1 truncate">{item.snippet.channelTitle}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PlaylistPlayer;
