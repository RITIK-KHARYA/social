import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
export default function PostShimmer() {
  return (
    <>
      {new Array(5).fill(0).map((_, index) => (
        <Card className="w-full h-fit bg-[#121212] border-2 border-neutral-900 group px-2 py-4 box-shadow-md shadow-inner">
          <CardHeader>
            <div className="flex flex-row gap-x-2 justify-between">
              <div className="flex flex-row gap-x-2  ">
                <Skeleton className="h-[50px] w-[50px] rounded-full bg-neutral-800" />
                <div className="space-y-1 flex flex-col">
                  <Skeleton className="h-4 w-[150px] bg-neutral-800" />
                  <Skeleton className="h-4 w-[100px] bg-neutral-800" />
                </div>
              </div>
              <div className="rounded-md h-fit px-1  hover:bg-neutral-900/50  cursor-pointer">
                <Skeleton className="h-4 w-[50px] bg-neutral-800" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-1">
              <Skeleton className="h-32 w-[100%] bg-neutral-800" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-row gap-x-2 justify-between">
            <div className="flex flex-row gap-x-2">
              <Skeleton className="h-6 w-6 rounded-full bg-neutral-800" />
              <Skeleton className="h-6 w-6 rounded-full bg-neutral-800" />
              <Skeleton className="h-6 w-6 rounded-full bg-neutral-800" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}