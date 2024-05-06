import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Sign } from "crypto";
import Button from "./components/Button";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    return redirect("/home");
  }
  return (
    <main className="flex flex-col items-center h-full  gap-y-4 dark:bg-[#1c1c1c] bg-white ">
      <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-emerald-600 to-lime-300 absolute top-10 left-10 blur-[80px] opacity-10"></div>
      <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-emerald-600 to-lime-300 absolute bottom-10 right-10 blur-[80px] opacity-10 rotate-90"></div>
      <div className="flex flex-col items-center justify-center h-screen gap-y-8 gap-x-4 px-2">
        <div className="flex f items-center justify-center rounded-md gap-x-4 ">
          <h1 className="text-6xl text-[#1CBF73] font-bold filter cursor-default">
            <b className="text-6xl text-[#CFCFCF] font-bold filter">
              Welcome to
            </b>
          </h1>
          <div className="flex items-center justify-center bg-[#1CBF73] w-[240px] h-[70px] rounded-md">
            <span className="text-white text-6xl">Socials</span>
          </div>
        </div>

        <TextGenerateEffect
          words="Socials is a platform where you can share your thoughts and ideas with people around the world
          Unfiltered. Uncensored. Unchained. Share your truth on Social."
          className="text-5xl text-slate-300/90 text-center text-wrap w-[60%]"
        />

        <div className="flex  items-center justify-center  gap-x-4 gap-y-6 py-2">
          <SignInButton>
            <Button className="bg-[#1CBF73] ">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="bg-neutral-800 hover:bg-neutral800/ ">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </main>
  );
}
