import prisma from "@/db/db.config"

export const getNotifications = async (userId: string) => {
    const notifications = await prisma.notification.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return notifications;
}
 