import { getBookings } from "./apiBooking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";

function ListBooking() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  // Update a booking
  const updateBooking = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("bookings")
      .update(updatedFields)
      .eq("id", id);
    if (error) console.error(error);
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) console.error(error);
  };
  const queryClient = useQueryClient();

  const { isLoading2, mutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
        queryFn: ListBooking,
      });
    },
  });
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
  return (
    <div>
      <h2>Bookings {isLoading ? <span>"Loading...</span> : ""}</h2>
      <ul>
        {bookings?.map((booking) => (
          <li key={booking.id}>
            {booking.id} - {booking.numNights}
            <button
              onClick={() =>
                updateBooking(booking.id, { name: "Updated Name" })
              }
            >
              Update
            </button>
            <button onClick={() => mutate(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListBooking;
