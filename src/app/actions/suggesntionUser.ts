import prisma from "@/db/db.config";
import {  currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const suggesntionUser = async () => {
    const user = await currentUser();
    if(!user){
        return Response.json({
            message: "You must be logged in to comment.",
        });
    }
  const suggested = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      }
    },
  });

    return suggested 
  }
  

