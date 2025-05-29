import supabase from "../supabase"; // Ensure this is correctly configured

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.log(error);
    throw new Error("Booking is not loaded");
  }

  return data;
}
