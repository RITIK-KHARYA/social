import prisma from "@/db/db.config";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUserFollowers = async () => {
  const user = await currentUser()
  if (!user) {
    return null;
  }
  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include:{
      followers: true,
      followings: true
    }
  })
  const followers = profile?.followers
  
  const followerUser = await prisma.user.findMany({
    where: {
      id: {
        in: followers?.map((follower) => follower.followingId)
      }
    },
  })
 
  return followerUser
}

export const getCurrentUserFollowing = async () => {
  const user = await currentUser()
  if (!user) {
    return null;
  }
  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include:{
      followers: true,
      followings: true
    }
  })
  const followings = profile?.followings
  
  const followingUser = await prisma.user.findMany({
    where: {
      id: {
        in: followings?.map((following) => following.followerId)
      } 
    },
  })
 
  return followingUser
}
export const getOthertUserFollowing = async (profileId:string) => { 
    const profile = await prisma.user.findUnique({
    where: {
      id: profileId,
    },
    include:{
      followers: true,
      followings: true
    }
  })
  const followings = profile?.followings
  
  const followingUser = await prisma.user.findMany({
    where: {
      id: {
        in: followings?.map((following) => following.followerId)
      } 
    },
  })
 
  return followingUser
}
export const getOthertUserFollowers = async (profileId:string) => { 
    const profile = await prisma.user.findUnique({
    where: {
      id: profileId,
    },
    include:{
      followers: true,
      followings: true
    }
  })
  const followers = profile?.followers
  
  const followerUser = await prisma.user.findMany({
    where: {
      id: {
        in: followers?.map((follower) => follower.followingId)
      }
    },
  })    
 
  return followerUser    
}