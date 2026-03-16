import { MdThumbUp } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { type Comment as CommentType } from "../../types";

interface CommentProps {
    comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
    const {
        snippet: {
            authorDisplayName,
            authorProfileImageUrl,
            textDisplay,
            likeCount,
            publishedAt,
        },
    } = comment;

    return (
        <div className="flex gap-4 group">
            <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                    <img src={authorProfileImageUrl} alt={authorDisplayName} />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-base-content whitespace-nowrap overflow-hidden text-ellipsis">
                        @{authorDisplayName.replace(/\s+/g, '').toLowerCase()}
                    </span>
                    <span className="text-xs text-base-content/60">
                        {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
                    </span>
                </div>
                <p
                    className="text-sm text-base-content/90 leading-relaxed wrap-break-word whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: textDisplay }}
                />
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:bg-base-content/10 px-2 py-1 rounded-full transition-colors">
                        <MdThumbUp className="text-sm" />
                        <span className="text-xs font-medium">{likeCount > 0 ? likeCount.toLocaleString() : ""}</span>
                    </div>
                    <button className="text-xs font-bold hover:bg-base-content/10 px-3 py-1 rounded-full transition-colors">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
