import { useState, useEffect, cloneElement } from "react";
import supabase from "./supabase"; // Ensure this is correctly configured
import ListBooking from "./bookings/listBooking";
import { useForm } from "react-hook-form";
import { insertBookings } from "./bookings/apiBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "./Modal";
import Uploader from "./data/Uploader";
import React from "react";

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
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const errors = formState.errors;

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

  // MouseTracker component that accepts a render function as a prop
  const MouseTracker = ({ render }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    return (
      <div style={{ height: "100vh" }} onMouseMove={handleMouseMove}>
        {render(position)}
      </div>
    );
  };

  function onError(errors) {}

  const Parent = ({ children }) => {
    return cloneElement(children, {
      onClick: () => alert("Clicked from Parent!"),
    });
  };

  return (
    <div>
      <h1>Supabase CRUD Example</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Modal>
        <Modal.OpenButton>Open Modal</Modal.OpenButton>

        <Modal.Container>
          <Modal.Header>Modal Title</Modal.Header>
          <Modal.Body>This is the modal body.</Modal.Body>
          <Modal.Footer>
            <button>Custom Footer Button</button>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <Parent>
        <button>Click Me</button>
      </Parent>

      <Uploader />

      <div>
        <h1>Track the Mouse (Using render prop)</h1>
        <MouseTracker
          render={({ x, y }) => (
            <p>
              Mouse position: ({x}, {y})
            </p>
          )}
        />
      </div>

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
        <div className="error"> {errors?.numNights?.message}</div>
        <input
          type="text"
          placeholder="name"
          name="name"
          {...register("name", { required: "this field is required." })}
        />
        <div className="error"> {errors?.name?.message}</div>
        <input
          type="text"
          placeholder="cabinId"
          name="cabinId"
          {...register("cabinId", { required: "this field is required." })}
        />
        <div className="error"> {errors?.cabinId?.message}</div>
        <input
          type="hidden"
          placeholder="maxnights"
          name="maxnights"
          value="20"
          {...register("maxnights")}
        />
        <input
          type="text"
          placeholder="guestId"
          name="guestId"
          {...register("guestId", { required: "this field is required." })}
        />
        <div className="error"> {errors?.guestId?.message}</div>
        <button>Add</button>
      </form>
      <ListBooking />
    </div>
  );
}

export default App;
