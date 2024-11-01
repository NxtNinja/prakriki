import { Droplet, Wind } from "lucide-react";
import Forecasts from "../Reusable/NextDayForecasts";
import { CurrentData } from "@/utils/types";
import HourlyForecast from "../Reusable/HourlyForecast";

const Hero = ({ data }: { data: CurrentData }) => {
  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString.replace(" ", "T")); // Convert to ISO format for parsing
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    });

    return `${formattedDate} ${formattedTime}`;
  };

  const getGreeting = (localTime: string): string => {
    const localDate = new Date(localTime.replace(" ", "T")); // Convert to ISO format for parsing
    const currentHour = localDate.getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  return (
    <>
      <div className="flex flex-col md:gap-20 gap-10 items-center text-slate-700 py-10 p-6">
        <div className="flex flex-col w-full gap-4">
          <div className="">
            <p className="text-2xl font-bold">
              {formatDateTime(data.location.localtime)},{" "}
              {getGreeting(data.location.localtime)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              <p className="md:text-3xl text-base">
                Current Temperature fetched from -{" "}
                <span className="font-bold">{data.location.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={data.current.condition.icon}
                alt="icon"
                className="w-20 h-20"
              />
              <p className="md:text-6xl text-3xl font-bold ">
                {data.current.temp_c}°C
              </p>
              <p className="md:text-5xl text-3xl font-bold">
                ({data.current.condition.text})
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <p className="flex items-center gap-3">
              <Wind size={30} />{" "}
              <span className="md:text-2xl text-sm">
                {data.current.wind_mph} mph
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Droplet size={30} />{" "}
              <span className="md:text-2xl text-sm">
                {data.current.humidity}%
              </span>
            </p>
          </div>
          <p className="md:text-xl text-base">
            Feels like -{" "}
            <span className="font-bold">{data.current.feelslike_c}°C</span>
          </p>
        </div>
        <div className="space-y-5">
          <HourlyForecast />
          <Forecasts />
        </div>
      </div>
    </>
  );
};

export default Hero;