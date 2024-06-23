"use client";

import { IoChevronBack } from "react-icons/io5";
interface BackProps {
  title: string;
}
  const handleback = () => {
    history.back();
  };
export default function Back({ title }: BackProps) {
  return (
     <div className="flex items-center w-full h-12 py-4 space-x-4 border-b-2 border-neutral-900">
        <div
          className="flex items-center justify-between w-8 h-8 rounded-full bg-slate-300/10 hover:bg-slate-300/5 p-2 "
          onClick={handleback}
        >
          <IoChevronBack
            className="text-2xl fill-black h-6 w-6 "
            height={30}
            width={30}
          />
        </div>
        <h1 className="text-lg font-bold text-center">{title}</h1>
      </div>
  )
}