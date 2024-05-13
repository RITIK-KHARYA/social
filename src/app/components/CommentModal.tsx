"use client";
import { usePostStore } from "@/hooks/use-modal-store";
import { Post, User, Like,Comment } from "@prisma/client";
import * as Dialog from '@radix-ui/react-dialog';
import { set } from "date-fns";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  totalcomments: number;
  post: Post & { author: User } & { likes: Like[] }& {comments: Comment[]};
  postId: string;
}
export const CommentModal = ({  isOpen, onClose, setIsOpen, children ,totalcomments,post,postId}: CommentModalProps) => {
  const { setPostId,setPostData,postid,postData } = usePostStore();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div
          className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400 justify-center px-2 py-2 h-12 w-12"
          onClick={() => {
            setPostId(postId);
            setPostData(post);
          }}
        >
          <FaRegCommentDots height={20} width={20} className="h-6 w-6" />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {totalcomments}
          </p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-sm fixed inset-0 z-20 bg-neutral-900/50 " />
        <Dialog.DialogContent
          className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px]
        translate-x-[-50%] translate-y-[-50%] rounded-md p-[25px] text-neutral-800 dark:bg-neutral-900 z-30 foxus-outline-none"
        >
          <Dialog.DialogTitle className="text-lg font-medium text-white dark:text-white text-center py-2">
            Add Comment
          </Dialog.DialogTitle>

          <div className="flex flex-col gap-y-4 bg- p-4 rounded-md bg-neutral-950">
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-1">
                <div className="flex  gap-x-1">
                  <div className="flex flex-row gap-x-2">
                    <Image
                      src={postData?.author?.image || "/images/images.png"}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-white">
                      {postData?.author?.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {"@" + postData?.author?.username}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-slate-300">{postData?.content}</p>
                </div>
              </div>
            </div>
          </div>
          {children}
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
    