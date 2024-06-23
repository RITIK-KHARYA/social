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
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import ImageUploader from "./imageUploader";
import Image from "next/image";
import { createPost } from "../actions/post";
import EmojiPicker from "./emojiPicker";
import { Textarea } from "@/components/ui/textarea";
import { useImageStore } from "@/hooks/use-modal-store";
import { IoClose } from "react-icons/io5";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(250,{
    message: "Username must be less than 250 characters.",
  }),
  image: z.optional(z.string()),
});

export function PostMaker() {

  const {imageUrl,setImageUrl}=useImageStore()
  const imageRef = useRef<HTMLDivElement>(null)
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
  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 mt-2 flex flex-col w-full h-[220px] max-h-72 relative"
      >
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-y-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      className="w-full align-start pb-28 overflow-x-hidden overflow-y-scroll ring-0 bg-neutral-950 focus:ring-0 offset-0 focus:offset-0 hover:offset-0 pt-4 offset-neutral-900 border-2 border-neutral-900/90 box-shadow-md box-shadow-white relative "
                     
                      {...field}
                    ></Textarea>
                    {imageUrl && (
                      <div className="flex w-[50px] h-fit p-1  rounded-md border-bg-neutral-900/90 box-shadow-md box-shadow-white absolute bottom-14 left-2 ">
                      <IoClose size={20} className="text-neutral-900 fill-white absolute top-0 right-0" onClick={() => setImageUrl(null)} />
                        <img
                          src={imageUrl}
                          alt="image"
                          width={200}
                          height={200}
                          className="rounded-lg "
                        />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0">
                      <EmojiPicker onChange={field.onChange} />
                    </div>
                  </div>
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
                  <div className="flex items-start absolute bottom-[7px] left-10 ">
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {/* {field.value && (
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
                    )} */}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col absolute bottom-2 justify-center  right-0 items-end ">
          <button
            className="bg-white text-black w-auto h-auto p-1 px-4 flex rounded-full items-center justify-center hover:bg-white/50"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </Form>
  );
}
