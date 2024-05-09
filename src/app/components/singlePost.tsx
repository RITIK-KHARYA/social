
import { Comment, Like, Post,User } from '@prisma/client'
import { format } from "date-fns";
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';
import LikeButton from './like';
import { CommentModal } from './CommentModal';
import { CommentForm } from './CommentForm';
import UserInteract from './UserInteract';
interface singlePostProps {
   posts: (Post & {author : User} & {likes: Like[]}& {comments: Comment[]})[]
}
const SinglePost =async({posts}: singlePostProps) => {
  const user = await currentUser();

  return posts.map((post) => (
    <div
      key={post.id}
      className="flex flex-col gap-y-4 w-full bg-zinc-900 p-4 rounded-md"
    >
      <div className="flex flex-col  w-full">
        <div className="flex items-start  gap-x-1  w-full ">
          <img
            src={post.author.image || "/images/images.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col  w-full  mb-8">
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-slate-500 ">
              {"@" + post.author.username}
            </p>
          </div>
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
      <div className="flex  gap-x-8">
      <LikeButton post={post} userId={user?.id} />
      <UserInteract postId={post.id} post={post} totalcomments={post.comments.length} />
    
      </div>
    </div>
  ));
}

export default SinglePost