"use client";
import { Bookmark, User } from "@prisma/client";
import { Post, Like, Comment } from "@prisma/client";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { createBookmark, deleteBookmark } from "../actions/createDeleteBookmarks";
import { Bookmark as BIcon} from "lucide-react";
interface BookmarkProps {
  postId: string;
  userId: string | undefined;
  post: (Post & { author: User } & { likes: Like[] } & {
    comments: Comment[];
  }&{bookmarks: Bookmark[]});
}
export default function BookmarkButton({ postId, userId, post }: BookmarkProps) {
    const isBookmarkedByMe = post.bookmarks.some(
      (bookmark) => bookmark.userId === userId
    );
  const router = useRouter()
    const [isBookmarked, setIsBookmarked] = useState(isBookmarkedByMe);
      const handleBookmark = async() => {
        try{
        if(!isBookmarked){
            await createBookmark(postId, userId);
            toast.success("Bookmark added");
            setIsBookmarked(true)
        }else{
            await deleteBookmark(postId, userId);
            toast.success("Bookmark deleted");
            setIsBookmarked(false)
        }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong");
        }
      };

  return (
    <div>
      <div
        className="flex gap-x-2"
        onClick={handleBookmark}
      >
        {isBookmarked ? (
          <BIcon width={20} height={20} className="fill-blue-500 stroke-none"  onClick={() => setIsBookmarked(false)} />
        ) : (
          <BIcon width={20} height={20} className="stroke-white  " onClick={() => setIsBookmarked(true)} />
        )}
      </div>
    </div>
  );
}
