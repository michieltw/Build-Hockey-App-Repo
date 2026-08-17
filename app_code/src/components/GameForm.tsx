import React, { useState } from "react";
import { insertTableData } from "../services/api";
import { X } from "lucide-react";

interface GameFormProps {
  onClose: () => void;
  onSuccess: () => void;
  teams: any[];
  venues: any[];
}

export function GameForm({ onClose, onSuccess, teams, venues }: GameFormProps) {
  const [formData, setFormData] = useState({
    season_id: "1", // Hardcoded for now as default, would ideally be fetched from active season
    division_id: "1", // Hardcoded for now
    home_team_id: "",
    away_team_id: "",
    venue_id: "",
    scheduled_time: "",
    status: "scheduled",
    game_type: "regular",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.home_team_id === formData.away_team_id) {
      setError("Home and away teams must be different");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload = {
        ...formData,
        scheduled_time: new Date(formData.scheduled_time).toISOString(),
        home_goals: 0,
        away_goals: 0,
        overtime_period: false,
        is_shootout: false
      };

      const result = await insertTableData("games", payload);
      if (result.error) {
        throw new Error(result.error);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create game");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900">Schedule New Game</h2>
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

          <form id="game-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Home Team</label>
                <select
                  name="home_team_id"
                  required
                  value={formData.home_team_id}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  <option value="">Select Home Team</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Away Team</label>
                <select
                  name="away_team_id"
                  required
                  value={formData.away_team_id}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  <option value="">Select Away Team</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date & Time</label>
              <input
                type="datetime-local"
                name="scheduled_time"
                required
                value={formData.scheduled_time}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Venue</label>
              <select
                name="venue_id"
                required
                value={formData.venue_id}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              >
                <option value="">Select Venue</option>
                {venues.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Game Type</label>
                  <select
                    name="game_type"
                    required
                    value={formData.game_type}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none capitalize"
                  >
                    {['regular', 'playoff', 'preseason', 'exhibition'].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 outline-none capitalize"
                  >
                    {['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed'].map(status => (
                      <option key={status} value={status}>{status.replace('_', ' ')}</option>
                    ))}
                  </select>
               </div>
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
            form="game-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Schedule Game"}
          </button>
        </div>
      </div>
    </div>
  );
}
