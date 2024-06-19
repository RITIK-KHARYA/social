"use server";
import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export const createComments = async (data: {
    comment: string;
}, postid: string | null, authorId: string | undefined) => {
  const user = await currentUser();
  if (!user) {
    return Response.json({
      message: "You must be logged in to comment.",
    });
  }
  if(postid ===null || authorId === undefined){
    return 
  }


  const comment = await prisma.comment.create({
    data: {
      content: data.comment,
      postId: postid,
      userId: user.id,
    },
  });
  const notification = await prisma.notification.create({
    data: {
      userid: user.id,
      toUserId: authorId,
      content: "someone commented on your post",
    },
  });
  revalidatePath("/home");
};