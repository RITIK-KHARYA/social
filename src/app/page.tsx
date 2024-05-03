import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Sign } from "crypto";
import Button from "./components/Button";


export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen  gap-y-4 bg-[#1c1c1c] ">
      <div className="flex flex-col items-center justify-center h-screen gap-y-6">
        <h1 className="text-6xl text-[#4CCD99] font-bold filter">
          Welcome to Socials!
        </h1>
        <span className="text-4xl text-slate-300 text-center text-wrap">
          A platform where you can share your thoughts and ideas with people
          around the world
        </span>
        <div className="flex  items-center justify-center  gap-x-4">
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
