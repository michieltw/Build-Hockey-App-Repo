import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { fetchTableData, insertTableData } from '../services/api';
import { RosterForm } from '../components/forms/RosterForm';

export function Rosters() {
  const [rosters, setRosters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTableData('rosters');
      setRosters(data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch rosters');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (formData: any) => {
    setError('');
    const res = await insertTableData('rosters', formData);
    if (res.success) {
      setShowForm(false);
      await loadData();
    } else {
      setError(res.error || 'Failed to save roster assignment');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Rosters</h2>
          <p className="text-slate-500 mt-1">Manage team rosters and player assignments.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Assign Player
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-sm font-semibold">
          {error}
        </div>
      )}

      {showForm && (
        <RosterForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading data...</div>
        ) : rosters.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No roster assignments found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">ID</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Team ID</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Player ID</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rosters.map((roster) => (
                <tr key={roster?.id || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 tabular-nums text-sm font-medium text-slate-500">{roster?.id || '-'}</td>
                  <td className="px-6 py-4 tabular-nums text-sm font-bold text-slate-900">{roster?.team_id || '-'}</td>
                  <td className="px-6 py-4 tabular-nums text-sm font-bold text-slate-900">{roster?.player_id || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
                      (roster?.status || '').toLowerCase() === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {(roster?.status || 'unknown').toUpperCase()}
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
