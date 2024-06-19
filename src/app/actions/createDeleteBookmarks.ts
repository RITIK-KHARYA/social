"use server";
import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createBookmark = async (postId:string, userId:string | undefined) => {
  const user = await currentUser();
  if (!user) {
    return Response.json({
      message: "You must be logged in to bookmark.",
    });
  }
  if ( !userId) {
    return Response.json({
      message: "Post id and user id are required.",
    });
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      postId: postId,
      userId: userId,
    },
  });
   revalidatePath("/home");
};

export const deleteBookmark = async (postId:string, userId:string | undefined) => {
     const user = await currentUser();
     if (!user) {
       return Response.json({
         message: "You must be logged in to bookmark.",
       });
     }
     if (!userId) {
       return Response.json({
         message: "Post id and user id are required.",
       });
    }
     const deleted = await prisma.bookmark.deleteMany({
       where: {
         postId: postId,
         userId: userId,
       },
     });
     revalidatePath("/home");
    
}