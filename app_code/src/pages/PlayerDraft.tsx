import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function PlayerDraft() {
  const [draftPicks, setDraftPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [seasonId, setSeasonId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [round, setRound] = useState("");
  const [pickOrder, setPickOrder] = useState("");
  const [teamId, setTeamId] = useState("");
  const [playerId, setPlayerId] = useState("");

  const loadDraftPicks = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("player_draft");
      setDraftPicks(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load player draft");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDraftPicks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("player_draft", {
        season_id: seasonId,
        division_id: divisionId,
        round: round,
        pick_order: pickOrder,
        team_id: teamId,
        player_id: playerId,
        is_skipped: false,
      });
      setFormOpen(false);
      loadDraftPicks();
      setSeasonId("");
      setDivisionId("");
      setRound("");
      setPickOrder("");
      setTeamId("");
      setPlayerId("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Player Draft</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Record Draft Pick"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">New Draft Pick</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Season ID</label>
                <input
                  required
                  type="number"
                  value={seasonId}
                  onChange={(e) => setSeasonId(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Division ID</label>
                <input
                  required
                  type="number"
                  value={divisionId}
                  onChange={(e) => setDivisionId(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Round</label>
                <input
                  required
                  type="number"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pick Order</label>
                <input
                  required
                  type="number"
                  value={pickOrder}
                  onChange={(e) => setPickOrder(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Team ID</label>
              <input
                required
                type="number"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Player ID</label>
              <input
                required
                type="number"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
              Save Pick
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading draft picks...</div>
        ) : draftPicks.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No draft picks found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">Round</th>
                <th className="p-4">Pick</th>
                <th className="p-4">Team ID</th>
                <th className="p-4">Player ID</th>
                <th className="p-4">Skipped</th>
              </tr>
            </thead>
            <tbody>
              {draftPicks.map((d) => (
                <tr key={d.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">R{d.round}</td>
                  <td className="p-4 tabular-nums">{d.pick_order}</td>
                  <td className="p-4 tabular-nums">{d.team_id}</td>
                  <td className="p-4 tabular-nums">{d.player_id}</td>
                  <td className="p-4">
                     {d.is_skipped ? (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700">Yes</span>
                     ) : (
                        <span className="text-slate-400">-</span>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
