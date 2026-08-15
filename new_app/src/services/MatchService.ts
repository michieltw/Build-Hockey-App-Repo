import { supabase } from "../utils/supabase";

export async function createMatchEvent(
  matchId: string,
  type: string,
  time: string,
  description: string,
  period: number,
  teamId?: string,
  playerIds: string[] = [],
) {
  const { data, error } = await supabase
    .from("match_events")
    .insert([
      {
        match_id: matchId,
        type,
        time,
        description,
        period,
        team_id: teamId,
        player_ids: playerIds,
      },
    ])
    .select();
  if (error) {
    console.error("Error creating match event", error);
    throw error;
  }
  return data;
}

export async function saveMatch(matchData: any) {
  // This is a placeholder since the old code stored matches in a JSON object.
  // We'll map matchData to a Supabase insert.
  const { data, error } = await supabase
    .from("matches")
    .insert([matchData])
    .select();
  if (error) {
    console.error("Error saving match", error);
    throw error;
  }
  return data;
}

export async function getMatches() {
  const { data, error } = await supabase.from("matches").select("*");
  if (error) {
    console.error("Error fetching matches", error);
    throw error;
  }
  return data;
}
