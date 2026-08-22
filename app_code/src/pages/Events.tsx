import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [organizationId, setOrganizationId] = useState("");
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venueId, setVenueId] = useState("");
  const [eventType, setEventType] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("events");
      setEvents(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("events", {
        organization_id: organizationId,
        name: name,
        event_date: eventDate,
        venue_id: venueId,
        event_type: eventType,
        status: "scheduled",
      });
      setFormOpen(false);
      loadEvents();
      setOrganizationId(""); setName(""); setEventDate(""); setVenueId(""); setEventType("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Events & Community</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Create Event"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">New Event</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Organization ID</label>
              <input required type="number" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event Name</label>
              <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event Date</label>
              <input required type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Venue ID</label>
                <input type="number" value={venueId} onChange={(e) => setVenueId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Event Type</label>
                <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" placeholder="e.g. fundraiser" />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Event</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No events found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{e.id}</td>
                  <td className="p-4 font-medium text-slate-900">{e.name}</td>
                  <td className="p-4 tabular-nums">{e.event_date?.split("T")[0]}</td>
                  <td className="p-4 capitalize">{e.event_type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      e.status === 'scheduled' ? 'bg-amber-50 text-amber-700' :
                      e.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {e.status || 'scheduled'}
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
