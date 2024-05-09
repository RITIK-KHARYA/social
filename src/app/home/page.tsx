import { getProfile } from "@/app/actions/getProfile";
import React from "react";
import { PostMaker } from "../components/PostMaker";
import AllPost from "../components/Allpost";
import { getPosts } from "@/app/actions/getPosts";
import { Like, Post, User } from "@prisma/client";

export default async function HomePage() {
  const profile = await getProfile();
  const posts: Array<Post & { author: User } & {likes: Like[]}> = await getPosts();

  return (
    <div className="flex flex-col px-2 h-screen gap-y-20 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
      <PostMaker />
      <AllPost posts={posts} />
    </div>
  );
}
