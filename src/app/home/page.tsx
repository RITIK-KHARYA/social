import { getProfile } from '@/actions/getProfile'
import React from 'react'

const HomePage = async() => {
  const profile = await getProfile()

  return (
    <div className="flex px-2 h-screen gap-y-4 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
      <p>main stuff</p>
    </div>
  );
}

export default HomePage