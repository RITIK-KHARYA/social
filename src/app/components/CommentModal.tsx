"use client";
import * as Dialog from '@radix-ui/react-dialog';
import { FaRegCommentDots } from "react-icons/fa";
interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  totalcomments: number;
}
export const CommentModal = ({  isOpen, onClose, setIsOpen, children ,totalcomments}: CommentModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400 justify-center px-2 py-2 h-12 w-12">
          <FaRegCommentDots height={20} width={20} className="h-6 w-6" />
          <p className='text-xs text-gray-500 dark:text-gray-400'>{totalcomments}</p>
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
          {children}
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
    