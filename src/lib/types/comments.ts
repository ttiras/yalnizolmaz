export type BlogCommentAuthor = {
  id: string;
  displayName: string;
  avatarUrl?: string | null;
};

export type BlogComment = {
  id: string;
  slug: string; // blog slug this comment belongs to
  body: string;
  author: BlogCommentAuthor;
  createdAt: string; // ISO
  likeCount: number;
  parentId?: string | null; // 1-level reply
};

export type CommentsSectionProps = {
  slug: string;
  totalCount: number;
  initialComments: BlogComment[]; // 3–5 latest for preview
  loggedIn?: boolean;
};

export type CommentComposerProps = {
  slug: string;
  parentId?: string;
  onSubmitted?: (comment: BlogComment) => void;
};

export type HelpfulButtonProps = {
  commentId: string;
  initialLiked?: boolean;
  initialCount: number;
  onToggle?: (liked: boolean) => void;
};

export type LoadMoreButtonProps = {
  slug: string;
  alreadyLoadedIds: string[];
  onLoaded: (more: BlogComment[]) => void;
};
