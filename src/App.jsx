import { useState, useEffect } from "react";
import supabase from "./supabase"; // Ensure this is correctly configured
import { getBookings } from "./bookings/apiBooking";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: "", date: "" });
  const [error, setError] = useState(null);

  const x = useQuery({
    queryKey: ["booking"],
    queryFn: getBookings,
  });
  console.log(x);

  // Fetch all bookings
  const fetchBookings = function () {
    const promise = getBookings();
    promise.then(function (data) {
      console.log(data);
      setBookings(data);
    });
  };

  // Add a new booking
  const addBooking = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .insert([newBooking]);
    if (error) {
      setError(error.message);
    } else {
      setBookings((prev) => [...prev, ...data]);
      setNewBooking({ name: "", date: "" });
    }
  };

  // Update a booking
  const updateBooking = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("bookings")
      .update(updatedFields)
      .eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, ...data[0] } : booking
        )
      );
    }
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  console.log(bookings);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <h1>Supabase CRUD Example</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Add Booking</h2>
      <input
        type="text"
        placeholder="Name"
        value={newBooking.name}
        onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
      />
      <input
        type="date"
        value={newBooking.date}
        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
      />
      <button onClick={addBooking}>Add</button>

      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
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
    </QueryClientProvider>
  );
}

export default App;
