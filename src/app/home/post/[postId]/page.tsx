import { getComments, getPostComments } from "@/app/actions/getComments";
import { getPostById } from "@/app/actions/getPostById";
import BookmarkButton from "@/app/components/Bookmark";
import UserInteract from "@/app/components/UserInteract";
import LikeButton from "@/app/components/like";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function PostPage({ params }: { params: { postId: string } }) {
    const user = await currentUser()
    const post = await getPostById(params.postId)
    const comment = await getPostComments(params.postId)
    if (!post) return <div>Post not found</div>
  return (
    <div className="flex flex-col px-2 h-screen gap-y-10 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
      <div
        key={`${post?.id}`}
        className="flex flex-col gap-y-4 w-full bg-zinc-900 p-4 rounded-md mt-2"
      >
        <div className="flex flex-col  w-full">
          <div className="flex items-start  gap-x-1  w-full ">
            <Link href={user?.id === post.author.id
                            ? `/home/profile/`
                            : `/home/profile/${post.author.id}`
                        } className="cursor-pointer flex items-start  gap-x-1  w-full ">
              <img
                src={post?.author.image || "/images/images.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col  w-full  mb-8">
                <p className="text-sm font-medium cursor-pointer">
                  {post?.author.name}
                </p>
                <p className="text-xs text-slate-500 hover:underline hover:underline-offset-1 cursor-pointer">
                  {"@" + post?.author.username}
                </p>
              </div>
            </Link>
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
      Comments
      <div>
        <div className="flex flex-col gap-y-2">
          {comment?.map((comment, index) => (
            <div
              key={`${comment.id}-${index}`}
              className="flex flex-col gap-y-4 w-full bg-zinc-900 p-4 rounded-md"
            >
              <div className="flex flex-col  w-full">
                <div className="flex items-start  gap-x-1  w-full ">
                  <img
                    src={comment.user.image || "/images/images.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col  w-full  mb-8">
                    <p className="text-sm font-medium">{comment.user.name}</p>
                    <p className="text-xs text-slate-500 ">
                      {"@" + comment.user.username}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {format(new Date(comment.createdAt), "P")}
                  </p>
                </div>
                <p className="text-lg font-medium">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}