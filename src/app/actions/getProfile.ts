import { prisma } from "@/db/db.config";
import { RedirectToSignIn } from "@clerk/nextjs";

import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { redirect } from "next/dist/server/api-utils";

export const getProfile = async () => {
    const user = await currentUser()
    if(!user) {
        return redirectToSignIn()
    }

    const profile = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });
    if(profile) {
        return profile
    }
    const newProfile = await prisma.user.create({
        data: {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            username: user.username ,
            email: user.emailAddresses[0].emailAddress,
            image: "/images/images.png",
        },
    })

    return newProfile
}

