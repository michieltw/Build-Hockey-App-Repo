import { Person, Equipment, UserRole, AppDatabase } from '../types';
import { getDatabaseSync, saveDatabase } from './DatabaseService';
import { supabase } from './supabaseClient';

// 1. Update Current User or switch system roles (for testing/multiplayer role simulation)
export function switchUserRole(role: UserRole, personId: string | null): AppDatabase {
  const db = getDatabaseSync();
  db.currentUser.systemRole = role;
  db.currentUser.personId = personId;

  // Keep email synced to match a realistic scenario
  if (personId) {
    const person = db.persons.find(p => p.id === personId);
    if (person) {
      db.currentUser.username = person.name;
    }
  } else {
    db.currentUser.username = 'Guest User';
  }

  saveDatabase(db); return db;
}

// 2. Update Person Profile (and sync roles, managedTeamId, etc.)
export function updatePersonProfile(personId: string, updates: Partial<Person>): AppDatabase {
  const db = getDatabaseSync();
  db.persons = db.persons.map(p => {
    if (p.id === personId) {
      const updated = { ...p, ...updates };
      // Ensure equipment and stats initialized if Player role is added
      if (updated.roles.includes('Player')) {
        if (!updated.equipment) updated.equipment = [];
        if (!updated.stats) {
          updated.stats = {
            gamesPlayed: 0, goals: 0, assists: 0, points: 0, penaltyMinutes: 0,
            rating: 70, speed: 70, shooting: 70, passing: 70, defense: 70, physical: 70
          };
        }
      }
      return updated;
    }
    return p;
  });

  supabase.from('users').update({
    name: updates.name,
    avatar: updates.avatar,
    bio: updates.bio,
  }).eq('id', personId).then(({ error }) => {
    if (error) console.error('Failed to update person in Supabase', error);
  });

  saveDatabase(db); return db;
}

// 3. Add Person (Create new player/manager)
export function createPerson(person: Omit<Person, 'id'>): AppDatabase {
  const db = getDatabaseSync();
  const id = `person-${Date.now()}`;
  const newPerson: Person = {
    ...person,
    id,
    equipment: person.equipment || [],
    stats: person.stats || {
      gamesPlayed: 0, goals: 0, assists: 0, points: 0, penaltyMinutes: 0,
      rating: 70, speed: 70, shooting: 70, passing: 70, defense: 70, physical: 70
    },
    teamIds: person.teamIds || []
  };
  db.persons.push(newPerson);

  supabase.from('users').insert([{
    id: newPerson.id,
    name: newPerson.name,
    avatar: newPerson.avatar,
    bio: newPerson.bio,
    // roles mappings etc could be added here
  }]).then(({ error }) => {
    if (error) console.error('Failed to create person in Supabase', error);
  });

  saveDatabase(db); return db;
}

// 4. Transfer Player (Add/Remove from Team or Spelerpool)
export function movePlayerToTeam(playerId: string, teamId: string | null, playerPool: Person['playerPool'] = 'None'): AppDatabase {
  const db = getDatabaseSync();

  // 1. Update the player's team list and pool status
  db.persons = db.persons.map(p => {
    if (p.id === playerId) {
      let currentTeamIds = p.teamIds || [];
      if (teamId) {
        // Add teamId if not present (supporting multiple teams)
        if (!currentTeamIds.includes(teamId)) {
          currentTeamIds = [...currentTeamIds, teamId];
        }
      } else {
        // Clearing teams if sent entirely to a standalone pool
        if (playerPool !== 'None') {
          currentTeamIds = [];
        }
      }
      return {
        ...p,
        playerPool,
        teamIds: currentTeamIds
      };
    }
    return p;
  });

  // 2. Synchronize Team's player list
  db.teams = db.teams.map(t => {
    if (teamId && t.id === teamId) {
      // Add to team
      return {
        ...t,
        playerIds: Array.from(new Set([...t.playerIds, playerId]))
      };
    } else if (!teamId || playerPool !== 'None') {
      // If we are fully removing player from other teams because they went to a pool
      if (playerPool !== 'None') {
        return {
          ...t,
          playerIds: t.playerIds.filter(pid => pid !== playerId)
        };
      }
    }
    return t;
  });

  saveDatabase(db); return db;
}

// Remove player completely from a specific team
export function removePlayerFromTeam(playerId: string, teamId: string): AppDatabase {
  const db = getDatabaseSync();

  db.persons = db.persons.map(p => {
    if (p.id === playerId) {
      const updatedTeamIds = (p.teamIds || []).filter(tid => tid !== teamId);
      return {
        ...p,
        teamIds: updatedTeamIds,
        playerPool: updatedTeamIds.length === 0 ? 'Leenspelers' : p.playerPool // Fallback to pool if no teams left
      };
    }
    return p;
  });

  db.teams = db.teams.map(t => {
    if (t.id === teamId) {
      return {
        ...t,
        playerIds: t.playerIds.filter(pid => pid !== playerId)
      };
    }
    return t;
  });

  saveDatabase(db); return db;
}

// 5. Manage Equipment
export function addEquipment(personId: string, item: Omit<Equipment, 'id'>): AppDatabase {
  const db = getDatabaseSync();
  const id = `eq-${Date.now()}`;
  db.persons = db.persons.map(p => {
    if (p.id === personId) {
      const equipment = p.equipment || [];
      return {
        ...p,
        equipment: [...equipment, { ...item, id } as Equipment]
      };
    }
    return p;
  });
  saveDatabase(db); return db;
}

export function updateEquipment(personId: string, equipmentId: string, updates: Partial<Equipment>): AppDatabase {
  const db = getDatabaseSync();
  db.persons = db.persons.map(p => {
    if (p.id === personId && p.equipment) {
      return {
        ...p,
        equipment: p.equipment.map(eq => eq.id === equipmentId ? { ...eq, ...updates } : eq)
      };
    }
    return p;
  });
  saveDatabase(db); return db;
}

export function deleteEquipment(personId: string, equipmentId: string): AppDatabase {
  const db = getDatabaseSync();
  db.persons = db.persons.map(p => {
    if (p.id === personId && p.equipment) {
      return {
        ...p,
        equipment: p.equipment.filter(eq => eq.id !== equipmentId)
      };
    }
    return p;
  });
  saveDatabase(db); return db;
}
