import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request, res:NextResponse){
    const user = await currentUser()
    if(!user) {
       return NextResponse.json({ message: "You must be logged in to post" })
    }
   
    const {content ,image} = await req.json()
    console.log(content)
    const newPost= await prisma.post.create({
        data: {
            content: content,
            authorId: user.id,
            image:image ?? null,
            
        },
    })

    return NextResponse.json({ message: "Post created" })
}
export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "You must be logged in to view posts" });
  }
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      likes: true,
      comments: true,
      bookmarks: true,
    },
  });
  
  console.log(posts)
  return NextResponse.json({
  status:200,
  data: posts
  })
}