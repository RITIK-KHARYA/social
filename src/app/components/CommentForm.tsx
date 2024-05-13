"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Post,User,Like } from "@prisma/client"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useModalStore, usePostStore } from "@/hooks/use-modal-store"
import { Comment } from "@prisma/client";
import { useRouter } from "next/navigation"
interface CommentFormProps {
  post: (Post & { author: User } & { likes: Like[] }& {comments: Comment[]});
  postId: string;
}
const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function CommentForm({post,postId}: CommentFormProps) {
  const router = useRouter()
  const {postid } = usePostStore();
    const {onclose} = useModalStore();

    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
          comment: "",
        },
      resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      
     try{
        setIsLoading(true)
        axios.post("/api/comment",{
            postid,
            data
        })
        toast.success("Comment added")
        onclose()

     } catch (error) {
       console.log(error)
       toast.error("Something went wrong")
     }
     finally {
        setIsLoading(false)
        router.refresh()
     }
    }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input
                    placeholder="reply "
                    {...field}
                    className="focus:ring-0 focus:border-0 focus:offset-0"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2  self-center">
            <Button type="submit" disabled={isLoading}>
              Add Comment
            </Button>
            <Button
              type="submit"
              className="bg-red-400 hover:bg-red-500"
              disabled={isLoading}
              onClick={onclose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

