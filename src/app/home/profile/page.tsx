
import Profile from '@/app/components/profile'
import { currentUser } from '@clerk/nextjs/server'
import { UploadButton } from '@uploadthing/react'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import React from 'react'

const ProfilePage = async () => {
  const user = await currentUser()
  if(!user){
    return null
  }
  return (
    <div className="bg-[#232323] h-screen w-full flex flex-col px-2 mt-2 rounded-md">
      <div className="flex flex-col h-screen space-y-4 mt-2">
        <div className="flex w-full h-[30%] bg-neutral-300/10 space-y-4 mt-2 rounded-md ">
          <Image
            src="/images/n2.jpg"
            alt="user"
            width={300}
            height={300}
            className=" w-full h-full rounded-md object-cover hover:bg-gradient-to-t from-zinc-800 to-slate-50 hover:opacity-60  z-10 cursor-pointer "
          />
        </div>
        <div className="flex flex-col  h-30 w-30 space-y-4 mt-2 mr-2 ">
          <Image
            src={user.imageUrl}
            alt="user"
            width={50}
            height={50}
            className="rounded-full  w-30 h-30"
          />
        </div>
        <div>
          {user.username}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage