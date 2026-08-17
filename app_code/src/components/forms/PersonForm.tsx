import { useState } from 'react';

interface PersonFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function PersonForm({ onSubmit, onCancel }: PersonFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone: '',
    handedness: 'right',
    profile_photo_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <h3 className="text-lg font-extrabold text-slate-900 mb-4">Add New Person</h3>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">First Name *</label>
            <input type="text" required value={formData.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Last Name *</label>
            <input type="text" required value={formData.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Date of Birth</label>
            <input type="date" value={formData.date_of_birth} onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email *</label>
            <input type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Phone</label>
            <input type="text" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Handedness</label>
            <select value={formData.handedness} onChange={(e) => handleInputChange('handedness', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="ambidextrous">Ambidextrous</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Profile Photo URL</label>
            <input type="text" value={formData.profile_photo_url} onChange={(e) => handleInputChange('profile_photo_url', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
            {isSubmitting ? 'Saving...' : 'Save Person'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
