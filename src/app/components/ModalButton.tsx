"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useUserModal } from "@/hooks/use-modal-store";
import * as Dialog from '@radix-ui/react-dialog';
import { Edit, EditIcon } from "lucide-react";
import { EditForm } from "./EditForm";
import { User } from "@prisma/client";
import { set } from "date-fns";
interface ModalButtonProps {
  user: User
}

export default function ModalButton({user}:ModalButtonProps) {
    const { isOpen, setIsOpen,onclose } = useUserModal()
    const {setUser} = useCurrentUser()
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="cursor-pointer z-20">
        <div className="flex items-center justify-end w-full cursor-pointer">
          <Button className="w-28 flex  h-8 rounded-full hover:bg-white/50 cursor-pointer" onClick={() => setUser(user)}>
          
          Edit Profile
          </Button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-sm fixed inset-0 z-20 bg-neutral-900/50" />
        <Dialog.DialogContent
          className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[90vh] w-full md:w-[100vw] md:max-w-[900px]
        translate-x-[-50%] translate-y-[-50%] rounded-md p-[25px] text-neutral-800 dark:bg-neutral-900 z-30 foxus-outline-none overflow-scroll"
        >
          <Dialog.DialogTitle className="text-lg font-medium text-white dark:text-white text-center py-2">
            Edit Profile
          </Dialog.DialogTitle>
          <div>
            <EditForm />
          </div>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}