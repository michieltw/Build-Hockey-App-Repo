import { useState, useEffect } from "react";
import { fetchTableData } from "../services/api";
import { Link } from "react-router-dom";
import { Calendar, AlertCircle, Eye } from "lucide-react";
import { GameForm } from "../components/GameForm";

export function Games() {
  const [games, setGames] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedGames, fetchedTeams, fetchedVenues] = await Promise.all([
        fetchTableData("games"),
        fetchTableData("teams"),
        fetchTableData("venues"),
      ]);
      setGames(fetchedGames || []);
      setTeams(fetchedTeams || []);
      setVenues(fetchedVenues || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getTeamName = (teamId: number) => {
    return teams.find((t) => t.id === teamId)?.name || `Team ${teamId}`;
  };

  const getVenueName = (venueId: number) => {
    return venues.find((v) => v.id === venueId)?.name || `Venue ${venueId}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Games</h1>
          <p className="text-sm text-slate-500 mt-1">Manage scheduled games and live events</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Schedule Game
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {isFormOpen && (
        <GameForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            loadData();
          }}
          teams={teams}
          venues={venues}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Matchup</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {games.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-base font-medium text-slate-900 mb-1">No games found</p>
                    <p>Schedule a game to get started.</p>
                  </td>
                </tr>
              ) : (
                games.map((game) => (
                  <tr key={game.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 tabular-nums text-slate-500">#{game.id}</td>
                    <td className="px-6 py-4">
                      {new Date(game.scheduled_time).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {getTeamName(game.away_team_id)} @ {getTeamName(game.home_team_id)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                       {getVenueName(game.venue_id)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize
                        ${game.status === 'completed' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' :
                          game.status === 'in_progress' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' :
                          'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20'}
                      `}>
                        {game.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums font-medium text-slate-900">
                      {game.status === 'completed' || game.status === 'in_progress'
                        ? `${game.away_goals ?? 0} - ${game.home_goals ?? 0}`
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/games/${game.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Dashboard
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
