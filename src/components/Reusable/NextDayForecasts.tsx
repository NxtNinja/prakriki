import { CoordinatesAtom } from "@/utils/CoordinatesAtom";
import { ForecastDaysData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";

const Forecasts = () => {
  const [coords, setCoords] = useAtom(CoordinatesAtom);
  const api = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;

  const { data, isLoading, isFetched, isFetching, isSuccess } = useQuery({
    queryKey: ["weather-daily", coords],
    queryFn: async () => {
      if (coords.lat && coords.lon) {
        const res = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: api,
              q: `${coords.lat},${coords.lon}`,
              days: 7,
            },
          }
        );
        const data = res.data;
        return data as ForecastDaysData;
      }
    },
  });

  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString.replace(" ", "T")); // Convert to ISO format for parsing
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    return `${formattedDate}`;
  };

  if (isFetched && isSuccess && data) {
    return (
      <>
        <p className="font-bold">Upcoming days</p>
        <div className="grid grid-cols-3 md:grid-cols-7">
          {data?.forecast?.forecastday.map((day) => (
            <div
              key={day.date}
              className={`p-2 py-7 rounded-xl text-center flex flex-col gap-2 justify-center items-center ${
                formatDate(day.date) === formatDate(data.location.localtime) &&
                "border border-slate-400"
              }`}
            >
              <img
                src={day.day.condition.icon}
                alt="icon"
                className="w-10 h-10"
              />
              {formatDate(day.date) === formatDate(data.location.localtime) ? (
                <p className="">Today</p>
              ) : (
                <p className="">{formatDate(day.date)}</p>
              )}

              <p className="text-xl font-bold ">{day.day.maxtemp_c}°C</p>
              <p className="font-bold text-sm">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Forecasts;
