import CommentCard from "./CommentCard";
import type { BlogComment } from "@/lib/types/comments";

interface CommentListProps {
  comments: BlogComment[];
  loggedIn?: boolean;
}

export default function CommentList({ comments, loggedIn = false }: CommentListProps) {
  // Group comments by parent (replies under their parents)
  const parentComments = comments.filter((comment) => !comment.parentId);
  const replyMap = new Map<string, BlogComment[]>();

  comments.forEach((comment) => {
    if (comment.parentId) {
      if (!replyMap.has(comment.parentId)) {
        replyMap.set(comment.parentId, []);
      }
      replyMap.get(comment.parentId)!.push(comment);
    }
  });

  return (
    <ul>
      {parentComments.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} loggedIn={loggedIn} />

          {/* Render replies if any */}
          {replyMap.has(comment.id) && (
            <ul>
              {replyMap.get(comment.id)!.map((reply) => (
                <CommentCard key={reply.id} comment={reply} isReply={true} loggedIn={loggedIn} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </ul>
  );
}
