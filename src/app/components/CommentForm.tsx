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
import useModalStore from "@/hooks/use-modal-store"
interface CommentFormProps {
  post: (Post & { author: User } & { likes: Like[] });
  postId: string;
}
const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function CommentForm({post,postId}: CommentFormProps) {
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
            postId,
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
     }
    }


  return (
    <>
      <div className="flex flex-col gap-y-4 bg- p-4 rounded-md bg-neutral-950">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-1" >
            <div>
              <Image
                src={post.author.image || "/images/images.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-slate-500">
                {"@" + post.author.username}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-slate-300">{post.content}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-2 w-20 bg-slate-900 rounded-lg rotate-90 mr-12 -z-10">

      </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input placeholder="reply " {...field} className="focus:ring-0 focus:border-0 focus:offset-0" />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>Add Comment</Button>
        </form>
      </Form>
    </>
  );
}

