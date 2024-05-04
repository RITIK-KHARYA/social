import { Session, currentUser } from "@clerk/nextjs/server";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";
import { CiUser } from "react-icons/ci";

export const useRoutes = () => {
    

 const pathname= usePathname()
  const routes = useMemo(
    () => [
      {
        name: "Home",
        path: "/home",
        icon: AiFillHome,
        isActive: pathname === "/home",
      },
      {
        name: "Messages",
        path: "/home/message",
        icon: BiSolidMessageSquareDetail,
        isActive: pathname === "/home/message",
      },
      {
         name: "Bookmarks",
        path: "/home/bookmark",
        icon: BsBookmarkStar,
        isActive: pathname == "/home/bookmark",
      },
      {
        name: "Profile",
        path: `/home/profile`,
        icon: CiUser,
        isActive: pathname == "/home/profile",
      },
    ],
    [pathname]
  );

  return routes;
}