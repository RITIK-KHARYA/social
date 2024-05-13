import prisma from "@/db/db.config"
import { currentUser } from "@clerk/nextjs/server";

export const getNotifications = async () => {
    const user = await currentUser();
    const notifications = await prisma.notification.findMany({
        where: {
           toUserId: user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return notifications;
}
 