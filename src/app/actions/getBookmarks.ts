import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, unstable_noStore } from "next/cache";
import { headers } from "next/headers";

export const getBookmarks = async () => {
  unstable_noStore()
   const user = await currentUser();
   if (!user) {
     return Response.json({
       message: "You must be logged in to view bookmarks.",
     });
   }
   const bookmarks = await prisma.bookmark.findMany({
     where: {
       userId: user.id,
     },
     include: {
       post: {
         include: {
           author: true,
           comments: true,
           likes: true,
           bookmarks: true,
         },
       },
     },
   });
  

  return bookmarks
};