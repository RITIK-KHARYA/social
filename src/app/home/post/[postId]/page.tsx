import { getComments, getPostComments } from "@/app/actions/getComments";
import { getPostById } from "@/app/actions/getPostById";
import BookmarkButton from "@/app/components/Bookmark";
import UserInteract from "@/app/components/UserInteract";
import LikeButton from "@/app/components/like";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Back from "@/app/components/back";

export default async function PostPage({ params }: { params: { postId: string } }) {
    const user = await currentUser()
    const post = await getPostById(params.postId)
    const comment = await getPostComments(params.postId)
    if (!post) return <div>Post not found</div>
  return (
    <div className="flex flex-col px-2 h-screen gap-y-4  mt-2 w-[50%] rounded-md overflow-scroll">
      <Back title="Post" />{" "}
      <Card
        className="w-full bg-[#121212] border-2 border-neutral-900 group box-shadow-md shadow-inner"
        key={`${post.id}`}
      >
        <CardHeader className="flex flex-row">
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer flex items-start  gap-x-1  w-full">
              <div className="w-full flex gap-x-1 items-center">
                <img
                  src={post.author.image || "/images/images.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col ">
                  <span className="text-md font-light text-slate-50">
                    {post.author.name}
                  </span>
                  <span className="text-xs text-slate-200 font-thin hover:underline underline-offset-1  duration-200 transition-opacity">
                    {"@" + post.author.username}
                  </span>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              align="start"
              className="flex gap-1 bg-[#121212] p-2 rounded-md w-[200px] h-auto  border-2 border-neutral-900"
            >
              <div>
                <div className="relative">
                  <img
                    src={post.author.header || " /images/n2.jpg"}
                    className="h-12 w-[100vw] rounded-md"
                  />
                  <img
                    src={post.author.image || "/images/images.png"}
                    alt="avatar"
                    className="h-10 w-10 rounded-full absolute bottom-0 left-0 trasnform translate-y-1/2  "
                  />
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* <div className="w-full flex gap-x-1 items-center">
          <img
            src={post.author.image || "/images/images.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div className="flex flex-col ">
            <span className="text-md font-light text-slate-50">
              {post.author.name}
            </span>
            <span className="text-xs text-slate-200 font-thin hover:underline underline-offset-1  duration-200 transition-opacity">
              {"@" + post.author.username}
            </span>
          </div>
        </div> */}
          <div className="border-2 border-neutral-900 rounded-md h-fit px-1  hover:bg-neutral-900/50  cursor-pointer">
            <span className="text-xs text-slate-200 font-mono ">
              {format(new Date(post.createdAt), "h:mm")}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Link href={`/home/post/${post.id}`}>
            <div className=" flex flex-col gap-y-4 w-full">
              <p className="text-md text-slate-150 font-mono ">
                {post.content}
              </p>
              {post.image && (
                <div className="border-2 border-neutral-900 rounded-md hover:bg-neutral-900/50  cursor-pointer">
                  <img
                    src={post.image}
                    alt="image"
                    className="w-full h-fit rounded-md "
                  />
                </div>
              )}
            </div>
          </Link>
        </CardContent>
        <CardFooter className="w-full h-fit p-1 pl-8">
          <div className="flex items-center gap-x-6 ">
            <LikeButton
              post={post}
              userId={user?.id}
              authorId={post.authorId}
            />
            <UserInteract
              postId={post.id}
              post={post}
              totalcomments={post.comments.length}
              authorId={post.authorId}
            />
            <BookmarkButton postId={post.id} userId={user?.id} post={post} />
          </div>
        </CardFooter>
      </Card>
      <div className="flex border-b-2 border-neutral-900 w-full ">
        <p className="text-neutral-300 font-mono text-xl ml-2">Comments</p>
      </div>
      <div>
        <div className="flex flex-col gap-y-1 overflow-scroll">
          {comment?.map((comment, index) => (
            <Card
              className="w-full bg-[#121212] border-2 border-neutral-900 group box-shadow-md shadow-inner"
              key={`${comment.id}-${index}`}
            >
              <CardHeader className="flex flex-row">
                <div className="w-full flex gap-x-1 items-center">
                  <img
                    src={comment.user.image || "/images/images.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <div className="flex flex-col ">
                    <span className="text-md font-light text-slate-50">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-slate-200 font-thin hover:underline underline-offset-1  duration-200 transition-opacity">
                      {"@" + comment.user.username}
                    </span>
                  </div>
                </div>

                <div className="border-2 border-neutral-900 rounded-md h-fit px-1  hover:bg-neutral-900/50  cursor-pointer">
                  <span className="text-xs text-slate-200 font-mono ">
                    {format(new Date(comment.createdAt), "h:mm")}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className=" flex flex-col gap-y-4 w-full">
                  <p className="text-md text-slate-150 font-mono ">
                    {comment.content}
                  </p>
                  {/* {comment.image && (
                  <div className="border-2 border-neutral-900 rounded-md hover:bg-neutral-900/50  cursor-pointer">
                    <img
                      src={comment.image}
                      alt="image"
                      className="w-full h-fit rounded-md "
                    />
                  </div>
                )} */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}