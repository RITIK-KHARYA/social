import { format } from "date-fns"
import { getComments } from "../actions/getComments"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default async function TabComments() {
    const comments = await getComments()
    return (
      <div className="flex flex-col space-y-2">
        {comments?.map((comment, index) => (
          <Card
            className="w-full bg-[#121212] border-2 border-neutral-900 group"
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
    );
}