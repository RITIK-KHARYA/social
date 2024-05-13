import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,response:NextResponse) {
    const user = await currentUser()
    if(!user){
        return NextResponse.json({ message: "Unauthorized" })
    }
    const {data} = await request.json()
    console.log(data)
    const { name, username, header, avatar, bio } = data
    console.log(user)
    const me = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: name,
            username: username,
            header:header,
            image: avatar,
            bio: bio,
        },
    })
    return NextResponse.json({ message: "Success" })
 }