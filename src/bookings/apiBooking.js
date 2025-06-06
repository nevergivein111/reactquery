import supabase from "../supabase"; // Ensure this is correctly configured

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.log(error);
    throw new Error("Booking is not loaded");
  }

  return data;
}

export async function insertBookings(booking) {
  delete booking.maxnights;
  console.log(booking);
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
