const ChatsListSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto px-2 mt-5 animate-pulse">
      <div className="flex justify-end mb-2">
        <div className="max-w-[70%] sm:max-w-[60%] p-2 rounded-lg bg-foreground text-white">
          <div className="flex items-center">
            <div className="inline-block mr-2 bg-gray-200 h-10 w-10 rounded-full" />
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 rounded w-full mt-1" />
              <div className="h-4 bg-gray-200 rounded w-full mt-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="justify-start mb-2">
        <div className="max-w-[70%] sm:max-w-[60%] p-2 rounded-lg bg-gray-200">
          <div className="flex items-center">
            <div className="inline-block mr-2 bg-gray-200 h-10 w-10 rounded-full" />
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 rounded w-full mt-1" />
              <div className="h-4 bg-gray-200 rounded w-full mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsListSkeleton;
