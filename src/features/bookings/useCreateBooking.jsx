import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createEditBooking,
    onSuccess: () => {
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { createBooking, isCreating };
};
