"use client";

import useModalStore from "@/hooks/use-modal-store";
import { CommentModal } from "./CommentModal";
import { CommentForm } from "./CommentForm";
import { Post, User, Like } from "@prisma/client";
interface CommentFormProps {
  post: Post & { author: User } & { likes: Like[] };
  postId: string;
  totalcomments: number;
}
export default function UserInteract({post,postId,totalcomments}: CommentFormProps) {
    const {isOpen, setIsOpen,onclose} = useModalStore();
  return (
    <>
      <CommentModal isOpen={isOpen} onClose={onclose} setIsOpen={setIsOpen} totalcomments={totalcomments}>
        <CommentForm postId={postId} post={post} />
      </CommentModal>
    </>
  );

}