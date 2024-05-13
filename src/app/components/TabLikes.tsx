import Image from "next/image";
import { getLikes } from "../actions/getLikes"
import { format } from "date-fns";
import LikeButton from "./like";
import UserInteract from "./UserInteract";
import BookmarkButton from "./Bookmark";
import { currentUser } from "@clerk/nextjs/server";

export default async function TabLikes() {
    const user = await currentUser()
    const posts =  await getLikes()
  return posts?.map((post, index) => (
    
   <div
     key={`${post.id}-${index}`}
     className="flex flex-col gap-y-4 w-full bg-zinc-900 p-4 rounded-md"
   >
     <div className="flex flex-col w-full">
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