import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "./apiBooking";
import supabase from "../supabase";
import { useState } from "react";
import NewEditForm from "./NewEditForm";

function BookingRow({ booking }) {
  const [showform, setShowform] = useState(false);

  const editForm = function () {};

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
        queryFn: getBookings,
      });
    },
  });
  return (
    <li>
      {booking.name} - {booking.numNights}
      <button
        onClick={() => updateBooking(booking.id, { name: "Updated Name" })}
      >
        Update
      </button>
      <button onClick={() => mutate(booking.id)}>Delete</button>
      <button onClick={() => setShowform((show) => !show)}>Edit</button>
      {showform && <NewEditForm booking={booking} />}
    </li>
  );
}

export default BookingRow;
