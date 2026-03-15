import { Link } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { demoProfilePicture, demoChannelTitle, demoChannelUrl } from "../../utils/constants";
import { motion } from "motion/react";

interface ChannelCardProps {
    channelDetail: {
        id: {
            channelId?: string;
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
        };
        statistics?: {
            subscriberCount?: string;
        };
    };
    marginTop?: string;
}

const ChannelCard = ({ channelDetail, marginTop }: ChannelCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`flex flex-col items-center justify-center gap-4 w-full h-[326px] ${marginTop}`}
        >
            <Link to={channelDetail?.id?.channelId ? `/channel/${channelDetail?.id?.channelId}` : demoChannelUrl} className="flex flex-col items-center gap-4">
                <div className="relative h-44 w-44 overflow-hidden rounded-full border border-base-300 shadow-xl transition-transform duration-500 hover:scale-105">
                    <img
                        src={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                        alt={channelDetail?.snippet?.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-1">
                        <h3 className="text-lg font-bold text-base-content">
                            {channelDetail?.snippet?.title || demoChannelTitle}
                        </h3>
                        <MdCheckCircle className="text-primary text-sm" />
                    </div>

                    {channelDetail?.statistics?.subscriberCount && (
                        <p className="text-sm font-medium text-base-content/60">
                            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
                        </p>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default ChannelCard;
