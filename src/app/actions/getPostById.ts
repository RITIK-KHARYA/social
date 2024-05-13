import prisma from "@/db/db.config"

export const getPostById = async (postId: string) => {
 const singlepost = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      comments: true,
      author: true,
      bookmarks: true,
      likes: true
    }
  })

  return singlepost
}