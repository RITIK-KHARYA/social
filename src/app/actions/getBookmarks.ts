"use server";
import { revalidatePath, unstable_noStore } from "next/cache";
import { headers } from "next/headers";

export const getBookmarks = async () => {
  unstable_noStore()
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookmark`, {
    method: "GET",
    cache: "no-cache",
    headers: headers()
  })
  const bookmarks = await res.json()
  return bookmarks?.data
};