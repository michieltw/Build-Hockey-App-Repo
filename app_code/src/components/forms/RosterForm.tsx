import { useState } from 'react';

interface RosterFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function RosterForm({ onSubmit, onCancel }: RosterFormProps) {
  const [formData, setFormData] = useState({
    team_id: '',
    season_id: '',
    player_id: '',
    jersey_number: '',
    is_captain: false,
    is_alternate_captain: false,
    join_date: '',
    contract_end_date: '',
    salary_cap_hit: '',
    status: 'active',
    photo_url: ''
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
      <h3 className="text-lg font-extrabold text-slate-900 mb-4">Assign Player to Roster</h3>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Team ID *</label>
            <input type="number" required value={formData.team_id} onChange={(e) => handleInputChange('team_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Season ID *</label>
            <input type="number" required value={formData.season_id} onChange={(e) => handleInputChange('season_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Player ID *</label>
            <input type="number" required value={formData.player_id} onChange={(e) => handleInputChange('player_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Jersey Number</label>
            <input type="number" value={formData.jersey_number} onChange={(e) => handleInputChange('jersey_number', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Join Date</label>
            <input type="date" value={formData.join_date} onChange={(e) => handleInputChange('join_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contract End Date</label>
            <input type="date" value={formData.contract_end_date} onChange={(e) => handleInputChange('contract_end_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Salary Cap Hit</label>
            <input type="number" step="0.01" value={formData.salary_cap_hit} onChange={(e) => handleInputChange('salary_cap_hit', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Status</label>
            <select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="active">Active</option>
              <option value="injured">Injured</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
              <option value="traded">Traded</option>
              <option value="released">Released</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Photo URL</label>
            <input type="text" value={formData.photo_url} onChange={(e) => handleInputChange('photo_url', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>

          <div className="flex items-center gap-4 col-span-1 md:col-span-2 lg:col-span-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.is_captain} onChange={(e) => handleInputChange('is_captain', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
              <span className="text-sm font-semibold text-slate-700">Captain (C)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.is_alternate_captain} onChange={(e) => handleInputChange('is_alternate_captain', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
              <span className="text-sm font-semibold text-slate-700">Alternate Captain (A)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
            {isSubmitting ? 'Saving...' : 'Save Assignment'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
