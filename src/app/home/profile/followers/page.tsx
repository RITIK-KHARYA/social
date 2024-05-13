import { getCurrentUserFollowers } from "@/app/actions/getCurrentUserFollowers";
import FollowButton from "@/app/components/FollowButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Followers() {
  const user = await getCurrentUserFollowers();
  return (
    <div className="bg-[#232323] h-screen w-full flex flex-col px-2 mt-2 rounded-md overflow-scroll">
      {user?.length == 0 && (
        <div className="flex justify-center h-screen py-4">
          <h2 className="text-2xl"> You don't follow anyone </h2>
        </div>
      )}
      <div className="py-2 flex flex-col gap-y-2">
        {user?.map((follower) => (
          <div key={follower.id} className="flex gap-y-2 py-2">
            <div className="bg-neutral-900/90 w-full items-center h-24 rounded-md p-2 flex gap-y-2 py-2 ">
              <div className="h-fit w-[50px]">
                <Image
                  src={follower?.image || "/images/images.png"}
                  alt="user"
                  width={50}
                  height={50}
                  className="rounded-full w-[50px] h-[50px] object-cover hover:bg-gradient-to-t from-zinc-800 to-slate-50 hover:opacity-60  z-20 cursor-pointer mr-36"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <span className="text-md font-bold flex-nowrap">
                  {follower?.name}
                </span>
                <Link href={`/home/profile/${follower?.id}`}>
                  <span className="text-slate-500 text-xs hover:underline">
                    @{follower?.username}
                  </span>
                </Link>
              </div>
              <Link href={`/home/profile/${follower?.id}`}>
                <Button className="w-28 h-8 ">View Profile</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
