import { CoordinatesAtom } from "@/utils/CoordinatesAtom";
import { ForecastDaysData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import ForecastsSkeleton from "../Skeletons/ForecastsSkeleton";

const HourlyForecast = () => {
  const [coords, setCoords] = useAtom(CoordinatesAtom);
  const api = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;

  const { data, isLoading, isFetched, isFetching, isSuccess } = useQuery({
    queryKey: ["weather-hourly", coords],
    queryFn: async () => {
      if (coords.lat && coords.lon) {
        const res = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: api,
              q: `${coords.lat},${coords.lon}`,
              days: 1,
            },
          }
        );
        const data = res.data;
        return data as ForecastDaysData;
      }
    },
  });

  console.log(data);

  const formatTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString.replace(" ", "T")); // Convert to ISO format for parsing
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    });

    return `${formattedTime}`;
  };

  const isCurrentHour = (hourTime: string) => {
    const currentHour = new Date().getHours();
    const forecastHour = new Date(hourTime.replace(" ", "T")).getHours();
    return currentHour === forecastHour;
  };

  if (isLoading || isFetching) {
    return <ForecastsSkeleton />;
  }

  if (isFetched && isSuccess && data) {
    return (
      <>
        <p className="font-bold">Hourly Forecast</p>
        <div className="grid grid-cols-3 md:grid-cols-7">
          {data?.forecast.forecastday[0].hour.map((hour) => (
            <div
              key={hour.time}
              className={`p-4 py-7 rounded-xl flex flex-col gap-2 justify-center items-center text-center ${
                isCurrentHour(hour.time) ? "border border-blue-500" : ""
              }`}
            >
              <img src={hour.condition.icon} alt="icon" className="w-10 h-10" />
              <p className="">{formatTime(hour.time)}</p>
              <p className="text-xl font-bold ">20°C</p>
              <p className="font-bold text-sm">{hour.condition.text}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default HourlyForecast;
