import { format } from "date-fns"
import { getComments, getOtherUserComments } from "../actions/getComments"
import { getOtherUserLikes } from "../actions/getLikes";
import { use } from "react";

export default async function TabComments({ userId }: { userId: string }) {
  const comments = await getOtherUserComments(userId);
  return (
    <div className="flex flex-col space-y-2">
      {comments?.map((comment, index) => (
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
            <p className="text-xs text-slate-500">
              {format(new Date(comment.createdAt), "P")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}