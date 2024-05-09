export default function Loading() {
  return (
    <div className="flex flex-col px-2 h-screen gap-y-20 dark:bg-[#232323] bg-white mt-2 w-[50%] rounded-md">
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-900"></div>
      </div>
    </div>
  );
}