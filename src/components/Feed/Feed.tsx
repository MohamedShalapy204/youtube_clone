import { useSelector } from "react-redux";
import { type RootState } from "../../Redux/store";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../../utils/fetchFromApi";
import ItemsLayout from "./ItemsLayout";
import { motion } from "motion/react";
import Sidebar from "../Sidebar";

const Feed = () => {
    const selectedCategory = useSelector((state: RootState) => state.sidebar.selectedCategory);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['videos', selectedCategory],
        queryFn: () => {
            const queryType = selectedCategory === 'Playlists' ? '&type=playlist' : '';
            return fetchFromAPI(`search?part=snippet&q=${selectedCategory}${queryType}`);
        },
        staleTime: 1000 * 60 * 5,
    });

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
        <div className="flex gap-2">
            <Sidebar />
            <div className="flex-1 flex flex-col gap-6 p-4">
                <header className="flex items-center gap-3 px-2">
                    <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
                        <span className="text-primary">{selectedCategory}</span>
                        <span className="text-xl font-medium text-base-content/40">Videos</span>
                    </h1>
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
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ItemsLayout items={data?.items || []} />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Feed;
