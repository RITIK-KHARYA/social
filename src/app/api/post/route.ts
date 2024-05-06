import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request, res:NextResponse){
    const user = await currentUser()
    if(!user) {
       return NextResponse.json({ message: "You must be logged in to post" })
    }
   
    const {content} = await req.json()
    console.log(content)
    const newPost= await prisma.post.create({
        data: {
            content: content,
            authorId: user.id,
        },
    })

    return NextResponse.json({ message: "Post created" })
}