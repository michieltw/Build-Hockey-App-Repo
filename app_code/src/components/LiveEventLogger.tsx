import React, { useState, useEffect } from "react";
import { insertTableData, fetchTableData } from "../services/api";
import { X } from "lucide-react";

interface LiveEventLoggerProps {
  gameId: number;
  homeTeam: any;
  awayTeam: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function LiveEventLogger({ gameId, homeTeam, awayTeam, onClose, onSuccess }: LiveEventLoggerProps) {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    event_type: "goal",
    period: "1",
    time_in_period: "20:00",
    team_id: homeTeam?.id || "",
    player_id: "",
    assist_player_id: "",
    penalty_type: "",
    penalty_duration: "2",
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const lookup = await fetchTableData("player_lookup");
        setPlayers(lookup || []);
      } catch (err) {
        console.error("Failed to load players for event logger");
      } finally {
        setLoading(false);
      }
    };
    loadPlayers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.team_id) {
      setError("Please select a team");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload = {
        ...formData,
        game_id: gameId,
        is_confirmed: true,
        video_review_used: false,
      };

      const result = await insertTableData("game_events", payload);
      if (result.error) {
        throw new Error(result.error);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to log event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Filter players by selected team if they have current_team_id set.
  // If not set, show all or let user select.
  const teamPlayers = players.filter(p => !p.current_team_id || p.current_team_id == formData.team_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900">Log Game Event</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <form id="event-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Team</label>
                  <select
                    name="team_id"
                    required
                    value={formData.team_id}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    <option value="">Select Team</option>
                    {homeTeam && <option value={homeTeam.id}>{homeTeam.name} (Home)</option>}
                    {awayTeam && <option value={awayTeam.id}>{awayTeam.name} (Away)</option>}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Event Type</label>
                  <select
                    name="event_type"
                    required
                    value={formData.event_type}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none capitalize"
                  >
                    {['goal', 'penalty', 'shot', 'save', 'hit', 'period_start', 'period_end'].map(type => (
                      <option key={type} value={type}>{type.replace('_', ' ')}</option>
                    ))}
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Period</label>
                <select
                  name="period"
                  required
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  {['1', '2', '3', '4 (OT)'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Time (MM:SS)</label>
                <input
                  type="text"
                  name="time_in_period"
                  placeholder="20:00"
                  required
                  value={formData.time_in_period}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none tabular-nums"
                />
              </div>
            </div>

            {['goal', 'penalty', 'shot', 'save', 'hit'].includes(formData.event_type) && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Primary Player</label>
                <select
                  name="player_id"
                  value={formData.player_id}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  <option value="">Select Player (Optional)</option>
                  {loading ? <option disabled>Loading players...</option> : teamPlayers.map(p => (
                    <option key={p.player_id} value={p.player_id}>
                      {p.first_name} {p.last_name} {p.jersey_number ? `(#${p.jersey_number})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.event_type === 'goal' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Assist Player</label>
                <select
                  name="assist_player_id"
                  value={formData.assist_player_id}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  <option value="">Select Assist Player (Optional)</option>
                  {teamPlayers.map(p => (
                    <option key={p.player_id} value={p.player_id}>
                      {p.first_name} {p.last_name} {p.jersey_number ? `(#${p.jersey_number})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.event_type === 'penalty' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Penalty Type</label>
                  <select
                    name="penalty_type"
                    value={formData.penalty_type}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none capitalize"
                  >
                    <option value="">Select Infraction</option>
                    {['hooking', 'tripping', 'slashing', 'high_sticking', 'roughing', 'interference', 'delay_of_game'].map(type => (
                      <option key={type} value={type}>{type.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Duration (Mins)</label>
                  <select
                    name="penalty_duration"
                    value={formData.penalty_duration}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    {[2, 4, 5, 10].map(mins => (
                      <option key={mins} value={mins}>{mins} Minutes</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Description / Notes</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                placeholder="Optional notes about the event..."
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="event-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Logging..." : "Log Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
