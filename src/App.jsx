import { useState, useEffect } from "react";
import supabase from "./supabase"; // Ensure this is correctly configured
import ListBooking from "./bookings/listBooking";

function App() {
  const [newBooking, setNewBooking] = useState({ name: "", date: "" });
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

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

      <ListBooking />
    </div>
  );
}

export default App;
