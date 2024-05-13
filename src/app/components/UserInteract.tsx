"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { CommentModal } from "./CommentModal";
import { CommentForm } from "./CommentForm";
import { Post, User, Like,Comment } from "@prisma/client";
interface CommentFormProps {
  post: Post & { author: User } & { likes: Like[] }& {comments: Comment[]};
  postId: string;
  totalcomments: number;
  authorId: string | undefined;
}
export default function UserInteract({post,postId,totalcomments,authorId}:CommentFormProps) {

    const {isOpen, setIsOpen,onclose} = useModalStore();
  return (
    <>

      <CommentModal isOpen={isOpen} onClose={onclose} setIsOpen={setIsOpen} totalcomments={totalcomments} post={post} postId={postId}>
        <CommentForm postId={postId} post={post}  authorId={authorId} />
      </CommentModal>
    </>
  );

}