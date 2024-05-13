"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Post, User, Like } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCurrentUser, useModalStore, usePostStore, useUserModal } from "@/hooks/use-modal-store";
import { Comment } from "@prisma/client";
import { useRouter } from "next/navigation";
import ImageUploader from "./imageUploader";
import ImageUpload from "./ImageUpload";
const formSchema = z.object({
  header: z.optional(z.string().min(0, {
    message: "uplaod the url of the header",
  })),
  name: z.optional(z.string().min(2, {
    message: "Username must be at least 2 characters.",
  })),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  avatar: z.optional(z.string().min(0, {
    message: "uplaod the url of the avatar",
  })),
  bio: z.optional(z.string().min(2, {
    message: "uplaod the url of the bio",
  })),
});

export function EditForm() {
  const {user}= useCurrentUser()
  const router = useRouter();
  const {onclose} = useUserModal()

  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      header: user.header || "",
      name:user.name || "",
      username:user?.username || "",
      avatar:user.image || "",
      bio:user?.bio || "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      setIsLoading(true);
      axios.patch("/api/profile", {
        data,
      });
      toast.success("Profile updated");
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
    finally{
      setIsLoading(false)
      onclose()
    }

  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="header"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Header</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} isImageUploading={isImageUploading} setIsImageUploading={setIsImageUploading} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user.name}
                    {...field}
                    className="focus-visible:ring-0 focus-visible:border-0 focus-visible:offset-0 text-white"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.username || ""}
                    {...field}
                    className="focus-visible:ring-0 focus-visible:border-0 focus-visible:offset-0 text-white"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.bio || ""}
                    {...field}
                    className="focus-visible:ring-0 focus-visible:border-0 focus-visible:offset-0 text-white"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-x-2  self-center">
            <Button type="submit" disabled={isImageUploading}>
              Add Comment
            </Button>
            <Button
              type="submit"
              className="bg-red-400 hover:bg-red-500"
              disabled={ isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
