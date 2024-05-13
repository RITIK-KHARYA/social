import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath, unstable_noStore } from "next/cache";

export const getComments = async () => {
     unstable_noStore();
    const user = await currentUser();
    if(!user){
        return null
    }
    const comments = await prisma.comment.findMany({
        where:{
            userId: user?.id,
        },
        include:{
            post:true,
            user:true,
        }
        
    })
    revalidatePath("/home/profile")
    return comments

}

export const getOtherUserComments = async (userId: string) => {
  unstable_noStore();
  const comments = await prisma.comment.findMany({
    where: {
      userId: userId,
    },
    include: {
      post: true,
      user: true,
    },
  });
  revalidatePath("/home/profile/" + userId);
  return comments;
};