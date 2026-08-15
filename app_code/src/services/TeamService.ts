import { Team, AppDatabase } from '../types';
import { getDatabaseSync, saveDatabase } from './DatabaseService';
import { supabase } from './supabaseClient';

export function updateTeamDetails(teamId: string, updates: Partial<Team>): AppDatabase {
  const db = getDatabaseSync();
  db.teams = db.teams.map(t => {
    if (t.id === teamId) {
      const updated = { ...t, ...updates };

      // If manager changed, reflect in the Person record
      if (updates.managerId !== undefined && updates.managerId !== t.managerId) {
        // Clear old manager's link
        if (t.managerId) {
          db.persons = db.persons.map(p =>
            p.id === t.managerId ? { ...p, managedTeamId: undefined } : p
          );
        }
        // Set new manager's link
        if (updates.managerId) {
          const mId = updates.managerId;
          db.persons = db.persons.map(p =>
            p.id === mId ? { ...p, managedTeamId: teamId, roles: Array.from(new Set([...p.roles, 'Manager'])) } : p
          );
        }
      }

      return updated;
    }
    return t;
  });

  // Async supabase update
  supabase.from('teams').update({
    name: updates.name,
    city: updates.city,
    logo: updates.logo,
    primary_color: updates.primaryColor,
    secondary_color: updates.secondaryColor,
  }).eq('id', teamId).then(({ error }) => {
    if (error) console.error('Failed to update team in Supabase', error);
  });

  saveDatabase(db); return db;
}
