export type UserRole =
  | "Guest"
  | "StandardUser"
  | "Manager"
  | "LeagueOfficer"
  | "MultiLeagueOfficer"
  | "Admin";
export type PersonRoleType =
  | "User"
  | "Player"
  | "Manager"
  | "Referee"
  | "Volunteer"
  | "LeagueOfficer"
  | "MultiLeagueOfficer"
  | "Administrator";

export interface Equipment {
  id: string;
  type: "stick" | "skates" | "helmet" | "gloves";
  brand: string;
  model: string;
  specifications: any;
  condition: number;
  playerId?: string;
}
export interface PlayerStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  penalties: number;
  penaltyMinutes?: number;
  plusMinus: number;
  savePercentage?: number;
  goalsAgainstAverage?: number;
  defense?: number;
  rating?: number;
}
export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
}
export interface ActivePenalty {
  id: string;
  teamId: string;
  team?: string;
  playerId: string;
  player?: string;
  type: string;
  duration: number;
  timeRemaining: number;
  period: number;
  startTime: string;
  eventId?: string;
  secondsRemaining?: number;
}
export interface GameEvent {
  id: string;
  matchId?: string;
  type: string;
  time: string;
  description?: string;
  period?: number;
  team?: string;
  playerIds?: string[];
  text?: string;
  isUndone?: boolean;
  scorer?: string;
  penaltyReason?: string;
  penaltyMinutes?: number;
  assist1?: string;
  assist2?: string;
  assist3?: string;
  x?: number;
  y?: number;
  location?: string;
}
export interface GameState {
  homeScore: number;
  awayScore: number;
  period: number;
  timeRemaining: number;
  isPaused: boolean;
  events: GameEvent[];
  activePenalties: ActivePenalty[];
  isRunning?: boolean;
  stoppageTime?: number;
  sogHome?: number;
  sogAway?: number;
  scoreHome?: number;
  scoreAway?: number;
}
export interface GameSettings {
  periodLength: number;
  trackIcing: boolean;
  trackOffside: boolean;
  trackSOG: boolean;
  officialGame: boolean;
  gameType: string;
  attendance: number;
  ticketsSold: number;
  liveGame: boolean;
  teamSelection: string;
  allowFillInPlayers: boolean;
  gameClock: string;
  clockPauseBehavior: string;
  autoStopAtPeriodEnd: boolean;
  periodFormat: string;
  shootout: boolean;
  soRules: string;
  trackSOGLocation: boolean;
  trackFOW: boolean;
  faceoffLocation: boolean;
  goalscorer: string;
  assists: string;
  trackPenalties: boolean;
  penaltyClock: boolean;
  durationTypes: string[];
  officialsMode: string;
  linesmenMode?: string;
  venueMode?: string;
  capacity?: string | number;
  avgPrice?: string | number;
  haptics?: boolean;
}
export interface GameConfig {
  homeTeam: string;
  awayTeam: string;
  homeColor: string;
  awayColor: string;
  homeLogo: string;
  awayLogo: string;
  homeRoster: Player[];
  awayRoster: Player[];
  settings: GameSettings;
  location?: string;
  competition?: string;
  matchType?: string;
  officials?: any;
  linesmen?: any;
  date?: string;
  time?: string;
  initialScoreHome?: number;
  initialScoreAway?: number;
  initialSogHome?: number;
  initialSogAway?: number;
  initialPeriod?: number;
}
export interface MatchEvent {
  id: string;
  type: string;
  timeRemaining?: string;
  period?: number;
}
export interface MatchStats {
  homeScore: number;
  awayScore: number;
  powerplays?: any;
}
export interface Match {
  id: string;
  status:
    | "Gepland"
    | "Bezig"
    | "Afgerond"
    | "Verwerkt"
    | "Geannuleerd"
    | "Played"
    | "Completed";
  stadium?: string;
  stats?: MatchStats;
  homeScore?: number;
  awayScore?: number;
  homeTeamId?: string;
  awayTeamId?: string;
  events?: MatchEvent[];
}
export interface Team {
  id: string;
  name: string;
  logo?: string;
  city?: string;
}
export interface Person {
  id: string;
  name: string;
  roles: string[];
  avatar: string;
  teamIds?: string[];
  teamId?: string;
  bio?: string;
  stats?: PlayerStats;
  goalieStats?: any;
  birthdate?: string;
  nationality?: string;
}
export interface CurrentUser {
  username: string;
  personId: string;
  systemRole: string;
}
export interface AppDatabase {
  currentUser: CurrentUser;
  persons: Person[];
  matches: Match[];
  teams: Team[];
  settings?: any;
  association?: any;
}
