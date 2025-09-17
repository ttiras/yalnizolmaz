import CommentCard from "./CommentCard";
import type { BlogComment } from "@/lib/types/comments";

interface CommentListProps {
  comments: BlogComment[];
  loggedIn?: boolean;
}

export default function CommentList({ comments, loggedIn = false }: CommentListProps) {
  // Replies are not shown; only top-level comments
  const topLevel = comments.filter((c) => !c.parentId);
  return (
    <ul>
      {topLevel.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} loggedIn={loggedIn} />
        </div>
      ))}
    </ul>
  );
}
