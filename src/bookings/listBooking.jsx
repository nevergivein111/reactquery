import { getBookings } from "./apiBooking";
import { useQuery } from "@tanstack/react-query";
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
  if (isLoading) console.log("Loading...");
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

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
            <button onClick={() => deleteBooking(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListBooking;
