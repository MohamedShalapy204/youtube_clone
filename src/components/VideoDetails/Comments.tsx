import { useComments } from "../../hooks/useComments";
import Comment from "./Comment";
import { type CommentThread } from "../../types";

interface CommentsProps {
    videoId: string | undefined;
}

const Comments = ({ videoId }: CommentsProps) => {
    const { data, isLoading, error } = useComments(videoId);

    if (isLoading) {
        return (
            <div className="mt-8 space-y-6">
                <div className="skeleton h-6 w-32 rounded-lg"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            <div className="skeleton h-4 w-1/4 rounded-lg"></div>
                            <div className="skeleton h-4 w-full rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) return null;

    const totalComments = data?.pageInfo?.totalResults || 0;
    const comments = data?.items || [];

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                {totalComments.toLocaleString()} Comments
            </h3>

            <div className="flex flex-col gap-8">
                {comments.map((thread: CommentThread) => (
                    <Comment
                        key={thread.id}
                        comment={thread.snippet.topLevelComment}
                    />
                ))}
            </div>

            {comments.length === 0 && (
                <div className="text-center py-10 text-base-content/60">
                    No comments for this video.
                </div>
            )}
        </div>
    );
};

export default Comments;
