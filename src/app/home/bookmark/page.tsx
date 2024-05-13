import { getBookmarks } from "@/app/actions/getBookmarks";
import AllBookmark from "@/app/components/AllBookmark";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const BookmarkPage = async() => {
  const user = await currentUser();
    const bookmarks = await getBookmarks();
  return (
    <div className='flex flex-col px-2 h-screen gap-y-20 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md'>
      <AllBookmark bookmarks={bookmarks} userId={user?.id} />
    </div>
  );
};

export default BookmarkPage;
