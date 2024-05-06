import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { TextareaDemo } from "@/app/components/Comment";
const MessagesPage = () => {
  return (
    <div className="flex px-2 h-screen gap-y-4 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
      <div className="w-full flex flex-grow grid-flow-col">
        <div className=" relative bottom-0 w-screen bg-[#232323] text-white flex items-center justify-center">
          <div className=" m-2 w-6/12  fixed bottom-0">
            <TextareaDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
