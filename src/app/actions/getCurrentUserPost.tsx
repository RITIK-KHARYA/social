"use server";
import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, unstable_noStore } from "next/cache";
import { headers } from "next/headers";

export const getCurrentUserPost = async () => {
   unstable_noStore();
    const user = await currentUser()
    if(!user){
        return null
    }
  const posts = await prisma.post.findMany({
    where: {
      authorId: user?.id,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
      bookmarks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  revalidatePath("/home/profile")
  return posts
};

export const getOtherUserPost = async (userId: string) => {
  unstable_noStore();
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
      bookmarks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return posts
};
