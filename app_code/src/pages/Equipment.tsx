import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { fetchTableData, insertTableData } from '../services/api';
import { EquipmentForm } from '../components/forms/EquipmentForm';

export function Equipment() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTableData('personal_equipment');
      setEquipment(data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch equipment');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (formData: any) => {
    setError('');
    const res = await insertTableData('personal_equipment', formData);
    if (res.success) {
      setShowForm(false);
      await loadData();
    } else {
      setError(res.error || 'Failed to log equipment');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Personal Equipment</h2>
          <p className="text-slate-500 mt-1">Track player gear, condition, and status.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Log Equipment
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-sm font-semibold">
          {error}
        </div>
      )}

      {showForm && (
        <EquipmentForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading data...</div>
        ) : equipment.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No equipment logs found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">ID</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Player ID</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Type</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Model</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipment.map((item) => (
                <tr key={item?.id || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 tabular-nums text-sm font-medium text-slate-500">{item?.id || '-'}</td>
                  <td className="px-6 py-4 tabular-nums text-sm font-bold text-slate-900">{item?.player_id || '-'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 capitalize">{item?.equipment_type || '-'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{item?.model || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
                      item?.is_in_use
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item?.is_in_use ? 'IN USE' : 'STORED'}
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
