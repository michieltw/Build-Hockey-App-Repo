import { supabase } from "../utils/supabase";

export async function getLeagues() {
  const { data, error } = await supabase.from("leagues").select("*");
  if (error) {
    console.error("Error fetching leagues", error);
    throw error;
  }
  return data;
}
