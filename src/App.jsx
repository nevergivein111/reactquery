import { useState, useEffect } from "react";
import supabase from "./supabase"; // Ensure this is correctly configured
import ListBooking from "./bookings/listBooking";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm();
  function aftersubmit(data) {
    console.log(data);
  }
  return (
    <div>
      <h1>Supabase CRUD Example</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Add Booking</h2>
      <form onSubmit={handleSubmit(aftersubmit)}>
        <input
          type="text"
          placeholder="numNights"
          name="numNights"
          {...register("numNights")}
        />
        <input type="text" name="cabinId" {...register("cabinId")} />
        <input type="text" name="guestId" {...register("guestId")} />

        <button>Add</button>
      </form>
      <ListBooking />
    </div>
  );
}

export default App;
