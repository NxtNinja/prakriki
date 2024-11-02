import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

const RefetchButton = () => {
  const queryClient = useQueryClient();
  const refetchCurrentWeather = () => {
    queryClient.invalidateQueries({ queryKey: ["weather"] });
    queryClient.invalidateQueries({ queryKey: ["weather-forecast"] });
    queryClient.invalidateQueries({ queryKey: ["weather-daily"] });
    queryClient.invalidateQueries({ queryKey: ["weather-hourly"] });
  };
  return (
    <>
      <Button onClick={refetchCurrentWeather} className="md:w-fit">
        Refetch Current Weather
      </Button>
    </>
  );
};

export default RefetchButton;
