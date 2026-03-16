import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { type CommentsResponse } from "../types";

export const useComments = (videoId: string | undefined) => {
    return useQuery<CommentsResponse>({
        queryKey: ['videoComments', videoId],
        queryFn: () => fetchFromAPI(`commentThreads?part=snippet&videoId=${videoId}&maxResults=100`),
        enabled: !!videoId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
