import { getNotifications } from "@/app/actions/getNotifications"
import { currentUser } from "@clerk/nextjs/server"

export default async function Notification() {
    const user = await currentUser()
    if (!user) {
        return <div>You must be logged in to see notifications.</div>
    }
    const notifications = await getNotifications(user.id)
    return (
      <div className="flex flex-col px-2 h-screen gap-y-20 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex flex-col items-center justify-center w-full h-[100px] rounded-md p-2 gap-y-2">
            <p>{notification.content}</p>
          </div>
        ))}
      </div>
    );
}