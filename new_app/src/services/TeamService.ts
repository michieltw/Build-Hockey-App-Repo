import { supabase } from "../utils/supabase";

export async function getTeams() {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) {
    console.error("Error fetching teams", error);
    throw error;
  }
  return data;
}
