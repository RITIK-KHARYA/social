import prisma from "@/db/db.config"
import { currentUser } from "@clerk/nextjs/server"

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest,response: NextResponse) {
    const user = await currentUser()
    if(!user){
        return NextResponse.json({ message: "You must be logged in to comment." })
    }
    
    const {data,postid} = await request.json()
    console.log(data)
    console.log(postid)
    const comment = await prisma.comment.create({
        data: {
            content: data.comment,
            postId: postid,
            userId: user.id
        }
    })
    return NextResponse.json({ status: 200, message: "Comment added successfully." })
}