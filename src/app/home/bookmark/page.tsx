import { getBookmarks } from "@/app/actions/getBookmarks";
import AllBookmark from "@/app/components/AllBookmark";
import Back from "@/app/components/back";
import PostShimmer from "@/app/components/skeleton/postShimmer";
import { currentUser } from "@clerk/nextjs/server";
import React, { Suspense } from "react";

const BookmarkPage = async() => {
  
  return (
    <div className="flex flex-col border-2 w-[50%] h-fit p-2  rounded-md border-neutral-900 bg-[#121212] box-shadow-lg box-shadow-white shadow-inner-white mt-2 gap-x-2">
      <Back title="Bookmarks" />
      <Suspense fallback={<PostShimmer />}>
        <AllBookmark />
      </Suspense>
    </div>
  );
};

export default BookmarkPage;
