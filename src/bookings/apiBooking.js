import supabase from "../supabase"; // Ensure this is correctly configured

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    throw new Error("Booking is not loaded");
  }

  return data;
}

export async function insertBookings(booking) {
  delete booking.maxnights;

  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Booking is not loaded");
  }

  return data;
}

export async function editBookings(booking) {
  delete booking.maxnights;

  const { id: editId, ...editValues } = booking;

  const { data, error } = await supabase
    .from("bookings")
    .update(editValues)
    .eq("id", editId)
    .select();

  if (error) {
    throw new Error("Booking is not loaded");
  }

  return data;
}

export async function deletenewBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) console.error(error);
}
