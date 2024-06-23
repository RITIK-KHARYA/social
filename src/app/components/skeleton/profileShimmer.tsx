import { Skeleton } from "@/components/ui/skeleton"
export default function ProfileShimmer() {
  return (
     <div className="bg-[#121212] h-screen w-full flex flex-col px-2 mt-2 p-2 rounded-md  overflow-scroll">
      <div className="relative h-72 ">
       <div>
        <Skeleton className="w-[90%] bg-neutral-800 h-[200px] rounded-md" />
       </div>
        <div className="absolute -bottom-[28px] left-4">
          <Skeleton className="w-[150px] h-[150px] bg-neutral-900 rounded-full" />
        </div>
      </div>
      <div className="border-b-2 border-neutral-900 w-full h-64">
        <div className="flex justify-end">
          <Skeleton className="w-14 h-8 bg-neutral-800 rounded-full" />
        </div>
        <div className="mt-4 px-4">
          <div className="flex flex-col gap-y-1 ">
            <Skeleton className=" w-full h-20 bg-neutral-800  text-xl font-mono" />
          </div>
        </div>
      </div>
      </div>

  )
}