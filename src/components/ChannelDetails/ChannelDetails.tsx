import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import ChannelCard from "../Feed/ChannelCard";
import ItemsLayout from "../Feed/ItemsLayout";
import { motion } from "motion/react";

const ChannelDetails = () => {
    const { id } = useParams();

    const { data: channelDetail, isLoading: isLoadingChannel, isError: isErrorChannel } = useQuery({
        queryKey: ['channel', id],
        queryFn: () => fetchFromAPI(`channels?part=snippet,statistics&id=${id}`),
        enabled: !!id,
    });

    const { data: videos, isLoading: isLoadingVideos, isError: isErrorVideos } = useQuery({
        queryKey: ['channelVideos', id],
        queryFn: () => fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`),
        enabled: !!id,
    });

    if (isLoadingChannel || isLoadingVideos) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isErrorChannel || isErrorVideos) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error">Oops! Something went wrong.</h2>
                    <p className="mt-2 text-base-content/60">Failed to load channel details or videos.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col gap-6 min-h-[95vh]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <div
                    className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-full rounded-2xl shadow-2xl bg-linear-to-r from-base-300 to-primary z-10"
                />
                <div className="mt-[-93px]">
                    <ChannelCard channelDetail={channelDetail?.items[0]} marginTop="0" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-2"
            >
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-base-content border-b border-primary/20 pb-2 inline-block">
                        Videos
                    </h2>
                </div>
                <ItemsLayout items={videos?.items} />
            </motion.div>
        </div>
    );
}

export default ChannelDetails;
