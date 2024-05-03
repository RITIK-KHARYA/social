import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req as NextRequest)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
