"use client";
import { useRoutes } from "@/hooks/useRoutes";
import { currentUser } from "@clerk/nextjs/server";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";


export default function Sidebar() {
  const routes= useRoutes();
  return (
    <div className="flex h-screen w-[20%]  bg-[#232323] drop-shadow-md shadow-lg no-scrollbar overflow-y-hidden rounded-md mt-2 ml-2 z-10 gap-y-6">
      <div className="flex flex-col w-full bg-[#232323] rounded-md ml-2 mr-2 gap-y-6 mt-14 ">
        {routes.map((route) => (
          <Link href={route.path} key={route.path}>
            <div
              key={route.path}
              className={clsx(
                "flex items-center justify-center w-full h-[50px] hover:dark:bg-zinc-900/20 rounded-md cursor-pointer",
                route.isActive ? "bg-[#4CCD99] dark:bg-[#4CCD99]/60  hover:dark:bg-[#4CCD99]/40" : ""
              )}
            >
              <div className="flex items-center justify-start w-full px-1  rounded-md cursor-pointer h-full">
                <div className="text-white text-xl font-bold">
                  <route.icon className="  rounded-full p-1 w-6 h-6" fill="currentColor" />
                </div>
                <span className="text-white text-md font-bold px-4">
                  {route.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}