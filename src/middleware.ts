import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest } from "next/server";


const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)","/","/api/uploadthing"]);
export default clerkMiddleware((auth, req) => {
   if(!isPublicRoute(req)){
    auth().protect();
  }
});


export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
