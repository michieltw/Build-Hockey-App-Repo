import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Waivers() {
  const [waivers, setWaivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields for POC
  const [seasonId, setSeasonId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [requestingTeamId, setRequestingTeamId] = useState("");
  const [currentTeamId, setCurrentTeamId] = useState("");

  const loadWaivers = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("waivers");
      setWaivers(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load waivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWaivers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("waivers", {
        season_id: seasonId,
        player_id: playerId,
        requesting_team_id: requestingTeamId,
        current_team_id: currentTeamId,
        status: "pending",
        request_date: new Date().toISOString().split("T")[0],
      });
      setFormOpen(false);
      loadWaivers();
      setSeasonId("");
      setPlayerId("");
      setRequestingTeamId("");
      setCurrentTeamId("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Waivers</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Request Waiver"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">New Waiver Request</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
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
              <label className="block text-sm font-semibold text-slate-700 mb-1">Player ID</label>
              <input
                required
                type="number"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Current Team ID</label>
              <input
                required
                type="number"
                value={currentTeamId}
                onChange={(e) => setCurrentTeamId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Requesting Team ID</label>
              <input
                required
                type="number"
                value={requestingTeamId}
                onChange={(e) => setRequestingTeamId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading waivers...</div>
        ) : waivers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No waivers found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Player ID</th>
                <th className="p-4">From Team ID</th>
                <th className="p-4">To Team ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Request Date</th>
              </tr>
            </thead>
            <tbody>
              {waivers.map((w) => (
                <tr key={w.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{w.id}</td>
                  <td className="p-4 tabular-nums">{w.player_id}</td>
                  <td className="p-4 tabular-nums">{w.current_team_id}</td>
                  <td className="p-4 tabular-nums">{w.requesting_team_id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      w.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      w.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {w.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-4 tabular-nums">{w.request_date?.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
