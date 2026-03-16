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
