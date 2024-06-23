import { Card } from "@/components/ui/card";
import { suggesntionUser } from "../actions/suggesntionUser";
import { any } from "zod";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Suggestion() {
    const users:User[] = await suggesntionUser()
  return (
    <Card className="border-2 p-1 rounded-md h-96 border-neutral-900 bg-[#121212]  w-[98%] mt-2 place self-center ml-1">
      <p className="text-neutral-300 text-center mt-2">Whom to Follow?</p>
      {users?.map((user) => (
        <Card
          id={user.id}
          className="border-2 p-1 rounded-md h-fit border-neutral-900 hover:bg-neutral-900/50 bg-[#121212]  w-[98%] mt-2 place self-center ml-1"
        >
          <div className="flex flex-row gap-x-2 items-center justify-between ">
            <div className="flex flex-row gap-x-1">
              <img
                src={user.image || "/images/images.png"}
                alt="avatar"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-white text-sm font-mono text-nowrap">
                  {user.name}
                </p>
                <p className="text-[9px] text-mono text-neutral-400">
                  {"@" + user.username}
                </p>
              </div>
            </div>
            <div className="">
              <Link href={`/home/profile/${user.id}`}>
                <Button className="h-fit w-fit">View</Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </Card>
  );
}