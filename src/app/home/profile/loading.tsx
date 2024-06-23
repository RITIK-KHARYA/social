import ProfileShimmer from "@/app/components/skeleton/profileShimmer";
import { Skeleton } from "@/components/ui/skeleton";
import { IoChevronBack } from "react-icons/io5";

export default function ProfileLoading() {
  return (
    <div className="bg-[#121212] h-screen w-full flex flex-col px-2 mt-2 rounded-md gap-y-2 overflow-scroll">
      <div className="flex items-center w-full h-12 py-2 space-x-64 border-b-2 border-neutral-900 ">
        <div className="flex items-center justify-between w-8 h-8 rounded-full bg-slate-300/10 hover:bg-slate-300/5 p-2 ">
          <IoChevronBack
            className="text-2xl fill-black h-6 w-6 "
            height={30}
            width={30}
          />
        </div>
        <Skeleton className="text-lg font-bold text-center" />
      </div>
      <ProfileShimmer />
    </div>
  );
}