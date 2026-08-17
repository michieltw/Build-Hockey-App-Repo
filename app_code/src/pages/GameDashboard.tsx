import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTableData } from "../services/api";
import { ArrowLeft, Clock, MapPin, AlertCircle, Shield } from "lucide-react";

export function GameDashboard() {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const [homeTeam, setHomeTeam] = useState<any>(null);
  const [awayTeam, setAwayTeam] = useState<any>(null);
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGameData();
  }, [id]);

  const loadGameData = async () => {
    try {
      setLoading(true);

      const [games, teams, venues] = await Promise.all([
        fetchTableData("games"),
        fetchTableData("teams"),
        fetchTableData("venues")
      ]);

      const foundGame = games.find((g: any) => g.id === Number(id));
      if (!foundGame) {
        throw new Error("Game not found");
      }

      setGame(foundGame);
      setHomeTeam(teams.find((t: any) => t.id === foundGame.home_team_id));
      setAwayTeam(teams.find((t: any) => t.id === foundGame.away_team_id));
      setVenue(venues.find((v: any) => v.id === foundGame.venue_id));

      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load game dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="space-y-4">
        <Link to="/games" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error || "Game not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/games" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Link>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold capitalize
            ${game.status === 'completed' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' :
              game.status === 'in_progress' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' :
              'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20'}
          `}>
            {game.status?.replace('_', ' ')}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold capitalize ring-1 ring-inset ring-slate-500/20">
            {game.game_type}
          </span>
        </div>
      </div>

      {/* Scoreboard Widget */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200"></div>

        <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-500 mb-8">
           <div className="flex items-center gap-2">
             <Clock className="w-4 h-4" />
             <span>{new Date(game.scheduled_time).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
           </div>
           <div className="flex items-center gap-2">
             <MapPin className="w-4 h-4" />
             <span>{venue?.name || 'Unknown Venue'}</span>
           </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-3xl">
          {/* Away Team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-slate-100 flex items-center justify-center shadow-inner">
               <Shield className="w-10 h-10 text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Away</p>
              <h2 className="text-2xl font-extrabold text-slate-900">{awayTeam?.name || 'Away Team'}</h2>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center gap-8 px-8">
            <span className="text-6xl font-black tabular-nums text-slate-900">{game.away_goals ?? 0}</span>
            <span className="text-2xl font-black text-slate-300">-</span>
            <span className="text-6xl font-black tabular-nums text-slate-900">{game.home_goals ?? 0}</span>
          </div>

          {/* Home Team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-slate-100 flex items-center justify-center shadow-inner">
               <Shield className="w-10 h-10 text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Home</p>
              <h2 className="text-2xl font-extrabold text-slate-900">{homeTeam?.name || 'Home Team'}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholders for subsequent sections */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-900 mb-4">Live Events</h3>
             <div className="flex items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="text-slate-500 font-medium">Event logging coming soon</p>
             </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-900 mb-4">Lineups</h3>
             <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="text-slate-500 font-medium">Lineups coming soon</p>
             </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-900 mb-4">Penalty Box</h3>
             <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="text-slate-500 font-medium">Penalty box tracking coming soon</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
