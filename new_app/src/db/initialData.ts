
import { AppDatabase } from '../types';

export const initialDatabase: AppDatabase = {
  currentUser: {
    id: 'user-admin',
    username: 'Admin Gebruiker',
    email: 'admin@test.nl',
    systemRole: 'MultiLeagueOfficer',
    personId: 'user-admin'
  },
  persons: [],
  teams: [],
  leagues: [],
  matches: [],
  settings: {
    firstTimeSetup: false,
    generalSettings: {
      theme: 'light',
      language: 'Nederlands',
      maintenanceMode: false
    },
    matchSettings: {
      periodDurationMinutes: 20,
      overtimeEnabled: true,
      mercyRuleEnabled: false
    },
    specificSettings: {
      allowLoanPlayers: true,
      maxPlayersPerTeam: 22,
      requireEquipmentSafetyCheck: true
    }
  },
  association: {
    clubs: [],
    locations: [{
      id: 'loc-1',
      name: 'Standaard Locatie',
      hasRentals: true,
      address: 'Standaard Locatierplein 1, 9735 TZ Groningen',
      capacity: 1000
    }],
    members: [],
    sponsors: []
  },
  seasons: [],
  divisions: [],
  pools: [],
  standings: [],
  mediaItems: [],
  socialPosts: [],
  socialNotifications: [],
  socialAdvertisements: [],
  socialActivities: [],
  calendarEvents: [],
  rulesCMS: '<h2>Reglementen & Richtlijnen</h2><p>Er zijn nog geen reglementen toegevoegd.</p>',
  draftSession: {
    id: 'draft-2026',
    status: 'NotStarted',
    currentRound: 1,
    currentPickIndex: 0,
    pickOrder: [],
    draftedPlayers: []
  }
};
