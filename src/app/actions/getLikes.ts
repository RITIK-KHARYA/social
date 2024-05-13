import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export const getLikes = async () => {
   unstable_noStore();
    const user = await currentUser()
    if(!user){
        return null
    }
   const likedPosts = await prisma.post.findMany({
     where: {
       likes: {
         some: {
           userId: user?.id,
         },
       },
     },
     include: {
       author: true,
       likes: true,
       bookmarks: true,
       comments: true,
     },
   });
   
    revalidatePath("/home/profile")
    return likedPosts
};
export const getOtherUserLikes = async (userId: string) => {
  unstable_noStore();
  const likedPosts = await prisma.post.findMany({
    where: {
      likes: {
        some: {
          userId: userId,
        },
      },
    },

     include: {
       author: true,
       likes: true,
       bookmarks: true,
       comments: true,
     },
   });
   return likedPosts
};