import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Transfers() {
  const [transfers, setTransfers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [seasonId, setSeasonId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [fromTeamId, setFromTeamId] = useState("");
  const [toTeamId, setToTeamId] = useState("");
  const [transferType, setTransferType] = useState("");

  const loadTransfers = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("transfers");
      setTransfers(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load transfers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransfers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("transfers", {
        season_id: seasonId,
        player_id: playerId,
        from_team_id: fromTeamId,
        to_team_id: toTeamId,
        transfer_type: transferType,
        status: "pending",
        request_date: new Date().toISOString().split("T")[0],
      });
      setFormOpen(false);
      loadTransfers();
      setSeasonId("");
      setPlayerId("");
      setFromTeamId("");
      setToTeamId("");
      setTransferType("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Transfers</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Request Transfer"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">New Transfer Request</h2>
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
              <label className="block text-sm font-semibold text-slate-700 mb-1">From Team ID</label>
              <input
                required
                type="number"
                value={fromTeamId}
                onChange={(e) => setFromTeamId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">To Team ID</label>
              <input
                required
                type="number"
                value={toTeamId}
                onChange={(e) => setToTeamId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Transfer Type</label>
              <select
                required
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              >
                <option value="">Select Type</option>
                <option value="trade">Trade</option>
                <option value="waiver">Waiver</option>
                <option value="promotion">Promotion</option>
                <option value="demotion">Demotion</option>
              </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading transfers...</div>
        ) : transfers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No transfers found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Player ID</th>
                <th className="p-4">From Team</th>
                <th className="p-4">To Team</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => (
                <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{t.id}</td>
                  <td className="p-4 tabular-nums">{t.player_id}</td>
                  <td className="p-4 tabular-nums">{t.from_team_id}</td>
                  <td className="p-4 tabular-nums">{t.to_team_id}</td>
                  <td className="p-4 capitalize">{t.transfer_type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      t.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      t.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {t.status || 'pending'}
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
