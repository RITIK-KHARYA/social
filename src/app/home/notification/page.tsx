import { getNotifications } from "@/app/actions/getNotifications"
import Back from "@/app/components/back"
import { currentUser } from "@clerk/nextjs/server"
import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { AllNoti } from "@/app/components/allNoti"
import { Suspense } from "react"
import { NotificationShimmer } from "@/app/components/skeleton/notificationShimmer"

export default async function Notification() {
    const user = await currentUser()
    if (!user) {
        return <div>You must be logged in to see notifications.</div>
    }
    const notifications = await getNotifications()
    return (
      <div className="flex flex-col px-2 h-screen gap-y-2 dark:bg-[#121212]  mt-2 w-[50%] rounded-md overflow-scroll">
        <Back title="Notifications" />
        <div className="flex flex-col items- gap-y-2 w-full h-fit">
          <Suspense fallback={<NotificationShimmer />}>
            {notifications.map((notification) => (
              <AllNoti notification={notification} />
            ))}
          </Suspense>
        </div>
      </div>
    );
}