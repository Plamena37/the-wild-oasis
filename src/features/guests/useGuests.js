import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiBookings";

export const useGuests = () => {
  const {
    isLoading,
    data: guests,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { isLoading, guests, count: guests.length, error };
};
