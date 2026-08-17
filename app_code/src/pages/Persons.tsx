import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { fetchTableData, insertTableData } from '../services/api';
import { PersonForm } from '../components/forms/PersonForm';

export function Persons() {
  const [persons, setPersons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    const data = await fetchTableData('persons');
    setPersons(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (formData: any) => {
    setError('');
    const res = await insertTableData('persons', formData);
    if (res.success) {
      setShowForm(false);
      await loadData();
    } else {
      setError(res.error || 'Failed to save person');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Persons</h2>
          <p className="text-slate-500 mt-1">Manage individuals (players, staff, users).</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Person
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-sm font-semibold">
          {error}
        </div>
      )}

      {showForm && (
        <PersonForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading data...</div>
        ) : persons.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No persons found. Let's create one.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">ID</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">First Name</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Last Name</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Handedness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {persons.map((person) => (
                <tr key={person?.id || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 tabular-nums text-sm font-medium text-slate-500">{person?.id || '-'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{person?.first_name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{person?.last_name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{person?.email || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 capitalize">{person?.handedness || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
