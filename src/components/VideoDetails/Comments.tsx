import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useComments } from '../../hooks/useComments';
import CommentItem from './CommentItem';

interface CommentsProps {
    videoId: string;
}

const Comments: React.FC<CommentsProps> = ({ videoId }) => {
    const [newComment, setNewComment] = useState('');
    const { comments, totalResults, isLoading, addComment, isAdding } = useComments(videoId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addComment(newComment);
        setNewComment('');
    };

    if (isLoading) {
        return (
            <div className="mt-8">
                <div className="skeleton h-8 w-32 mb-6"></div>
                <div className="flex gap-4 mb-8">
                    <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                    <div className="skeleton h-12 w-full rounded-2xl"></div>
                </div>
                <div className="flex flex-col gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="skeleton h-4 w-32"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 text-base-content">
                {totalResults.toLocaleString()} Comments
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex shrink-0 items-center justify-center text-primary font-bold">
                    G
                </div>
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-transparent border-b border-base-content/20 focus:border-base-content outline-none pb-2 transition-colors disabled:opacity-50"
                        disabled={isAdding}
                    />
                    {newComment.trim() && (
                        <button
                            type="submit"
                            disabled={isAdding}
                            className="absolute right-0 bottom-2 text-primary hover:text-primary-focus transition-colors disabled:opacity-50"
                        >
                            <MdSend className="text-xl" />
                        </button>
                    )}
                </div>
            </form>

            {/* Comments List */}
            <div className="flex flex-col gap-6">
                {comments.map((commentThread) => (
                    <CommentItem key={commentThread.id} commentThread={commentThread} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
