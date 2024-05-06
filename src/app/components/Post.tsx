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
const formSchema = z.object({
  content: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(250,{
    message: "Username must be less than 250 characters.",
  }),
});

export function Post() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
          content: "",
        },
      resolver: zodResolver(formSchema),
    });
    const  { register, handleSubmit, formState: { errors } } = form;
   const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try{
        setIsLoading(true);
        await axios.post("/api/post", data);
        toast.success("Post Successful");
        
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong");
        
      }
      finally {
        setIsLoading(false);
        form.reset();
      }
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full max-h-56">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Socials Post</FormLabel>
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
        <Button className="bg-[#1CBF73] w-[20%] h-8 flex items-center justify-center" type="submit">Post</Button>
      </form>
    </Form>
  );
}
