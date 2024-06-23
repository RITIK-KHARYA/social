"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { useRoutes } from "@/hooks/useRoutes";
import { currentUser } from "@clerk/nextjs/server";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import SidebarProfile from "./sidebarProfile";


export default function Sidebar() {
  const routes= useRoutes();
  return (
    <div className="flex h-full sticky left-0 w-[17%]   rounded-md mt-2 border-neutral-900 border-2 bg-[#121212] box-shadow-lg box-shadow-white shadow-inner-white no-scrollbar overflow-hidden  ml-2 z-10 gap-y-6 ">
      <div className="flex flex-col w-full bg-[#121212] rounded-md ml-2 mr-2 gap-y-6 mt-14 ">
        {routes.map((route) => (
          <Link href={route.path} key={route.path}>
            <div
              key={route.path}
              className={clsx(
                "flex items-center justify-center w-full h-[40px] border-0 hover:border-2 hover:border-neutral-900 box-shadow-md rounded-md cursor-pointer relative hover:bg-neutral-900/50",
                route.isActive
                  ? "bg-neutral-900/40 text-[#00FF7F] border-2 border-neutral-900 box-shadow-md"
                  : ""
              )}
            >
              <div className="flex items-center justify-start w-full px-1 gap-x-2 rounded-md cursor-pointer h-full ">
                {route.isActive && (
                  <span className="bg-[#00FF7F] h-[37px] w-1 rounded-l-md absolute left-0"></span>
                )}
                <div className="text-white text-xl font-bold">
                  <route.icon
                    className={clsx(
                      "  rounded-full p-1 w-6 h-6 ",
                      route.isActive ? "fill-[#00FF7F]" : "fill-white"
                    )}
                    fill="currentColor"
                  />
                </div>
                <span
                  className={clsx(
                    " text-sm font-medium",
                    route.isActive ? "text-[#00FF7F]" : ""
                  )}
                >
                  {route.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
        <div className="mt-44">
          <SidebarProfile />
        </div>
      </div>
    </div>
  );
}