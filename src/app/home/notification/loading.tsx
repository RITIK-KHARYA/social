import Back from "@/app/components/back";
import { NotificationShimmer } from "@/app/components/skeleton/notificationShimmer";

export default function NotificationLoading(){
  return (
     <div className="flex flex-col px-2 h-screen gap-y-2 dark:bg-[#121212]  mt-2 w-[50%] rounded-md overflow-scroll">
        <Back title="Notifications" />
    <NotificationShimmer/>
    </div>
  );
}