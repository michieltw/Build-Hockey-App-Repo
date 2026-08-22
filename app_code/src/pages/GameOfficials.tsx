import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function GameOfficials() {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Form fields
  const [gameId, setGameId] = useState("");
  const [personId, setPersonId] = useState("");
  const [officialRole, setOfficialRole] = useState("");

  const loadOfficials = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("game_officials");
      setOfficials(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load game officials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOfficials();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("game_officials", {
        game_id: gameId,
        person_id: personId,
        official_role: officialRole,
      });
      setFormOpen(false);
      loadOfficials();
      setGameId("");
      setPersonId("");
      setOfficialRole("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Game Officials</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Assign Official"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Assign Official to Game</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Game ID</label>
              <input
                required
                type="number"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Person ID</label>
              <input
                required
                type="number"
                value={personId}
                onChange={(e) => setPersonId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
              <select
                required
                value={officialRole}
                onChange={(e) => setOfficialRole(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              >
                <option value="">Select Role</option>
                <option value="referee">Referee</option>
                <option value="linesman">Linesman</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
              Save Assignment
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading officials...</div>
        ) : officials.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No game officials found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Game ID</th>
                <th className="p-4">Person ID</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {officials.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{o.id}</td>
                  <td className="p-4 tabular-nums">{o.game_id}</td>
                  <td className="p-4 tabular-nums">{o.person_id}</td>
                  <td className="p-4 capitalize">{o.official_role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
