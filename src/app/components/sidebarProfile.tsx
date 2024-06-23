"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "../actions/getCurrentUser";
import { useEffect, useState } from "react";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { PShimmer } from "./skeleton/sProfile";

export default function SidebarProfile() {
    const [me,setMe] = useState<any>(null);
    useEffect(() => {
        const profile = async () => {
            const user = await getCurrentUser()
            setMe(user);
        }
        profile()
      
    }, []);
    if(!me) return <PShimmer />;
  return (
    <Card className="flex flex-col w-full bg-neutral-950 box-shadow-md border-2 border-neutral-900 rounded-md  ">
      <CardHeader className="h-[100px]">
        <div className="flex  items-center justify-center w-fit p-1 h-fit align-start border-2 border-neutral-900 hover:bg-neutral-900/40">
          <img
            src={me.image || "/images/images.png"}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <span className="text-[13px] text-nowrap font-mono">
          {me.name}-{"@" + me.username}
        </span>
        <div className="flex flex-col gap-y-1">
          <div className="border-2 border-neutral-900 rounded-md w-fit h-fit px-1  hover:bg-neutral-900/50  cursor-pointer">
            <span className="text-xs text-slate-200 font-mono ">Delhi</span>
          </div>
          <button className="border-2 text-slate-150 text-md border-neutral-900 rounded-md w-full h-fit font-mono p-1 hover:bg-neutral-900/40">
            Manage Your Profile
           
          </button>
        </div>
      </CardContent>
    </Card>
  );
}