import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdCheckCircle, MdThumbUp, MdVisibility } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";

import { fetchFromAPI } from "../../utils/fetchFromApi";
import VideoCard from "../Feed/VideoCard";
import Comments from "./Comments";
import { type Item } from "../../types";

const VideoDetails = () => {
    const { id } = useParams();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const { data: videoDetail, isLoading: isLoadingVideo } = useQuery<{ items: Item[] }>({
        queryKey: ['videoDetail', id],
        queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
        staleTime: 1000 * 60 * 10,
    });

    const { data: relatedVideos, isLoading: isLoadingRelated } = useQuery<{ items: Item[] }>({
        queryKey: ['relatedVideos', id],
        queryFn: () => fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`),
        staleTime: 1000 * 60 * 10,
    });

    if (isLoadingVideo) {
        return (
            <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 animate-pulse min-w-0">
                <div className="flex-1 min-w-0">
                    <div className="skeleton aspect-video w-full rounded-2xl"></div>
                    <div className="skeleton h-8 w-3/4 mt-6 rounded-lg"></div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="skeleton h-6 w-1/4 rounded-lg"></div>
                        <div className="flex gap-4">
                            <div className="skeleton h-6 w-20 rounded-lg"></div>
                            <div className="skeleton h-6 w-20 rounded-lg"></div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-[350px] xl:w-[400px] flex flex-col gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="skeleton aspect-video w-full rounded-xl"></div>
                            <div className="skeleton h-4 w-full rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!videoDetail?.items?.[0]) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error">Video not found</h2>
                    <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
                </div>
            </div>
        );
    }

    const video = videoDetail.items[0];
    const { snippet: { title, channelId, channelTitle, description }, statistics } = video;
    const viewCount = statistics?.viewCount || "0";
    const likeCount = statistics?.likeCount || "0";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[95vh] p-4 lg:p-8 bg-black/50 w-full overflow-x-hidden"
        >
            <div className="flex flex-col lg:flex-row gap-8 max-w-[1800px] mx-auto">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="w-full">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-base-300">
                            <iframe
                                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                title={title}
                                className="absolute top-0 left-0 w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6"
                        >
                            <h1 className="text-xl lg:text-3xl font-bold text-base-content leading-tight wrap-break-word">
                                {title}
                            </h1>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b border-base-content/10 gap-4">
                                <Link to={`/channel/${channelId}`} className="group flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl transition-transform group-hover:scale-110">
                                        {channelTitle?.[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <h2 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                                                {channelTitle}
                                            </h2>
                                            <MdCheckCircle className="text-primary text-sm" />
                                        </div>
                                        <span className="text-xs text-base-content/60 font-medium">Channel</span>
                                    </div>
                                </Link>

                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full font-bold text-sm text-base-content/80">
                                        <MdVisibility className="text-lg text-primary" />
                                        {parseInt(viewCount).toLocaleString()} views
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full font-bold text-sm text-base-content/80">
                                        <MdThumbUp className="text-lg text-primary" />
                                        {parseInt(likeCount).toLocaleString()} likes
                                    </div>
                                </div>
                            </div>

                            {/* Description Box */}
                            <div className="mt-6 p-4 bg-base-200/50 rounded-2xl">
                                <p className={`text-sm whitespace-pre-wrap wrap-break-word transition-all text-base-content/80 ${showFullDescription ? '' : 'line-clamp-3'}`}>
                                    {description}
                                </p>
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-primary text-sm font-bold mt-2 hover:underline"
                                >
                                    {showFullDescription ? "Show less" : "...more"}
                                </button>
                            </div>

                            {/* Comments Section */}
                            <Comments videoId={id} />
                        </motion.div>

                    </div>
                </div>

                {/* Sidebar - Related Videos */}
                <div className="lg:w-[350px] xl:w-[400px] shrink-0 min-w-0">
                    <h3 className="text-lg font-bold mb-4 px-1 flex items-center gap-2">
                        <span className="h-4 w-1 bg-primary rounded-full"></span>
                        Related Videos
                    </h3>
                    <div className="flex flex-col gap-6">
                        {isLoadingRelated ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="skeleton aspect-video w-full rounded-xl"></div>
                                    <div className="skeleton h-4 w-full rounded-lg"></div>
                                </div>
                            ))
                        ) : (
                            relatedVideos?.items?.map((item: Item, index: number) => (
                                <div key={index}>
                                    {item.id.videoId && <VideoCard video={item} />}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default VideoDetails;
