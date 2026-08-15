import { supabase } from "../utils/supabase";

export async function getPersons() {
  const { data, error } = await supabase.from("persons").select("*");
  if (error) {
    console.error("Error fetching persons", error);
    throw error;
  }
  return data;
}

export async function createPerson(personData: any) {
  const { data, error } = await supabase
    .from("persons")
    .insert([personData])
    .select();
  if (error) {
    console.error("Error creating person", error);
    throw error;
  }
  return data;
}
