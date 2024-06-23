import{Card,CardContent,CardHeader,CardFooter} from "@/components/ui/card";
import { getCurrentUser } from "../actions/getCurrentUser";
import { IoChevronBack } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import Link from "next/link";
import { format } from "date-fns";
import Suggestion from "./suggestion";
export default async function RightSidebar() {

  const user = await getCurrentUser()
  if(!user){
    return null;
  }
  return (
    <div className="w-[30%] bg-black border-2  border-neutral-900 rounded-md  h-screen fixed right-0 overflow-y-hidden mt-2 ">
      <Card className="border-2 p-1 rounded-md  border-neutral-900 h-fit bg-[#121212]  w-[98%] mt-2 place self-center ml-1">
        <div className="bg-[#121212] h-fit  w-full flex flex-col px-2 mt-2 rounded-md gap-y-2 overflow-scroll">
          <div className="relative h-36">
            <img
              src={user.header || "/images/n2.jpg"} 
              className="w-full h-[100px] rounded-md"
            />
            <div className="absolute -bottom-[20px] left-4">
              <img
                src={user.image || "/images/images.png"}
                alt="avatar"
                className="w-[100px] h-[100px] rounded-full"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button className="bg-white hover:bg-white/50 h-fit w-fit p-1  text-neutral-900 rounded-md">
                profile
              </button>
            </div>
          </div>
          <div className="border-b-2 border-neutral-900 w-full h-52">
            <div className="mt-4 px-4">
              <div className="flex flex-col">
                <p className="text-white text-xl font-mono">{user.name}</p>
                <p className="text-neutral-500 text-sm font-mono font-thin">
                  @{user.username}
                </p>
              </div>
              <div className="flex flex-col mt-2">
                <p className="text-white text-lg font-mono">{user.bio}</p>
                <div className="flex flex-row items-center gap-2 mt-2 text-neutral-400">
                  <BiCalendar size={24} />
                  <p>Joined -{format(new Date(user.createdAt), "dd,MMMM")}</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 mt-2">
                <div className="flex flex-row items-center gap-3">
                  <Link href={`/home/profile/${user.username}`}>
                    <p className="text-mono text-xs text-neutral-400 hover:underline hover:underline-offset-2">
                      <span className="text-sm text-neutral-200">
                        {user.followers.length}
                      </span>{" "}
                      Followers
                    </p>
                  </Link>
                  <Link href={`/home/profile/${user.username}`}>
                    <p className="text-xs text-mono text-neutral-400 hover:underline hover:underline-offset-2">
                      <span className="text-sm text-neutral-200">
                        {user.followings.length}
                      </span>{" "}
                      Following
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Suggestion />
    </div>
  );    

}