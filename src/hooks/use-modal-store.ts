
import { create } from "zustand"
interface ModalStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onclose: () => void
}
 const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  onclose: () => set({ isOpen: false }),
}))

export default useModalStore