"use server";
import { prisma } from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { revalidate } from "../home/profile/[profileId]/page";
import { revalidatePath } from "next/cache";


export async function createPost(data: any) {
     const user = await currentUser();
     if (!user) {
       return
     }

     const newPost = await prisma.post.create({
       data: {
         content: data.content,
         authorId: user.id,
         image: data.image ?? null,
       },
     });

     revalidatePath("/home");

    return ;
}