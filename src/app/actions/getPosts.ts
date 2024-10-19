import prisma from "@/db/db.config";
import { revalidatePath, unstable_noStore } from "next/cache";
import { headers } from "next/headers";

export const getPosts = async () => {
   unstable_noStore();

  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      likes: true,
      comments: true,
      bookmarks: true,
    },
  });
  return post
};

export const getOtherUserPost = async (userId: string) => {
  unstable_noStore();
   const otherUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: true,
      bookmarks: true,
      comments: true,
      likes: true,
    },
  });
  return otherUser
};
