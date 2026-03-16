import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { type Item } from "../types";

export const useLibrary = () => {
    const historyQuery = useQuery<{ items: Item[] }>({
        queryKey: ['libraryHistory'],
        queryFn: () => fetchFromAPI('search', { part: 'snippet', q: 'new tech', type: 'video', maxResults: '4' }),
        staleTime: 1000 * 60 * 5,
    });

    const playlistsQuery = useQuery<{ items: Item[] }>({
        queryKey: ['libraryPlaylists'],
        queryFn: () => fetchFromAPI('search', { part: 'snippet', q: 'popular playlists', type: 'playlist', maxResults: '3' }),
        staleTime: 1000 * 60 * 5,
    });

    return {
        historyVideos: historyQuery.data?.items || [],
        playlists: playlistsQuery.data?.items || [],
        isLoading: historyQuery.isLoading || playlistsQuery.isLoading,
        isError: historyQuery.isError || playlistsQuery.isError,
        error: historyQuery.error || playlistsQuery.error,
    };
};
