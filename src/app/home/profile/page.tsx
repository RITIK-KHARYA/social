
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import ModalButton from '@/app/components/ModalButton'
import Profile from '@/app/components/profile'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { UploadButton } from '@uploadthing/react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SinglePost from '@/app/components/singlePost'
import TabPost from '@/app/components/TabPost'
import TabComments from '@/app/components/TabComments'
import TabMedia from '@/app/components/TabMedia'
import TabLikes from '@/app/components/TabLikes'
import Link from 'next/link'


const ProfilePage = async () => {
  const user =await getCurrentUser()
  revalidatePath("/home/profile")
  if(!user){
    return null
  }
  return (
    <div className="bg-[#232323] h-screen w-full flex flex-col px-2 mt-2 rounded-md overflow-scroll">
      <div className="flex flex-col h-screen space-y-6 mt-2 py-2">
        <div className="flex flex-col w-full h-[30%] bg-neutral-300/10 space-y-4 mt-2 rounded-md ">
          <Image
            src={user.header || "/images/n2.jpg"}
            alt="user"
            width={300}
            height={300}
            className=" w-full h-full rounded-md object-cover hover:bg-gradient-to-t from-zinc-800 to-slate-50 hover:opacity-60  z-10 cursor-pointer "
          />
          <ModalButton user={user} />
        </div>

        <div className="flex flex-col items-start justify-start h-96 w-960">
          <Image
            src={user?.image || "/images/images.png"}
            alt="user"
            width={50}
            height={50}
            className="rounded-full w-[150px] h-[150px] object-cover hover:bg-gradient-to-t from-zinc-800 to-slate-50 hover:opacity-60  z-20 cursor-pointer mr-36"
          />
          <div className="flex flex-col h-20 w-full mr-96   ">
            <span className="text-md font-bold flex-nowrap">{user.name}</span>
            <span className="text-slate-500 text-xs">@{user.username}</span>
          </div>
        </div>
        <div className="w-full h-[15%] bg-neutral-900/80 rounded-md mb-20 p-2">
          <h4 className="text-md text-slate-400">Bio</h4>

          <p className="text-lg text-slate-400">{user.bio}</p>
        </div>
        <div className="flex gap-x-1">
          <Link href={`/home/profile/followers`}>
            <span className="text-xs text-slate-300 hover:underline">
              {user?.followers.length} Followers
            </span>
          </Link>
          <Link href={`/home/profile/following`}>
            <span className="text-xs text-slate-300 hover:underline">
              {user?.followings.length} Following
            </span>
          </Link>
        </div>
        <div>
          <Tabs defaultValue="Posts" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="Posts" className="w-[25%]">
                Posts
              </TabsTrigger>
              <TabsTrigger value="Replies" className="w-[25%]">
                Replies
              </TabsTrigger>
              <TabsTrigger value="Media" className="w-[25%]">
                Media
              </TabsTrigger>
              <TabsTrigger value="Likes" className="w-[25%]">
                Likes
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="Posts"
              className="w-full overflow-scroll space-y-2"
            >
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
      </div>
    </div>
  );
}

export default ProfilePage