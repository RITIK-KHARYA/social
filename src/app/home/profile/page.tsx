
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import ModalButton from '@/app/components/ModalButton'
import Profile from '@/app/components/profile'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { UploadButton } from '@uploadthing/react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SinglePost from '@/app/components/singlePost'
import TabPost from '@/app/components/TabPost'
import TabComments from '@/app/components/TabComments'
import TabMedia from '@/app/components/TabMedia'
import TabLikes from '@/app/components/TabLikes'
import Link from 'next/link'
import { IoChevronBack } from 'react-icons/io5'
import FollowButton from '@/app/components/FollowButton'
import { BiCalendar } from 'react-icons/bi'
import { format } from 'date-fns'
import ProfileShimmer from '@/app/components/skeleton/profileShimmer'
import Back from '@/app/components/back'


const ProfilePage = async () => {
  const user =await getCurrentUser()
  revalidatePath("/home/profile")
  if(!user){
    return null
  }
  return (
    <div className="bg-[#121212] h-screen w-[50%] flex flex-col px-2 mt-2 rounded-md gap-y-2 overflow-scroll">
      <Back title="profile" />
      <Suspense fallback={<ProfileShimmer />}>
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
            <ModalButton user={user} />
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
                <Link href={`/home/profile/${user.username}`}>
                  <Link href={`/home/profile/followers`}>
                    <p className="text-mono text-xs text-neutral-400 hover:underline hover:underline-offset-2">
                      <span className="text-sm text-neutral-200">
                        {user.followers.length}
                      </span>{" "}
                      Followers
                    </p>
                  </Link>
                </Link>
                <Link href={`/home/profile/following`}>
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
      </Suspense>

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
          <TabPost />
        </TabsContent>
        <TabsContent
          value="Replies"
          className="w-full overflow-scroll space-y-2 gap-y-2"
        >
          <TabComments />
        </TabsContent>
        <TabsContent
          value="Media"
          className="w-full overflow-scroll space-y-2 gap-y-2"
        >
          <TabMedia />
        </TabsContent>
        <TabsContent
          value="Likes"
          className="w-full overflow-scroll space-y-2 gap-y-2"
        >
          <TabLikes />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage