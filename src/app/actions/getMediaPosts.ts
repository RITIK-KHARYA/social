"use server";
import prisma from "@/db/db.config"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath, unstable_noStore } from "next/cache"

export const getMediaPosts = async () => {
     unstable_noStore()
    const user = await currentUser()
    if(!user){  
        return null
    }
    const posts = await prisma.post.findMany({
        where: {
            authorId: user?.id,
            image: {
                not: "",
            } 
        },
        include: {
            author: true,
            comments: true,
            likes: true,
            bookmarks: true,
        },
    })
    revalidatePath("/home/profile")
    return posts
}

export const getOtherUserMediaPosts = async (userId: string) => {
  unstable_noStore();
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      image: {
        not: "",
      },
      
    },
    include: {
      author: true,
      comments: true,
      likes: true,
      bookmarks: true,
    },
  })
  return posts
}