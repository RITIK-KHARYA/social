import prisma from "@/db/db.config";
import { unstable_noStore } from "next/cache";

export const getOtherUser = async (userId: string) => {
    unstable_noStore()
  const otherUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include:{
      followers: true,
      followings: true,
    }
  });
  return otherUser
};