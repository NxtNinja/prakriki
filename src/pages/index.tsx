import Hero from "@/components/Home/Hero";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrentData, ForecastDaysData } from "@/utils/types";
import { useAtom } from "jotai";
import { CoordinatesAtom } from "@/utils/CoordinatesAtom";
import HeroSkeleton from "@/components/Skeletons/HeroSkeleton";
import SearchBox from "@/components/SearchBox";

const index = () => {
  const [coords, setCoords] = useAtom(CoordinatesAtom);

  const api = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by your browser");
      return;
    }
  }, []);

  const { data, isLoading, isFetched, isFetching, isSuccess } = useQuery({
    queryKey: ["weather", coords],
    queryFn: async () => {
      if (coords.lat && coords.lon) {
        const res = await axios.get(
          "https://api.weatherapi.com/v1/current.json",
          {
            params: {
              key: api,
              q: `${coords.lat},${coords.lon}`,
            },
          }
        );
        const data = res.data;
        return data as CurrentData;
      }
    },
  });
  const {
    data: forecastInfo,
    isLoading: isLoadingForecast,
    isFetched: isFetchedForecast,
    isFetching: isFetchingForecast,
    isSuccess: isSuccessForecast,
  } = useQuery({
    queryKey: ["weather-forecast", coords],
    queryFn: async () => {
      if (coords.lat && coords.lon) {
        const res = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: api,
              q: `${coords.lat},${coords.lon}`,
            },
          }
        );
        const data = res.data;
        return data as ForecastDaysData;
      }
    },
  });

  if (isLoading || isFetching) {
    return <HeroSkeleton />;
  }

  if (isFetched && isSuccess && data && forecastInfo) {
    return (
      <>
        <div className="grid place-items-center h-screen">
          <div className="w-full h-full flex justify-center items-center">
            <SearchBox />
            <Hero data={data} forecastInfo={forecastInfo} />
          </div>
        </div>
      </>
    );
  }
};

export default index;
