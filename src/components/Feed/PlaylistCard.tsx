import { Link } from "react-router-dom";
import { MdCheckCircle, MdPlaylistPlay } from "react-icons/md";
import { demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle, demoThumbnailUrl } from "../../utils/constants";
import { motion } from "motion/react";

interface PlaylistCardProps {
    playlist: {
        id: {
            playlistId?: string;
        };
        snippet: {
            title: string;
            thumbnails: {
                high: {
                    url: string;
                };
            };
            channelId: string;
            channelTitle: string;
            publishedAt: string;
        };
    };
}

const PlaylistCard = ({ playlist: { id: { playlistId }, snippet } }: PlaylistCardProps) => {

    const formattedDate = new Date(snippet?.publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="group flex flex-col gap-3 w-full"
        >
            <Link to={playlistId ? `/playlist/${playlistId}` : demoVideoUrl} className="relative aspect-video overflow-hidden rounded-xl bg-base-300">
                <img
                    src={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                    alt={snippet?.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Playlist overlay */}
                <div className="absolute inset-y-0 right-0 w-1/3 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1 text-white">
                    <MdPlaylistPlay className="text-3xl" />
                    <span className="text-xs font-bold uppercase tracking-wider">Playlist</span>
                </div>

                <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <div className="flex gap-3 px-1">
                <div className="flex flex-col gap-1 overflow-hidden">
                    <Link to={playlistId ? `/playlist/${playlistId}` : demoVideoUrl}>
                        <h3 className="line-clamp-2 text-sm font-semibold text-base-content group-hover:text-primary transition-colors leading-snug">
                            {snippet?.title || demoVideoTitle}
                        </h3>
                    </Link>

                    <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                        <div className="flex items-center gap-1 text-xs font-medium text-base-content/60 hover:text-base-content transition-colors">
                            <span className="truncate max-w-[150px]">{snippet?.channelTitle || demoChannelTitle}</span>
                            <MdCheckCircle className="text-primary text-[10px]" />
                        </div>
                    </Link>

                    <div className="text-[11px] font-medium text-base-content/40">
                        Created {formattedDate}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default PlaylistCard;
