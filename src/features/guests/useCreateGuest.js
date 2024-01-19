import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createGuest as createGuestApi } from "../../services/apiBookings";

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success("New guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { createGuest, isCreating };
};
