"use server";
import { prisma } from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createLike = async (postId:string, userId:string | undefined, authorId:string | undefined) => {
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (userId === undefined || authorId === undefined) {
    return
  }
  const likedPost = await prisma.like.create({
    data: {
      postId: postId,
      userId: userId,
    },
  });
  const notification = await prisma.notification.create({
    data: {
      userid: user.id,
      toUserId: authorId,
      content: " liked your post",
    },
  });
  revalidatePath("/home");
};
export const deleteLike = async (postId:string, userId:string | undefined) => {
    
    const user = await currentUser();
    if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

  
    const dislikedPost = await prisma.like.deleteMany({
        where: {
            postId: postId,
            userId: userId,
        },
    });
       revalidatePath("/home")
}