import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletenewBooking, getBookings } from "./apiBooking";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading2, mutate } = useMutation({
    mutationFn: deletenewBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
        queryFn: getBookings,
      });
    },
  });
  return { mutate, isLoading2 };
}
