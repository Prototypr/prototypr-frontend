const Skeleton = () => {
  return (
    <div className="flex flex-row justify-between p-4 md:p-6 h-full rounded-lg border shadow-sm border-black/5 cursor-default bg-white col-span-12">
      <div className="flex flex-col grid gap-2">
        <div className="h-4 animate-pulse bg-gray-200 rounded w-[400px] max-w-full"></div>
        <div className="h-6 animate-pulse bg-gray-200 rounded w-3/4"></div>
        <div className="flex mt-2">
          <div className="h-4 animate-pulse bg-gray-200 rounded w-1/4"></div>
          <div className="mx-2 animate-pulse my-auto text-sm text-gray-500">{` · `}</div>
          <div className="h-4 animate-pulse bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      <div className="flex flex-row gap-1 my-auto">
        <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;
