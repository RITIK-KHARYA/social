import { getProfile } from '@/actions/getProfile'
import React from 'react'
import { Post } from '../components/Post';
import AllPost from '../components/Allpost';

const HomePage = async() => {
  const profile = await getProfile()

  return (
    <div className="flex flex-col px-2 h-screen gap-y-20 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
      <Post />
      <AllPost />
    </div>
  );
}

export default HomePage