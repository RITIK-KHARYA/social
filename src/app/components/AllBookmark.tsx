
import { Bookmark, Like, Post,Comment } from "@prisma/client";
import { getBookmarks } from "../actions/getBookmarks";
import { IoChevronBack } from "react-icons/io5";
import Image from "next/image";
import BookmarkButton from "./Bookmark";
import UserInteract from "./UserInteract";
import LikeButton from "./like";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Back from "./back";
import { Suspense } from "react";
import PostShimmer from "./skeleton/postShimmer";
import { currentUser } from "@clerk/nextjs/server";
interface AllBookmarkProps {
  bookmarks: any[]
  userId: string | undefined
}
export default async function AllBookmark() {
  const user = await currentUser();
  const bookmarks:any = await getBookmarks();

  return (
    <div className="flex flex-col gap-y-6 w-full h-screen  mt-4">
    
      
        <div className="flex flex-col gap-y-2 w-full h-full overflow-scroll">
          {bookmarks.map((bookmark:any, index:any) => (
            <Card
              className="w-full bg-[#121212] border-2 border-neutral-900 group"
              key={`${bookmark.id}-${index}`}
            >
              <CardHeader className="flex flex-row">
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer flex items-start  gap-x-1  w-full">
                    <div className="w-full flex gap-x-1 items-center">
                      <img
                        src={bookmark.post.author.image || "/images/images.png"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <div className="flex flex-col ">
                        <span className="text-md font-light text-slate-50">
                          {bookmark.post.author.name}
                        </span>
                        <span className="text-xs text-slate-200 font-thin hover:underline underline-offset-1  duration-200 transition-opacity">
                          {"@" + bookmark.post.author.username}
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
                          src={bookmark.post.author.header || " /images/n2.jpg"}
                          className="h-12 w-[100vw] rounded-md"
                        />
                        <img
                          src={
                            bookmark.post.author.image || "/images/images.png"
                          }
                          alt="avatar"
                          className="h-10 w-10 rounded-full absolute bottom-0 left-0 trasnform translate-y-1/2  "
                        />
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <div className="border-2 border-neutral-900 rounded-md h-fit px-1  hover:bg-neutral-900/50  cursor-pointer">
                  <span className="text-xs text-slate-200 font-mono ">
                    {format(new Date(bookmark.post.createdAt), "h:mm")}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className=" flex flex-col gap-y-4 w-full">
                  <p className="text-md text-slate-150 font-mono ">
                    {bookmark.post.content}
                  </p>
                  {bookmark.post.image && (
                    <div className="border-2 border-neutral-900 rounded-md hover:bg-neutral-900/50  cursor-pointer">
                      <img
                        src={bookmark.post.image}
                        alt="image"
                        className="w-full h-fit rounded-md "
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="w-full h-fit p-1 pl-8">
                <div className="flex items-center gap-x-6 ">
                  <LikeButton
                    post={bookmark.post}
                    userId={user?.id}
                    authorId={bookmark.post.authorId}
                  />
                  <UserInteract
                    postId={bookmark.post.id}
                    post={bookmark.post}
                    totalcomments={bookmark.post.comments.length}
                    authorId={bookmark.post.authorId}
                  />
                  <BookmarkButton
                    postId={bookmark.post.id}
                    userId={user?.id}
                    post={bookmark.post}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
   
    </div>
  );
}