import { Match, MatchEvent, AppDatabase } from '../types';
import { getDatabaseSync, saveDatabase } from './DatabaseService';
import { supabase } from './supabaseClient';

export function scheduleMatch(match: Omit<Match, 'id' | 'status'>): AppDatabase {
  const db = getDatabaseSync();
  const id = `match-${Date.now()}`;
  db.matches.push({
    ...match,
    id,
    status: 'Gepland'
  });

  supabase.from('games').insert([{
    id,
    status: 'Gepland',
    date: match.date,
    home_team_id: match.homeTeamId,
    away_team_id: match.awayTeamId,
  }]).then(({ error }) => {
    if (error) console.error('Failed to create match in Supabase', error);
  });
  saveDatabase(db); return db;
}

export function updateMatchScore(matchId: string, status: Match['status'], events: MatchEvent[], homeScore: number, awayScore: number): AppDatabase {
  const db = getDatabaseSync();
  const matchIndex = db.matches.findIndex(m => m.id === matchId);
  if (matchIndex === -1) return db;

  const currentMatch = db.matches[matchIndex];
  db.matches[matchIndex] = {
    ...currentMatch,
    status,
    events,
    homeScore,
    awayScore
  };

  supabase.from('games').update({
    status,
    home_score: homeScore,
    away_score: awayScore
    // you would also map events here if the schema supported it directly
  }).eq('id', matchId).then(({ error }) => {
    if (error) console.error('Failed to update match status in Supabase', error);
  });

  saveDatabase(db); return db;
}

export function assignRefereesToMatch(matchId: string, referees: string[]): AppDatabase {
  const db = getDatabaseSync();
  const matchIndex = db.matches.findIndex(m => m.id === matchId);
  if (matchIndex === -1) return db;

  db.matches[matchIndex].referees = referees;
  saveDatabase(db); return db;
}

export function addMatch(match: Match): AppDatabase {
  const db = getDatabaseSync();
  db.matches.push(match);
  saveDatabase(db);
  return db;
}

export function resetMatch(matchId: string): AppDatabase {
  const db = getDatabaseSync();
  db.matches = db.matches.map(m => {
    if (m.id === matchId) {
      return {
        ...m,
        status: 'Gepland',
        homeScore: 0,
        awayScore: 0,
        events: []
      };
    }
    return m;
  });
  saveDatabase(db);
  return db;
}
