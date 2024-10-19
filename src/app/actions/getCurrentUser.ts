
import prisma from "@/db/db.config"
import { currentUser } from "@clerk/nextjs/server"
import { unstable_noStore } from "next/cache";

export const getCurrentUser = async () => {
   unstable_noStore();
  const user = await currentUser()
   if (!user) {
     return null;
   }
  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include:{
      followers: true,
      followings: true
    }
  })
 
  return profile
}