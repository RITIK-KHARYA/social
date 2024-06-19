"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";

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
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import ImageUploader from "./imageUploader";
import Image from "next/image";
import { createPost } from "../actions/post";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(250,{
    message: "Username must be less than 250 characters.",
  }),
  image: z.optional(z.string()),
});

export function PostMaker() {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
          content: "",
          image: "",
        },
      resolver: zodResolver(formSchema),
    });
    const  { register, handleSubmit, formState: { errors } } = form;
   const onSubmit = async (data: z.infer<typeof formSchema>) => {
   
       try {
         setIsLoading(true);
        //  await axios.post("/api/post", data)
        await createPost(data)
         toast.success("Post created successfully");
       } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
       } finally {
         setIsLoading(false);
         form.reset();
       }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 mt-2 flex flex-col w-full max-h-56 relative"
      >
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="w-full align-start pb-40 ring-0 focus:ring-0 offset-0 focus:offset-0 hover:offset-0 pt-4 bg-slate-950"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            rules={{ required: false }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start">
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {field.value && (
                      <div className="">
                      <Image
                        src={field.value ?? ""}
                        alt="image"
                        width={200}
                        height={200}
                        className="rounded-lg"
                        quality={100}
                        priority
                      />
                    </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          <Button
            className="bg-[#1CBF73] w-[20%] h-8 flex items-center justify-center"
            type="submit"
          >
            Post
          </Button>
      </form>
    </Form>
  );
}
