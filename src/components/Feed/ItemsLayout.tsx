import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import PlaylistCard from "./PlaylistCard";

interface ItemsLayoutProps {
    items: any[];
}

const ItemsLayout = ({ items }: ItemsLayoutProps) => {
    if (!items?.length) return null;
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {items.map((item, index) => (
                <div key={index} className="w-full">
                    {item.id.videoId && <VideoCard video={item} />}
                    {item.id.channelId && <ChannelCard channelDetail={item} />}
                    {item.id.playlistId && <PlaylistCard playlist={item} />}
                </div>
            ))}
        </div>
    );
}

export default ItemsLayout;