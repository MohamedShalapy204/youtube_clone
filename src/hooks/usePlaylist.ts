import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { type PlaylistItemsResponse, type PlaylistsResponse } from "../types";

export const usePlaylist = (id: string | undefined) => {
    const playlistQuery = useQuery<PlaylistsResponse>({
        queryKey: ['playlist', id],
        queryFn: () => fetchFromAPI(`playlists?part=snippet&id=${id}`),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    const itemsQuery = useQuery<PlaylistItemsResponse>({
        queryKey: ['playlistItems', id],
        queryFn: () => fetchFromAPI(`playlistItems?part=snippet&playlistId=${id}&maxResults=50`),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    return {
        playlist: playlistQuery.data?.items?.[0],
        items: itemsQuery.data?.items,
        isLoading: playlistQuery.isLoading || itemsQuery.isLoading,
        isError: playlistQuery.isError || itemsQuery.isError,
        error: playlistQuery.error || itemsQuery.error,
    };
};
