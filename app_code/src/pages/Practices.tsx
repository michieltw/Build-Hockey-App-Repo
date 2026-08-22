import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Practices() {
  const [practices, setPractices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [teamId, setTeamId] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const loadPractices = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("practice_sessions");
      setPractices(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load practices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPractices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Combine date and time to dummy ISO string
      const dateTime = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      await insertTableData("practice_sessions", {
        team_id: teamId,
        season_id: seasonId,
        venue_id: venueId,
        scheduled_time: dateTime,
        is_cancelled: false,
      });
      setFormOpen(false);
      loadPractices();
      setTeamId(""); setSeasonId(""); setVenueId(""); setScheduledDate(""); setScheduledTime("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Practice Sessions</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Schedule Practice"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">New Practice Session</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Team ID</label>
                <input required type="number" value={teamId} onChange={(e) => setTeamId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Season ID</label>
                <input required type="number" value={seasonId} onChange={(e) => setSeasonId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Venue ID</label>
              <input required type="number" value={venueId} onChange={(e) => setVenueId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                <input required type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Time</label>
                <input required type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Practice</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading practices...</div>
        ) : practices.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No practice sessions found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Team ID</th>
                <th className="p-4">Venue ID</th>
                <th className="p-4">Scheduled Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {practices.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{p.id}</td>
                  <td className="p-4 tabular-nums">{p.team_id}</td>
                  <td className="p-4 tabular-nums">{p.venue_id}</td>
                  <td className="p-4 tabular-nums">
                    {p.scheduled_time ? new Date(p.scheduled_time).toLocaleString() : ''}
                  </td>
                  <td className="p-4">
                    {p.is_cancelled ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700">Cancelled</span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700">Active</span>
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
