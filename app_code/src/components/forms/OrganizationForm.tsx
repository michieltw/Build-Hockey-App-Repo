import { useState } from 'react';

interface OrganizationFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function OrganizationForm({ onSubmit, onCancel }: OrganizationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    league_name: '',
    location: '',
    country: '',
    province_state: '',
    logo_url: '',
    website: '',
    contact_email: '',
    contact_phone: '',
    is_active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <h3 className="text-lg font-extrabold text-slate-900 mb-4">Add New Organization</h3>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Organization Name *</label>
            <input type="text" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">League Name</label>
            <input type="text" value={formData.league_name} onChange={(e) => handleInputChange('league_name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Location</label>
            <input type="text" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Country</label>
            <input type="text" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Province/State</label>
            <input type="text" value={formData.province_state} onChange={(e) => handleInputChange('province_state', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Logo URL</label>
            <input type="text" value={formData.logo_url} onChange={(e) => handleInputChange('logo_url', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Website</label>
            <input type="text" value={formData.website} onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Email</label>
            <input type="email" value={formData.contact_email} onChange={(e) => handleInputChange('contact_email', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Phone</label>
            <input type="text" value={formData.contact_phone} onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input type="checkbox" id="isActive" checked={formData.is_active} onChange={(e) => handleInputChange('is_active', e.target.checked)}
            className="w-4 h-4 text-slate-900 bg-slate-100 border-slate-300 rounded focus:ring-slate-900" />
          <label htmlFor="isActive" className="ml-2 text-sm font-semibold text-slate-700">Active Organization</label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
            {isSubmitting ? 'Saving...' : 'Save Organization'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
