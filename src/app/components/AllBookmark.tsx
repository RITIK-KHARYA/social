"use client";
import { Bookmark, Like, Post,Comment } from "@prisma/client";
import { getBookmarks } from "../actions/getBookmarks";
import { IoChevronBack } from "react-icons/io5";
import Image from "next/image";
import BookmarkButton from "./Bookmark";
import UserInteract from "./UserInteract";
import LikeButton from "./like";
import { format } from "date-fns";
interface AllBookmarkProps {
  bookmarks: any[]
  userId: string | undefined
}
export default function AllBookmark({ bookmarks,userId } : AllBookmarkProps) {
  const handleback = () => {
    history.back();
  };

  return (
    <div className="flex flex-col gap-y-6 w-full h-screen overflow-scroll mt-4">
      <div className="flex items-center w-full h-12 px-2 space-x-64">
        <div
          className="flex items-center justify-between w-8 h-8 rounded-full bg-slate-300/10 hover:bg-slate-300/5 p-2 "
          onClick={handleback}
        >
          <IoChevronBack
            className="text-2xl text-white h-6 w-6 "
            height={30}
            width={30}
          />
        </div>
        <h1 className="text-xl font-bold text-center">Bookmarks</h1>
      </div>
      <div className="flex flex-col gap-y-2 w-full h-full"> 
    {bookmarks.map((bookmark,index) => (
    <div
      key={`${bookmark.id}-${index}`}
      className="flex flex-col gap-y-4 w-full bg-zinc-900 p-4 rounded-md"
    >
      <div className="flex flex-col  w-full">
        <div className="flex items-start  gap-x-1  w-full ">
          <img
            src={bookmark.post.author.image || "/images/images.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col  w-full  mb-8">
            <p className="text-sm font-medium">{bookmark.post.author.name}</p>
            <p className="text-xs text-slate-500 ">
              {"@" + bookmark.post.author.username}
            </p>
          </div>
          <p className="text-xs text-sla.te-500">
            {format(new Date(bookmark.post.createdAt), "P")}
          </p>
        </div>
        <p className="text-lg font-medium">{bookmark.post.content}</p>
        {bookmark?.post?.image && (
          <Image
            src={bookmark.post.image}
            alt="image"
            height={200}
            width={200}
            className="w-full h-auto rounded-md"
            quality={100}
            priority
          />
        )}
      </div>
      <div className="flex items-center gap-x-8 ">
        <LikeButton post={bookmark.post} userId={userId} />
        <UserInteract
      
          postId={bookmark.post.id}
          post={bookmark.post}
          totalcomments={bookmark.post.comments.length}
        />
        <BookmarkButton postId={bookmark.post.id} userId={userId} post={bookmark.post} />
      </div>
    </div>
      ))}
      </div>
    </div>
  );
}