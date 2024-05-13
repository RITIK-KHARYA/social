"use client";
import { Bookmark, User } from "@prisma/client";
import { Post, Like, Comment } from "@prisma/client";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
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
      const handleBookmark = () => {
        try{
        if(!isBookmarked){
            axios.post("/api/bookmark", {
              postId: postId,
              userId: userId,
            });
            toast.success("Bookmark added");
            setIsBookmarked(true)
        }else{
            axios.delete("/api/bookmark", {
              data: {
                postId: postId,
                userId: userId,
              },
        });
            toast.success("Bookmark deleted");
            setIsBookmarked(false)
        }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong");
        } finally {
          router.refresh();
       }
      };

  return (
    <div>
      <div
        className="flex gap-x-2"
        onClick={handleBookmark}
      >
        {isBookmarked ? (
          <CiBookmark width={20} height={20} className="h-6 w-6" fill="blue" onClick={() => setIsBookmarked(false)} />
        ) : (
          <CiBookmark width={20} height={20} className="h-6 w-6 " onClick={() => setIsBookmarked(true)} />
        )}
      </div>
    </div>
  );
}
