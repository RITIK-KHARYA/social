
import { Post, User, Like,Comment } from "@prisma/client";
import { create } from "zustand"
interface ModalStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onclose: () => void
}
interface userProps {
  user: User
  setUser: (user: User) => void
}
interface PostStore {
  postid: string | null,
  postData: (Post & {author : User} & {likes: Like[]} & {comments: Comment[]}) | null
  setPostId: (postId: string) => void
  setPostData: (postData: (Post & {author : User} & {likes: Like[]} & {comments: Comment[]})) => void
}
 export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  onclose: () => set({ isOpen: false }),
}))

export const usePostStore = create<PostStore>((set) => ({
  postid:"",
  postData: {} as (Post & {author : User} & {likes: Like[]} & {comments: Comment[]}),
  setPostId: (postId: string) => set({ postid: postId }),
  setPostData: (postData: (Post & {author : User} & {likes: Like[]} & {comments: Comment[]})) => set({ postData }),

}))

export const useUserModal= create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  onclose: () => set({ isOpen: false }),
}))
export const useCurrentUser = create<userProps>((set) => ({
  user: {} as User,
  setUser: (user: User) => set({ user }),
}))
