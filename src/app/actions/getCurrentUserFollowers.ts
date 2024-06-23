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
  console.log(profile?.followers.length)
  const followings = profile?.followings
  
  const followingUser = await prisma.user.findMany({
    where: {
      id: {
        in: followings?.map((following) => following.followerId)
      } 
    },
  })
    console.log(profile?.followers.length);
    
 
  return followingUser
}
export const getOthertUserFollowers = async (followerId:string) => { 
    const profile = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
    include:{
      followers: true,
      followings: true
    }
  })
  console.log(profile)
  if(!profile?.followers){
    return null;
  }
  console.log(profile?.followers.length)

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