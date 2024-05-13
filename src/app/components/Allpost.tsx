import { Like, Post,User,Comment, Bookmark} from "@prisma/client";
import SinglePost from "./singlePost";

interface singlePostProps {
  posts: (Post & { author: User  }&  {likes: Like[]}& {comments: Comment[]}&{bookmarks: Bookmark[]})[];
}
export default function AllPost({posts}: singlePostProps) {

  return (
    <div className="flex flex-col gap-y-6 w-full h-screen overflow-scroll mt-4">
      <SinglePost posts={posts} />
    </div>
  );
}
