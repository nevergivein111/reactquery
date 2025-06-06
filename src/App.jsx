import { useState, useEffect } from "react";
import supabase from "./supabase"; // Ensure this is correctly configured
import ListBooking from "./bookings/listBooking";
import { useForm } from "react-hook-form";
import { insertBookings } from "./bookings/apiBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const { register, handleSubmit, reset, getValues } = useForm();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: insertBookings,
    onSuccess: () => {
      console.log("inseerted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      reset();
    },
  });

  function aftersubmit(data) {
    console.log(data);
    mutate(data);
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <div>
      <h1>Supabase CRUD Example</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Add Booking</h2>
      <form onSubmit={handleSubmit(aftersubmit, onError)}>
        <input
          type="text"
          placeholder="numNights"
          name="numNights"
          {...register("numNights", {
            required: "this field is required.",
            validate: (value) =>
              value <= getValues().maxnights ||
              "Value must be less than " + getValues().maxnights,
          })}
        />
        <input
          type="text"
          placeholder="name"
          name="name"
          {...register("name", { required: "this field is required." })}
        />
        <input
          type="text"
          placeholder="cabinId"
          name="cabinId"
          {...register("cabinId", { required: "this field is required." })}
        />
        <input
          type="hidden"
          placeholder="maxnights"
          name="maxnights"
          value="20"
          {...register("maxnights")}
        />

        <input
          type="text"
          placeholder="numNiguestIdghts"
          name="guestId"
          {...register("guestId", { required: "this field is required." })}
        />

        <button>Add</button>
      </form>
      <ListBooking />
    </div>
  );
}

export default App;
