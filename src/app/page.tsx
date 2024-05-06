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
      <div className="flex flex-col items-center justify-center h-screen gap-y-8 ">
        <h1 className="text-6xl text-[#4CCD99] font-bold filter cursor-default">
          <b className="text-6xl text-[#CFCFCF] font-bold filter">Welcome to</b>{" "}
          Socials!
        </h1>
        <TextGenerateEffect
          words="Socials is a platform where you can share your thoughts and ideas with people around the world"
          className="text-5xl text-slate-300/90 text-center text-wrap w-[60%]"
        />

        <div className="flex  items-center justify-center  gap-x-4 gap-y-6 py-2">
          <SignInButton>
            <Button>Sign In</Button>
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
