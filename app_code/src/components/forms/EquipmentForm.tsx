import { useState } from 'react';

interface EquipmentFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function EquipmentForm({ onSubmit, onCancel }: EquipmentFormProps) {
  const [formData, setFormData] = useState({
    player_id: '',
    equipment_type: 'stick',
    brand_id: '',
    model: '',
    serial_number: '',
    condition: 'good',
    is_in_use: true
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
      <h3 className="text-lg font-extrabold text-slate-900 mb-4">Log Personal Equipment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Player ID *</label>
            <input type="number" required value={formData.player_id} onChange={(e) => handleInputChange('player_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Equipment Type</label>
            <select value={formData.equipment_type} onChange={(e) => handleInputChange('equipment_type', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="stick">Stick</option>
              <option value="helmet">Helmet</option>
              <option value="gloves">Gloves</option>
              <option value="pads">Pads</option>
              <option value="skates">Skates</option>
              <option value="jersey">Jersey</option>
              <option value="pants">Pants</option>
              <option value="shoulder_pads">Shoulder Pads</option>
              <option value="shin_guards">Shin Guards</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Brand ID</label>
            <input type="number" value={formData.brand_id} onChange={(e) => handleInputChange('brand_id', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Model Name</label>
            <input type="text" value={formData.model} onChange={(e) => handleInputChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Serial Number</label>
            <input type="text" value={formData.serial_number} onChange={(e) => handleInputChange('serial_number', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Condition</label>
            <select value={formData.condition} onChange={(e) => handleInputChange('condition', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.is_in_use} onChange={(e) => handleInputChange('is_in_use', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
              <span className="text-sm font-semibold text-slate-700">Currently in use</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
            {isSubmitting ? 'Saving...' : 'Save Equipment'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
