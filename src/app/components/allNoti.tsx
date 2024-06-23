import { Card, CardHeader} from '@/components/ui/card';

export const AllNoti = ({notification}:any) => {
  return (
      <Card
              className=" border-2 border-neutral-900 bg-[#121212] rounded-md w-full box-shadow-md h-20 hover:bg-neutral-900/20 cursor-pointer "
              key={notification.id}
            >
              <CardHeader className="flex flex-row justify-between w-full">
                <div className="flex flex-row">
                  <img
                    src={notification.user.image || "/images/images.png"}
                    alt="avatar"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <div className="flex ml-2 items-center">
                    <p className="text-neutral-300 font-mono ">{notification.user.name}{notification.content}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
  );
};