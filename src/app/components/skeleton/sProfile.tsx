 import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const PShimmer = () => {
  return (
    <Card className="flex flex-col w-full bg-neutral-950 box-shadow-md border-2 border-neutral-900 rounded-md  ">
      <CardHeader className="h-[100px] flex flex-colgap-y-1">
        <div className="flex  items-center justify-center w-fit p-1 gap-y-1 h-fit align-start border-2 border-neutral-900 hover:bg-neutral-900/40">
         <Skeleton className="w-[60px] h-[60px] rounded-md bg-neutral-800" />
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-2'>
        <Skeleton className='h-6 w-52 rounded-md bg-neutral-800' />
        <div className="flex flex-col gap-y-2">
          <Skeleton className='h-4 w-16 bg-neutral-800' />
          <Skeleton className='h-8 w-48 bg-neutral-800' />
        </div>
      </CardContent>
    </Card>
  );
};