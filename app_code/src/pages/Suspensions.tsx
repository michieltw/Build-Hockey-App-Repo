import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Suspensions() {
  const [suspensions, setSuspensions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [playerId, setPlayerId] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [reason, setReason] = useState("");
  const [suspensionLength, setSuspensionLength] = useState("");
  const [startDate, setStartDate] = useState("");

  const loadSuspensions = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("suspensions");
      setSuspensions(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load suspensions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuspensions();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("suspensions", {
        player_id: playerId,
        season_id: seasonId,
        reason: reason,
        suspension_length_games: suspensionLength,
        start_date: startDate,
        status: "active",
      });
      setFormOpen(false);
      loadSuspensions();
      setPlayerId("");
      setSeasonId("");
      setReason("");
      setSuspensionLength("");
      setStartDate("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Suspensions</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Issue Suspension"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Issue New Suspension</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
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
              <label className="block text-sm font-semibold text-slate-700 mb-1">Reason</label>
              <select
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              >
                <option value="">Select Reason</option>
                <option value="misconduct">Misconduct</option>
                <option value="fighting">Fighting</option>
                <option value="excessive_penalties">Excessive Penalties</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Length (Games)</label>
              <input
                required
                type="number"
                value={suspensionLength}
                onChange={(e) => setSuspensionLength(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                required
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
              Issue Suspension
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading suspensions...</div>
        ) : suspensions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No suspensions found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Player ID</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Games</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {suspensions.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{s.id}</td>
                  <td className="p-4 tabular-nums">{s.player_id}</td>
                  <td className="p-4 capitalize">{s.reason?.replace("_", " ")}</td>
                  <td className="p-4 tabular-nums">{s.suspension_length_games}</td>
                  <td className="p-4 tabular-nums">{s.start_date?.split("T")[0]}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      s.status === 'active' ? 'bg-red-50 text-red-700' :
                      s.status === 'served' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {s.status || 'active'}
                    </span>
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
