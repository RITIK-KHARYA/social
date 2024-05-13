import prisma from "@/db/db.config";
import { revalidatePath, unstable_noStore } from "next/cache";
import { headers } from "next/headers";

export const getPosts = async () => {
   unstable_noStore();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/post`, {
    cache: "no-cache",
    headers: headers(),
  })
  const post = await res.json()
  revalidatePath("/home")
  return post?.data
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
  revalidatePath("/home/profile/" + userId)
  return otherUser
};
