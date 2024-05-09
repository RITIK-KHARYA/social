"use client";
import { Like, Post, User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { Island_Moments } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface LikeProps {
  post: Post & { author: User } & { likes: Like[] };
  userId: string | undefined;
}

export default function LikeButton({ post, userId }: LikeProps) {
  const router = useRouter();
  const isLikedByMe = post.likes.some((like) => like.userId === userId);
  // const initialIsLiked = isLikedByMe || post.likes.length > 0; 

  const [isLiked, setIsLiked] = useState(isLikedByMe);

  useEffect(() => {

    console.log("inside useEffect");
    router.refresh()
  }, [isLiked]);

  const handlelike = () => {
    try {
      if (isLiked) {
        axios.delete("/api/like", {
          data: {
            postId: post.id,
            userId: userId,
          },
        });
        setIsLiked(false);
        toast.success("disliked");
      } else {
        axios.post("/api/like", {
          postId: post.id,
          userId: userId,
        });
        setIsLiked(true);
        toast.success("liked");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
