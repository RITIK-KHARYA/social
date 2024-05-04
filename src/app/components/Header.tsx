import { SignIn, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";
import Button from "./Button";
import { ModeToggle } from "./Theme";
import { dark } from "@clerk/themes";
import { TbLogout } from "react-icons/tb";

export default function Header() {
  return (
    <header className="flex flex-col h-16 gap-y-6 border-b bg-white dark:border-neutral-200/20 shadow-sm drop-shadow-lg dark:bg-[#1c1c1c] sticky top-0 z-20 bg-neutral-850/90">
      <div className="flex items-center justify-between h-screen ml-10">
        <h1 className="text-4xl font-bold text-[#4CCD99] ">Socials</h1>
        <div className="mr-6 flex items-center justify-center gap-x-4">
          <ModeToggle />

          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="h-8 w-8 rounded-full">
              <UserButton  appearance={{ baseTheme: [dark] }}  />
            </div>
            <SignOutButton>
              <Button className="py-1 px-2 bg-red-500/90 hover:bg-red-500/60"><TbLogout size={20} /></Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}