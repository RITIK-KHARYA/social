import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest, response:NextResponse) {
 unstable_noStore()
 const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
   const {userId} = await request.json();
 const follow = await prisma.follow.create({
    data: {
      followerId: userId,
      followingId: user.id
    },
  });
   const notification = await prisma.notification.create({
     data: {
       userid: user.id,
       toUserId: userId,
       content: "someone followed you",
     },
   });

  return NextResponse.json({ message: "Followed" });

}
export async function DELETE(request:NextRequest, response:NextResponse) {
 unstable_noStore()
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const {userId} = await request.json();
  console.log(userId)
  

  const follow = await prisma.follow.deleteMany({
    where: {
      followerId: userId,
      followingId: user.id,
    },
  });

  return NextResponse.json({ message: "Unfollowed" });

}