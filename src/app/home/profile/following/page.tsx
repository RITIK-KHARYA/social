import { getCurrentUserFollowers, getCurrentUserFollowing } from "@/app/actions/getCurrentUserFollowers";
import FollowButton from "@/app/components/FollowButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Following() {
  const user = await getCurrentUserFollowing();
  
  return (
    <div className="bg-[#121212] h-screen w-full flex flex-col mt-2 rounded-md overflow-scroll">
      {user?.length == 0 && (
        <div className="flex justify-center h-screen py-4">
          <h2 className="text-2xl"> You don't have any following </h2>
        </div>
      )}
      <div className="py-2">
        {user?.map((follower) => (
          <Card className="flex items-center bg-neutral-900/60 border-2 border-neutral-900 rounded-md w-[64%] ml-2 h-20 box-shadow-md hover:bg-neutral-900/30 ">
            <CardHeader className="flex flex-row justify-between w-full">
              <div className="flex justify-center  ">
                <img
                  src={follower?.image || "/images/images.png"}
                  alt="user"
                  width={50}
                  height={50}
                  className="rounded-full w-[50px] h-[50px] object-cover hover:bg-gradient-to-t from-zinc-800 to-slate-50 hover:opacity-60  z-20 cursor-pointer "
                />
                <div className="flex flex-col ml-1">
                  <p className="text-slate-150  text-sm">{follower?.name}</p>
                  <p className="text-neutral-500 text-[10px] text-mono ">
                    {"@" + follower?.username}
                  </p>
                </div>
              </div>
              <button className="bg-white hover:bg-white/50 h-fit w-fit px-4 py-1 place-content-end ml-8 text-neutral-900 rounded-full">
                View
              </button>
            </CardHeader>
          
          </Card>
        ))}
      </div>
    </div>
  );
}
