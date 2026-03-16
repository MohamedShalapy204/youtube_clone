export interface Item {
    id: {
        videoId?: string;
        channelId?: string;
        playlistId?: string;
    };
    snippet: {
        title: string;
        description?: string;
        thumbnails: {
            high: {
                url: string;
            };
            medium?: {
                url: string;
            };
            default?: {
                url: string;
            };
        };
        channelId: string;
        channelTitle: string;
        publishedAt: string;
    };
    statistics?: {
        viewCount: string;
        likeCount: string;
    };
}

export interface CommentSnippet {
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
        value: string;
    };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
}

export interface Comment {
    kind: string;
    etag: string;
    id: string;
    snippet: CommentSnippet;
}

export interface CommentThreadSnippet {
    channelId: string;
    videoId: string;
    topLevelComment: Comment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
}

export interface CommentThread {
    kind: string;
    etag: string;
    id: string;
    snippet: CommentThreadSnippet;
}

export interface CommentsResponse {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    nextPageToken?: string;
    items: CommentThread[];
}

export interface PlaylistSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        high: { url: string; width: number; height: number };
        standard?: { url: string; width: number; height: number };
        maxres?: { url: string; width: number; height: number };
    };
    channelTitle: string;
    localized: {
        title: string;
        description: string;
    };
}

export interface Playlist {
    kind: string;
    etag: string;
    id: string;
    snippet: PlaylistSnippet;
    contentDetails?: {
        itemCount: number;
    };
}

export interface PlaylistItemSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        high: { url: string; width: number; height: number };
        standard?: { url: string; width: number; height: number };
        maxres?: { url: string; width: number; height: number };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
        kind: string;
        videoId: string;
    };
}

export interface PlaylistItem {
    kind: string;
    etag: string;
    id: string;
    snippet: PlaylistItemSnippet;
}

export interface PlaylistItemsResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: PlaylistItem[];
}

export interface PlaylistsResponse {
    kind: string;
    etag: string;
    items: Playlist[];
}
