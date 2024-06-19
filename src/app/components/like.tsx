"use client";
import { Like, Post, User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import { Island_Moments } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { createLike, deleteLike } from "../actions/createDeleteLike";

interface LikeProps {
  post: Post & { author: User } & { likes: Like[] };
  userId: string | undefined;
  authorId: string | undefined;
}

export default function LikeButton({ post, userId,authorId }: LikeProps) {

  const isLikedByMe = post.likes.some((like) => like.userId === userId);
  // const initialIsLiked = isLikedByMe || post.likes.length > 0; 

  const [isLiked, setIsLiked] = useState(isLikedByMe);
  


  const handlelike = async() => {
    try {
      if (isLiked) {
        await deleteLike(post.id, userId);
        setIsLiked(false);
        toast.success("disliked");
      } else {
        await createLike(post.id, userId, authorId);
        setIsLiked(true);
        toast.success("liked");
       
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }finally{
       
    }
  };

  return (
    <div className="flex items-center gap-x-2" onClick={handlelike}>
      {isLiked ? (
        <FaHeart onClick={() => setIsLiked(false)} />
      ) : (
        <CiHeart onClick={() => setIsLiked(true)} />
      )}
      <span>{post.likes.length}</span>
    </div>
  );
}
