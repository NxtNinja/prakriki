const ForecastsSkeleton = () => {
  return (
    <>
      <p className="font-bold animate-pulse bg-gray-200 h-4 w-1/4 rounded mb-4"></p>
      <div className="grid grid-cols-3 md:grid-cols-7">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="p-2 py-7 rounded-xl text-center flex flex-col gap-2 justify-center items-center"
          >
            <div className="animate-pulse bg-gray-200 w-10 h-10 rounded mb-2"></div>
            <p className="animate-pulse bg-gray-200 h-4 w-16 rounded mb-2"></p>
            <p className="text-xl font-bold animate-pulse bg-gray-200 h-6 w-12 rounded"></p>
            <p className="font-bold text-sm animate-pulse bg-gray-200 h-4 w-24 rounded"></p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ForecastsSkeleton;
