import { useState, useEffect } from 'react';
import { Database, Save, ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface DatabaseScreenProps {
  onBack: () => void;
}

export default function DatabaseScreen({ onBack }: DatabaseScreenProps) {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [supabaseUrl, setSupabaseUrl] = useState('');

  useEffect(() => {
    // Haal URL uit de env file.
    const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
    setSupabaseUrl(envUrl);
  }, []);

  const testConnection = async () => {
    setStatus('testing');
    try {
      // Simple query to test the connection
      const { error } = await supabase.from('todos').select('id').limit(1);

      if (error) {
        console.error('Supabase connection error:', error);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (e) {
      console.error('Exception during connection test:', e);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-surface-container-low/50 backdrop-blur-md border-b border-[#2A2A2A] sticky top-0 z-50">
        <button
          onClick={onBack}
          className="text-on-surface-variant hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display text-[18px] font-bold text-white uppercase tracking-wider">
          Database Connection
        </h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-lg mx-auto w-full flex flex-col gap-6 pt-8 pb-12">

        <div className="bg-surface-container-low metallic-border rounded-lg p-6 inner-glow flex flex-col gap-4">
          <div className="flex items-center gap-3 text-tertiary">
            <Database className="w-6 h-6" />
            <h2 className="font-mono text-[14px] font-bold tracking-widest uppercase">Supabase Connection</h2>
          </div>

          <p className="text-on-surface-variant text-sm leading-relaxed">
            Test de verbinding met je Supabase project. De omgevingsvariabelen worden gebruikt voor de connectie.
          </p>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Huidige URL (uit .env)</label>
            <input
              type="text"
              value={supabaseUrl}
              readOnly
              className="w-full bg-[#050505] border border-[#333] rounded-md px-3 py-3 text-gray-400 text-sm font-mono focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {status === 'idle' && (
                <span className="text-gray-500 text-xs font-mono uppercase tracking-wider">Geen connectie getest</span>
              )}
              {status === 'testing' && (
                <>
                  <Loader2 className="w-4 h-4 text-tertiary animate-spin" />
                  <span className="text-tertiary text-xs font-mono uppercase tracking-wider">Testen...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-xs font-mono uppercase tracking-wider">Verbonden</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <XCircle className="w-4 h-4 text-error" />
                  <span className="text-error text-xs font-mono uppercase tracking-wider">Verbindingsfout</span>
                </>
              )}
            </div>

            <button
              onClick={testConnection}
              className="bg-tertiary text-black px-4 py-2 rounded font-mono text-[12px] font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(233,196,0,0.2)]"
            >
              <Database className="w-4 h-4" />
              Test Connectie
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
