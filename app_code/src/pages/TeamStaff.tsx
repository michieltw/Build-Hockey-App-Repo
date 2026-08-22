import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function TeamStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields for POC
  const [teamId, setTeamId] = useState("");
  const [personId, setPersonId] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [hireDate, setHireDate] = useState("");

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("team_staff");
      setStaff(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load team staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("team_staff", {
        team_id: teamId,
        person_id: personId,
        staff_role: staffRole,
        hire_date: hireDate,
      });
      setFormOpen(false);
      loadStaff();
      // Reset form
      setTeamId("");
      setPersonId("");
      setStaffRole("");
      setHireDate("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Team Staff</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Add Staff"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Assign Staff to Team</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
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
                value={staffRole}
                onChange={(e) => setStaffRole(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              >
                <option value="">Select Role</option>
                <option value="head_coach">Head Coach</option>
                <option value="assistant_coach">Assistant Coach</option>
                <option value="goalie_coach">Goalie Coach</option>
                <option value="trainer">Trainer</option>
                <option value="equipment_manager">Equipment Manager</option>
                <option value="general_manager">General Manager</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Hire Date</label>
              <input
                required
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
              Save Staff
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading staff...</div>
        ) : staff.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No team staff found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Team ID</th>
                <th className="p-4">Person ID</th>
                <th className="p-4">Role</th>
                <th className="p-4">Hire Date</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{s.id}</td>
                  <td className="p-4 tabular-nums">{s.team_id}</td>
                  <td className="p-4 tabular-nums">{s.person_id}</td>
                  <td className="p-4 capitalize">{s.staff_role?.replace("_", " ")}</td>
                  <td className="p-4 tabular-nums">{s.hire_date?.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
