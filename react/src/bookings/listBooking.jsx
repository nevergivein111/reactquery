import { getBookings } from "./apiBooking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { useState } from "react";
import NewEditForm from "./NewEditForm";
import BookingRow from "./BookingRow";

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

  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
  return (
    <div>
      <h2>Bookings {isLoading ? <span>"Loading...</span> : ""}</h2>
      <ul>
        {bookings?.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </ul>
    </div>
  );
}

export default ListBooking;
