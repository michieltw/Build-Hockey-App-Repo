import { useState } from 'react';

interface LineupFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function LineupForm({ onSubmit, onCancel }: LineupFormProps) {
  const [formData, setFormData] = useState({
    game_id: '',
    team_id: '',
    player_id: '',
    position: 'forward',
    line_number: '',
    is_starting: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <h3 className="text-lg font-extrabold text-slate-900 mb-4">Add to Lineup</h3>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Game ID</label>
            <input type="number" value={formData.game_id} onChange={(e) => handleInputChange('game_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Team ID *</label>
            <input type="number" required value={formData.team_id} onChange={(e) => handleInputChange('team_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Player ID *</label>
            <input type="number" required value={formData.player_id} onChange={(e) => handleInputChange('player_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Position</label>
            <select value={formData.position} onChange={(e) => handleInputChange('position', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="forward">Forward</option>
              <option value="defense">Defense</option>
              <option value="goalie">Goalie</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Line Number</label>
            <input type="number" value={formData.line_number} onChange={(e) => handleInputChange('line_number', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.is_starting} onChange={(e) => handleInputChange('is_starting', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
              <span className="text-sm font-semibold text-slate-700">Starting Lineup</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
            {isSubmitting ? 'Saving...' : 'Save Lineup'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
