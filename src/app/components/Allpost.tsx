import prisma from "@/db/db.config"
import { format } from "date-fns";

export default async function AllPost() {
    const posts = await prisma.post.findMany({
        include:{
            author:true
        }
    })
  return (
    <div className="flex flex-col gap-y-4 w-full h-screen overflow-scroll">
      {posts.map((post) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}
