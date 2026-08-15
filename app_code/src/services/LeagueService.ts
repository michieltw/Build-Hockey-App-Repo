import { League, AppDatabase } from '../types';
import { getDatabaseSync, saveDatabase } from './DatabaseService';
import { supabase } from './supabaseClient';

export function createLeague(league: Omit<League, 'id'>): AppDatabase {
  const db = getDatabaseSync();
  const id = `league-${Date.now()}`;
  db.leagues.push({
    ...league,
    id
  });

  supabase.from('leagues').insert([{
    id,
    name: league.name,
  }]).then(({ error }) => {
    if (error) console.error('Failed to create league in Supabase', error);
  });

  saveDatabase(db); return db;
}

export function updateLeagueDetails(leagueId: string, updates: Partial<League>): AppDatabase {
  const db = getDatabaseSync();
  db.leagues = db.leagues.map(l => l.id === leagueId ? { ...l, ...updates } : l);
  supabase.from('leagues').update({ name: updates.name }).eq('id', leagueId).then(({ error }) => {
    if (error) console.error('Failed to update league in Supabase', error);
  });
  saveDatabase(db); return db;
}

// Add/remove teams to/from a league
export function toggleTeamInLeague(leagueId: string, teamId: string): AppDatabase {
  const db = getDatabaseSync();

  db.leagues = db.leagues.map(l => {
    if (l.id === leagueId) {
      const exists = l.teamIds.includes(teamId);
      const teamIds = exists ? l.teamIds.filter(id => id !== teamId) : [...l.teamIds, teamId];
      return { ...l, teamIds };
    }
    return l;
  });

  db.teams = db.teams.map(t => {
    if (t.id === teamId) {
      const exists = t.leagueIds.includes(leagueId);
      const leagueIds = exists ? t.leagueIds.filter(id => id !== leagueId) : [...t.leagueIds, leagueId];
      return { ...t, leagueIds };
    }
    return t;
  });

  saveDatabase(db); return db;
}

export function updateRulesCMS(rules: string): AppDatabase {
  const db = getDatabaseSync();
  db.rulesCMS = rules;
  saveDatabase(db);
  return db;
}

export function rsvpCalendarEvent(eventId: string, personId: string, status: 'Aanwezig' | 'Afwezig' | 'Twijfel'): AppDatabase {
  const db = getDatabaseSync();
  if (!db.calendarEvents) return db;
  db.calendarEvents = db.calendarEvents.map(evt => {
    if (evt.id === eventId) {
      const rsvps = { ...evt.rsvps };
      rsvps[personId] = status;
      return { ...evt, rsvps };
    }
    return evt;
  });
  saveDatabase(db);
  return db;
}

export function draftPlayer(personId: string, teamId: string, round: number, pickNo: number): AppDatabase {
  const db = getDatabaseSync();

  // 1. Move player to team
  db.persons = db.persons.map(p => {
    if (p.id === personId) {
      return { ...p, teamIds: [teamId], playerPool: 'None' };
    }
    return p;
  });
  db.teams = db.teams.map(t => {
    if (t.id === teamId) {
      return { ...t, playerIds: Array.from(new Set([...t.playerIds, personId])) };
    }
    return t;
  });

  // 2. Log activity
  const teamName = db.teams.find(t => t.id === teamId)?.name || 'Team';
  const playerName = db.persons.find(p => p.id === personId)?.name || 'Speler';
  const logAct = {
    id: `act-${Date.now()}`,
    personId: db.currentUser.personId || '',
    activityType: 'Transfer' as any,
    description: `${teamName} heeft ${playerName} geselecteerd in de Draft (Ronde ${round}, Pick ${pickNo}).`,
    createdAt: new Date().toISOString()
  };
  db.socialActivities = [logAct, ...(db.socialActivities || [])];

  // 3. Update draft state
  if (db.draftState) {
    db.draftState.draftedPlayers.push(personId);
    db.draftState.currentPickIndex++;
  }

  saveDatabase(db);
  return db;
}

export function resetDraftState(draftOrder: string[]): AppDatabase {
  const db = getDatabaseSync();
  db.draftState = {
    status: 'Gepland',
    currentRound: 1,
    currentPickIndex: 0,
    pickOrder: draftOrder,
    draftedPlayers: []
  };

  // Move all drafted players back to pool
  db.persons = db.persons.map(p => {
    if (p.roles.includes('Player')) {
      return { ...p, teamIds: [], playerPool: 'Draft' };
    }
    return p;
  });
  db.teams = db.teams.map(t => {
    return { ...t, playerIds: [] };
  });

  saveDatabase(db);
  return db;
}

export function setDraftStatus(status: 'Gepland' | 'InProgress' | 'Voltooid', draftOrder?: string[]): AppDatabase {
  const db = getDatabaseSync();
  if (status === 'Gepland') {
    db.draftState = null;
  } else if (db.draftState) {
    db.draftState.status = status;
  } else if (draftOrder) {
    db.draftState = {
      status,
      currentRound: 1,
      currentPickIndex: 0,
      pickOrder: draftOrder,
      draftedPlayers: []
    };
  }
  saveDatabase(db);
  return db;
}

export function addCalendarEvents(events: any[]): AppDatabase {
  const db = getDatabaseSync();
  db.calendarEvents = [...(db.calendarEvents || []), ...events];
  saveDatabase(db);
  return db;
}

export function deleteCalendarEvent(eventId: string): AppDatabase {
  const db = getDatabaseSync();
  db.calendarEvents = (db.calendarEvents || []).filter(e => e.id !== eventId);
  saveDatabase(db);
  return db;
}

export function deleteMatch(matchId: string): AppDatabase {
  const db = getDatabaseSync();
  db.matches = db.matches.filter(m => m.id !== matchId);
  saveDatabase(db);
  return db;
}
