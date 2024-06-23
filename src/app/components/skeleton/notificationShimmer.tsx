import { Card, CardHeader} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const NotificationShimmer = () => {
  return (
    <div className="flex flex-col gap-y-2 h-full">
        {new Array(5).fill(0).map((_, index) => (
      <Card
        className=" border-2 border-neutral-900 bg-[#121212] rounded-md w-full box-shadow-md h-20 hover:bg-neutral-900/20 cursor-pointer "
       
      >
        <CardHeader className="flex flex-row justify-between w-full">
          <div className="flex flex-row">
            <Skeleton className="w-[40px] h-[40px] bg-neutral-800 rounded-full" />
            <div className="flex ml-2 items-center">
              <Skeleton className="w-[200px] h-[20px] bg-neutral-800 rounded-md" />
              
            
            </div>
          </div>
        </CardHeader>
      </Card>
    ))}
    </div>
  );
};