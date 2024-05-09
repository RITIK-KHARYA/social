import { headers } from "next/headers";

export const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/post`, {
    cache: "no-cache",
    headers: headers(),
  })
  const post = await res.json()
  return post?.data
};
