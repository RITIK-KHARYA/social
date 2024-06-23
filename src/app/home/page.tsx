import { getProfile } from "@/app/actions/getProfile";
import React, { Suspense } from "react";
import { PostMaker } from "../components/PostMaker";
import AllPost from "../components/Allpost";
import { getPosts } from "@/app/actions/getPosts";
import { Like, Post, User, Comment, Bookmark } from "@prisma/client";
import { getCurrentUser } from "../actions/getCurrentUser";
import PostShimmer from "../components/skeleton/postShimmer";

export default async function HomePage() {
  const profile = await getProfile();
  const user = await getCurrentUser()
  if(!user) {
    return <div>You are not logged in</div>
  }
  const posts: Array<Post & { author: User } & {likes: Like[]}&{comments: Comment[]}&{bookmarks: Bookmark[]}> = await getPosts();

  return (
    <div className="flex flex-col px-2 h-screen gap-y-16  mt-2 w-[50%] rounded-md scroll-smooth overflow-scroll">
      <div className="flex border-2 w-auto h-fit p-2  rounded-md border-neutral-900 bg-[#121212] box-shadow-lg box-shadow-white shadow-inner-white">
        <div className="flex flex-col w-[60px] relative">
          <div className="w-fit flex relative">
            <img
              src={user?.image || "/images/images.png"}
              alt="profile"
              className="rounded-full w-[45px] h-[45px] mt-2"
            />
            <span
              className="h-2 w-10 bg-neutral-900 border-1 border-zinc-800 absolute top-[50%] left-[100%] -z-[4] 
            transform -translate-x-1/2 -translate-y-1/2 rounded-full"
            ></span>
          </div>
        </div>
        <PostMaker />
      </div>
      <Suspense fallback={<PostShimmer />}>
        <AllPost posts={posts} />
       
      </Suspense>
    </div>
  );
}