import { format } from "date-fns";
import { getMediaPosts } from "../actions/getMediaPosts"
import Image from "next/image";
import LikeButton from "./like";
import UserInteract from "./UserInteract";
import BookmarkButton from "./Bookmark";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default async function TabMedia() {
    const user = await currentUser();
    const posts = await getMediaPosts()
   return posts?.map((post, index) => (
     <Card
       className="w-full bg-[#121212] border-2 border-neutral-900 group"
       key={`${post.id}-${index}`}
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

         <div className="border-2 border-neutral-900 rounded-md h-fit px-1  hover:bg-neutral-900/50  cursor-pointer">
           <span className="text-xs text-slate-200 font-mono ">
             {format(new Date(post.createdAt), "h:mm")}
           </span>
         </div>
       </CardHeader>
       <CardContent>
         <div className=" flex flex-col gap-y-4 w-full">
           <p className="text-md text-slate-150 font-mono ">{post.content}</p>
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
       </CardContent>
       <CardFooter className="w-full h-fit p-1 pl-8">
         <div className="flex items-center gap-x-6 ">
           <LikeButton post={post} userId={user?.id} authorId={post.authorId} />
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
   ));

}