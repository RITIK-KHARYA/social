export const revalidate = 0;
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ModalButton from "@/app/components/ModalButton";
import Profile from "@/app/components/profile";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { UploadButton } from "@uploadthing/react";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SinglePost from "@/app/components/singlePost";
import TabPost from "@/app/components/TabPost2";
import TabComments from "@/app/components/TabComments2";
import TabMedia from "@/app/components/TabMedia2";
import TabLikes from "@/app/components/TabLikes2";
import { getOtherUser } from "@/app/actions/getOtherUser";
import FollowButton from "@/app/components/FollowButton";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";
import TabComments2 from "@/app/components/TabComments2";
import TabMedia2 from "@/app/components/TabMedia2";
import TabLikes2 from "@/app/components/TabLikes2";
import TabPost2 from "@/app/components/TabPost2";

const Mypage = async({ params }: { params: { profileId: string } }) => {
  unstable_noStore()
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return null;
  }
  
  const user = await getOtherUser(params.profileId);
  if(!user){
    return null;
  }
  const isFollowing = user?.followers.some((follower) => follower.followingId === currentUser?.id) 

  return (
    <div className="bg-[#121212] h-screen w-[50%] flex flex-col px-2 mt-2 rounded-md gap-y-2 ">
      <div className="flex items-center w-full h-12 py-2 border-b-2 border-neutral-900 ">
        <div className="flex items-center justify-between w-8 h-8 rounded-full bg-slate-300/10 hover:bg-slate-300/5 p-2 ">
          <IoChevronBack
            className="text-2xl fill-black h-6 w-6 "
            height={30}
            width={30}
          />
        </div>
        <h1 className="text-lg font-bold text-center">{user.name}</h1>
      </div>
      <div className="relative h-72">
        <img
          src={user.header || "/images/n2.jpg"}
          className="w-full h-[200px] rounded-md"
        />
        <div className="absolute -bottom-[60px] left-4">
          <img
            src={user.image || "/images/images.png"}
            alt="avatar"
            className="w-[150px] h-[150px] rounded-full"
          />
        </div>
      </div>
      <div className="border-b-2 border-neutral-900 w-full h-64">
        <div className="flex justify-end">
          <FollowButton
            userId={user.id}
            currentUser={currentUser?.id}
            isFollowing={isFollowing}
          />
        </div>
        <div className="mt-8 px-4">
          <div className="flex flex-col">
            <p className="text-white text-xl font-mono">{user.name}</p>
            <p className="text-neutral-500 text-sm font-mono font-thin">
              @{user.username}
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-white text-lg font-mono">{user.bio}</p>
            <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
              <BiCalendar size={24} />
              <p>Joined -{format(new Date(user.createdAt), "dd,MMMM")}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-6 mt-4">
            <div className="flex flex-row items-center gap-6">
              <Link href={`/home/profile/${user.username}/followers/${user.id}`}>
                <p className="text-mono text-xs text-neutral-400 hover:underline hover:underline-offset-2">
                  <span className="text-sm text-neutral-200">
                    {user.followers.length}
                  </span>{" "}
                  Followers
                </p>
              </Link>
              <Link href={`/home/profile/${user.username}/following/${user.id}`}>
                <p className="text-xs text-mono text-neutral-400 hover:underline hover:underline-offset-2">
                  <span className="text-sm text-neutral-200">
                    {user.followings.length}
                  </span>{" "}
                  Following
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="Posts" className="w-full ">
        <TabsList className="w-full bg-black drop-shadow-md ">
          <TabsTrigger
            value="Posts"
            className="w-[25%]  active:border-neutral-900 active:border-2 border-none active:bg-neutral-900"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="Replies"
            className="w-[25%] active:border-neutral-900 active:border-2 border-none"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="Media"
            className="w-[25%] active:border-neutral-900 active:border-2 border-none"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            value="Likes"
            className="w-[25%] active:border-neutral-900 active:border-2 border-none"
          >
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Posts" className="w-full overflow-scroll space-y-2">
          <TabPost2 userId={user.id} />
        </TabsContent>
        <TabsContent
          value="Replies"
          className="w-full overflow-scroll space-y-2 gap-y-2"
        >
          <TabComments2 userId={user.id} />
        </TabsContent>
        <TabsContent
          value="Media"
          className="w-full overflow-scroll space-y-2 gap-y-2"
        >
          <TabMedia2 userId={user.id} />
        </TabsContent>
        <TabsContent
          value="Likes"
          className="w-full overflow-scroll space-y-2 gap-y-2"
        >
          <TabLikes2 userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Mypage;
