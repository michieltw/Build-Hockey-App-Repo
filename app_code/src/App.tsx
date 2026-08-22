import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Organizations } from "./pages/Organizations";
import { Teams } from "./pages/Teams";
import { Seasons } from "./pages/Seasons";
import { Persons } from "./pages/Persons";
import { Rosters } from "./pages/Rosters";
import { Players } from "./pages/Players";
import { Equipment } from "./pages/Equipment";
import { Lineups } from "./pages/Lineups";
import { Games } from "./pages/Games";
import { GameDashboard } from "./pages/GameDashboard";
import { TeamStaff } from "./pages/TeamStaff";
import { GameOfficials } from "./pages/GameOfficials";
import { Waivers } from "./pages/Waivers";
import { Transfers } from "./pages/Transfers";
import { Suspensions } from "./pages/Suspensions";
import { PlayerDraft } from "./pages/PlayerDraft";
import { Playoffs } from "./pages/Playoffs";
import { AdvancedStats } from "./pages/AdvancedStats";
import { Events } from "./pages/Events";
import { Practices } from "./pages/Practices";
import { Documents } from "./pages/Documents";
import { Messages } from "./pages/Messages";
import { fetchTableData } from "./services/api";
import { useState } from "react";

function PlaceholderPage({ title }: { title: string }) {
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');

  const testGasConnection = async () => {
    setTestStatus('loading');
    setTestMessage('Testing connection...');
    try {
      // Optionele lichte tabel om te pollen
      await fetchTableData('organizations');
      setTestStatus('success');
      setTestMessage('GAS connection is working perfectly!');
    } catch (error: any) {
      setTestStatus('error');
      setTestMessage(error.message || 'Failed to connect to GAS endpoint.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 mb-6">This module is under construction.</p>

      {title === "Dashboard Overview" && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-2">System Status</h3>
          <p className="text-sm text-slate-500 mb-4">
            Test the connection to the Google Apps Script backend. Make sure your <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">.env</code> file contains the correct <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">VITE_GAS_URL</code>.
          </p>

          <button
            onClick={testGasConnection}
            disabled={testStatus === 'loading'}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {testStatus === 'loading' ? 'Testing...' : 'Test GAS Connection'}
          </button>

          {testStatus === 'success' && (
            <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200">
              {testMessage}
            </div>
          )}
          {testStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
              {testMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PlaceholderPage title="Dashboard Overview" />} />
          <Route path="organizations" element={<Organizations />} />
          <Route path="teams" element={<Teams />} />
          <Route path="rosters" element={<Rosters />} />
          <Route path="players" element={<Players />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="lineups" element={<Lineups />} />
          <Route path="persons" element={<Persons />} />
          <Route path="seasons" element={<Seasons />} />
          <Route path="games" element={<Games />} />
          <Route path="games/:id" element={<GameDashboard />} />
          <Route path="team-staff" element={<TeamStaff />} />
          <Route path="game-officials" element={<GameOfficials />} />
          <Route path="waivers" element={<Waivers />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="suspensions" element={<Suspensions />} />
          <Route path="player-draft" element={<PlayerDraft />} />
          <Route path="playoffs" element={<Playoffs />} />
          <Route path="advanced-stats" element={<AdvancedStats />} />
          <Route path="events" element={<Events />} />
          <Route path="practices" element={<Practices />} />
          <Route path="documents" element={<Documents />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
