import prisma from "@/db/db.config"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST( request: NextRequest,response: NextResponse) {
    const user = await currentUser()
    if(!user){
        return NextResponse.json({ message: "You must be logged in to bookmark." })
    }
    const { postId,userId } = await request.json()
      console.log(postId, userId);
    const bookmark = await prisma.bookmark.create({
        data: {
            postId: postId,
            userId: userId,
        },
    })
    return NextResponse.json({ status: 200, message: "Bookmark added successfully." })
}

export async function DELETE(request: NextRequest,response: NextResponse) {
    const user = await currentUser()    
    if(!user){
        return NextResponse.json({ message: "You must be logged in to bookmark." })
    }
    const { postId,userId } = await request.json()
    console.log(postId,userId)
   
    const deleted = await prisma.bookmark.deleteMany({
        where: {
            postId: postId,
            userId: userId,
        },
    })
    return NextResponse.json({ status: 200, message: "Bookmark deleted successfully." })
}

export async function GET(request: NextRequest) {
    const user = await currentUser()    
    if(!user){
        return NextResponse.json({ message: "You must be logged in to view bookmarks." })
    }
    const bookmarks = await prisma.bookmark.findMany({
        where:{
            userId: user.id,
        },
        include:{   
            post: {
                include: {
                    author: true,
                    comments: true,
                    likes: true,
                    bookmarks: true,
                },
            }
           
        },
    })
    return NextResponse.json({
        status: 200,
        data: bookmarks,
    })
}