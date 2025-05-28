import { useState, useEffect } from "react";
import supabase from "./supabase"; // Ensure this is correctly configured

function App() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: "", date: "" });
  const [error, setError] = useState(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*");
    if (error) {
      setError(error.message);
    } else {
      setBookings(data);
    }
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
    <div>
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
    </div>
  );
}

export default App;
