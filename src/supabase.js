import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fhmcxnxsoqkgrdvgnodq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobWN4bnhzb3FrZ3Jkdmdub2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzg5ODgsImV4cCI6MjA2MTI1NDk4OH0.PLhlEbbK78ThOzULKJhP6XMJ2EiuBm9R6tbK6-ACszI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
