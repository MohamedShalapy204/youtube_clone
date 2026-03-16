import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { usePlaylist } from "../../hooks/usePlaylist";
import ItemsLayout from "../Feed/ItemsLayout";

const PlaylistDetails = () => {
    const { id } = useParams();
    const { playlist, items, isLoading, isError, error } = usePlaylist(id);

    if (isError) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error">Oops! Something went wrong.</h2>
                    <p className="mt-2 text-base-content/60">{(error as Error).message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <header className="flex flex-col gap-2 px-2">
                <h1 className="text-3xl font-bold text-base-content">
                    {playlist?.snippet?.title || "Playlist Videos"}
                </h1>
                {playlist?.snippet?.channelTitle && (
                    <p className="text-sm font-medium text-base-content/60">
                        Channel: <span className="text-primary">{playlist.snippet.channelTitle}</span>
                    </p>
                )}
                {playlist?.snippet?.description && (
                    <p className="mt-2 max-w-3xl text-sm text-base-content/70 line-clamp-3">
                        {playlist.snippet.description}
                    </p>
                )}
            </header>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-4 w-full">
                            <div className="skeleton aspect-video w-full rounded-xl"></div>
                            <div className="flex gap-3">
                                <div className="skeleton h-9 w-9 shrink-0 rounded-full"></div>
                                <div className="flex w-full flex-col gap-2">
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ItemsLayout items={items?.map(item => ({
                        id: { videoId: item.snippet.resourceId.videoId },
                        snippet: item.snippet
                    })) || []} />
                </motion.div>
            )}
        </div>
    );
}

export default PlaylistDetails;
