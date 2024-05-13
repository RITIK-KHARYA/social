
import { Bookmark, Comment, Like, Post,User } from '@prisma/client'
import { format } from "date-fns";
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';
import LikeButton from './like';
import { CommentModal } from './CommentModal';
import { CommentForm } from './CommentForm';
import UserInteract from './UserInteract';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


import BookmarkButton from './Bookmark';
import Link from 'next/link';
interface singlePostProps {
   posts: (Post & {author : User} & {likes: Like[]} & {comments: Comment[]}&{bookmarks: Bookmark[]})[];
}
const SinglePost =async({posts}: singlePostProps) => {
  const user = await currentUser();
 

  return posts.map((post, index) => (
    <div
      key={`${post.id}-${index}`}
      className="flex flex-col gap-y-4 w-full bg-zinc-900 p-4 rounded-md"
    >
      <div className="flex flex-col  w-full">
        <div className="flex items-start  gap-x-1  w-full ">
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer flex items-start  gap-x-1  w-full">
              <img
                src={post.author.image || "/images/images.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col  w-full  mb-8">
                <p className="text-sm font-medium cursor-pointer">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-500 hover:underline hover:underline-offset-1 cursor-pointer">
                  {"@" + post.author.username}
                </p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="flex gap-1 bg-black p-2 rounded-md w-[720px] h-auto ml-[62px]">
              <div className="flex gap-1 flex-col bg-neutral-900 p-2 rounded-md w-[710px] h-auto">
                <div className="flex items-start gap-x-1 sapce-y-1 w-full px-2">
                  <div className="flex flex-col">
                    <Link href={user?.id === post.author.id ? `/home/profile/` : `/home/profile/${post.author.id}`}>
                      <Image
                        src={post.author.image || "/images/images.png"}
                        alt="image"
                        height={20}
                        width={20}
                        className="w-8 h-8 rounded-full"
                        quality={100}
                        priority
                      />
                      <div className="flex flex-col  w-full  mb-8">
                        <p className="text-sm font-medium cursor-pointer">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-slate-500 hover:underline hover:underline-offset-1 cursor-pointer">
                          {"@" + post.author.username}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start justify-start gap-x-1 gap-y-1 w-full">
                  <p className="text-xs text-slate-500">{post.author.bio}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <p className="text-xs text-slate-500">
            {format(new Date(post.createdAt), "P")}
          </p>
        </div>
        <p className="text-lg font-medium">{post.content}</p>
        {post.image && (
          <Image
            src={post.image}
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
        <LikeButton post={post} userId={user?.id} />
        <UserInteract
          postId={post.id}
          post={post}
          totalcomments={post.comments.length}
        />
        <BookmarkButton postId={post.id} userId={user?.id} post={post} />
      </div>
    </div>
  ));
}

export default SinglePost