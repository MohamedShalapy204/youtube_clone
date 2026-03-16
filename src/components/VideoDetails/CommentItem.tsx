import React, { useState } from 'react';
import { MdThumbUp } from 'react-icons/md';
import { type CommentThread } from '../../types';

interface CommentItemProps {
    commentThread: CommentThread;
}

const CommentItem: React.FC<CommentItemProps> = ({ commentThread }) => {
    const [showFullComment, setShowFullComment] = useState(false);
    const comment = commentThread.snippet.topLevelComment.snippet;

    return (
        <div className={`flex gap-4 ${commentThread.etag === 'optimistic' ? 'opacity-50' : ''}`}>
            <div className="shrink-0 pt-1">
                <img
                    src={comment.authorProfileImageUrl}
                    alt={comment.authorDisplayName}
                    className="w-10 h-10 rounded-full object-cover bg-base-300"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://ui-avatars.com/api/?name=User&background=random";
                    }}
                />
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-base-content">
                        {comment.authorDisplayName}
                    </span>
                    <span className="text-xs text-base-content/60">
                        {new Date(comment.publishedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <p className={`text-sm text-base-content/90 whitespace-pre-wrap transition-all ${showFullComment ? '' : 'line-clamp-3'}`}>
                    {comment.textDisplay}
                </p>
                <button
                    onClick={() => setShowFullComment(!showFullComment)}
                    className="text-primary text-xs font-bold my-1 hover:underline text-left inline-block self-start"
                >
                    {showFullComment ? "Show less" : "Read more"}
                </button>
                <div className="flex items-center gap-4 text-sm text-base-content/60 mt-1">
                    <button className="flex items-center gap-1 hover:bg-base-200/50 p-1.5 rounded-full transition-colors">
                        <MdThumbUp className="text-lg" />
                        {comment.likeCount > 0 && <span className="text-xs">{comment.likeCount}</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
