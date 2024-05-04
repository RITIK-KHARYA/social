import { SignUp } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUp
        path="/sign-up"
        appearance={{
          baseTheme: [dark],
          elements: {
            formButtonPrimary:
              "bg-[#4CCD99] text-white border-1 border-[#4CCD99]/20 hover:bg-[#4CCD99]/90 hover:text-white",
            rootBox: "bg-[#1c1c1c] border-1 border-[#4CCD99]/20 ",
          },
        }}
        afterSignOutUrl={"/"}
        forceRedirectUrl={"/home"}
      />
      
    </div>
  );
}
