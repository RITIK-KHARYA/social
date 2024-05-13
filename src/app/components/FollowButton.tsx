"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface FollowButtonProps {
    userId: string;
    currentUser: string ,
    isFollowing: boolean | undefined
}

export default function FollowButton({ userId , currentUser , isFollowing }: FollowButtonProps) {
    const router = useRouter()
    const [isFollow, setIsFollowing] = useState(isFollowing);
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async() => {
        setIsLoading(true);
        try{
            if(!isFollowing){
                await axios.post(`/api/follow/`,{
                    userId
                })
                toast.success("Followed");
                setIsFollowing(true);
                router.refresh();
                
            }else{
                await axios.delete(`/api/follow/`, {
                    data:{
                        userId:userId
                    }
                })
                toast.success("Unfollowed");
                setIsFollowing(false);
                router.refresh();
            }
        }catch(e){
            console.log(e)
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
        
    }

  return (
    <Button className="w-28 h-8 rounded-md  self-end flex flex-end cursor-pointer" onClick={handleClick}>
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );

}
   