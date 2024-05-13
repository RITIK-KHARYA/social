import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const {  postId, userId,authorId } = await request.json();
    const likedPost = await prisma.like.create({
        data: {
            postId: postId,
            userId: userId,
        },
    });
    const notification = await prisma.notification.create({
        data: {
             userid : user.id,
             toUserId: authorId,
            content: "someone liked your post",
        },
    });
    return NextResponse.json({ message: "Liked" });
}


export async function DELETE(request: NextRequest, response: NextResponse) {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(request.body);

    const {postId,userId } = await request.json();
    const dislikedPost = await prisma.like.deleteMany({
        where: {
            postId: postId,
            userId: userId,
        },
    });
    return NextResponse.json({ message: "disliked" });
}