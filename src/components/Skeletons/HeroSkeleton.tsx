import { Droplet, Wind } from "lucide-react";

const HeroSkeleton = () => {
  return (
    <div className="flex flex-col md:gap-20 gap-10 items-center text-slate-700 py-10 p-6">
      <div className="flex flex-col w-full gap-4">
        <div className="">
          <p className="text-2xl font-bold animate-pulse bg-gray-200 h-6 w-1/3 rounded"></p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <p className="md:text-3xl text-base animate-pulse bg-gray-200 h-4 w-1/2 rounded"></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="animate-pulse bg-gray-200 w-20 h-20 rounded"></div>
            <p className="md:text-6xl text-3xl font-bold animate-pulse bg-gray-200 h-10 w-16 rounded"></p>
            <p className="md:text-5xl text-3xl font-bold animate-pulse bg-gray-200 h-6 w-28 rounded"></p>
          </div>
        </div>
        <div className="flex gap-3">
          <p className="flex items-center gap-3">
            <Wind size={30} className="animate-pulse bg-gray-200" />{" "}
            <span className="md:text-2xl text-sm animate-pulse bg-gray-200 h-4 w-12 rounded"></span>
          </p>
          <p className="flex items-center gap-3">
            <Droplet size={30} className="animate-pulse bg-gray-200" />{" "}
            <span className="md:text-2xl text-sm animate-pulse bg-gray-200 h-4 w-12 rounded"></span>
          </p>
        </div>
        <p className="md:text-xl text-base animate-pulse bg-gray-200 h-4 w-1/2 rounded"></p>
      </div>
    </div>
  );
};

export default HeroSkeleton;
