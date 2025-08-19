const UserListSkeleton = () => {
  return (
    <div className="w-full mx-auto  rounded animate-pulse">
      {/* <div className="border-b border-gray-200 h-8" /> */}
      <div className="">
        <div className="flex items-center justify-between p-3 mb-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gray-200 rounded-full" />
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default UserListSkeleton;
