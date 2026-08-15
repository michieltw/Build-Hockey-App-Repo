
import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import Dashboard from './components/Dashboard';
import StandardUserDashboard from './components/StandardUserDashboard';
import ProfileSection from './components/ProfileSection';
import ScorekeeperScreen from './components/ScorekeeperScreen';
import { SettingsContract } from './settingsContract';
import { UserRole, AppDatabase } from './types';
import { supabase } from './utils/supabase';
import { getPersons } from './services/PersonService';
import { getMatches } from './services/MatchService';
import { getTeams } from './services/TeamService';
import { initialDatabase } from './db/initialData';

function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Guest');

  // Hydrate DB from Supabase on top of initial defaults
  const [db, setDb] = useState<AppDatabase>(initialDatabase as any);
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    if (user) {
      setUserRole('Admin');

      const fetchDbData = async () => {
         try {
           const [personsRes, matchesRes, teamsRes] = await Promise.all([
              getPersons(),
              getMatches(),
              getTeams()
           ]);

           setDb(prev => ({
             ...prev,
             currentUser: { username: user.email || 'Admin', personId: user.id, systemRole: 'Admin' },
             persons: personsRes || [],
             matches: matchesRes || [],
             teams: teamsRes || []
           }));
         } catch(e) {
           console.error("Failed to load DB", e);
         } finally {
           setLoadingDb(false);
         }
      };

      fetchDbData();
    } else {
       setLoadingDb(false);
    }
  }, [user]);

  const handleLogin = (role: UserRole, personId: string | null, username: string, email: string) => {
    setUserRole(role);
    if (role === 'StandardUser') {
      setActiveTab('player-dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserRole('Guest');
  };

  if (!user) {
    return <SplashScreen onLogin={handleLogin} onContinueAsGuest={() => setUserRole('Guest')} />;
  }

  const handleUpdateDb = (updatedDb: AppDatabase) => {
    setDb({ ...updatedDb });
  };

  const settingsContract = new SettingsContract();

  if (loadingDb) {
    return <div>Loading Database...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white" id="app-root">
      <Header
        db={db}
        onSwitchRole={(role) => setUserRole(role)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDb={() => {}}
        isDarkMode={false}
        onLogoClick={() => {}}
        onLogout={handleLogout}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {activeTab === 'dashboard' && <Dashboard db={db} onUpdateDb={handleUpdateDb} />}
        {activeTab === 'player-dashboard' && <StandardUserDashboard db={db} onUpdateDb={handleUpdateDb} />}
        {activeTab === 'profile' && <ProfileSection db={db} onUpdateDb={handleUpdateDb} />}
        {activeTab === 'scorekeeper' && (
          <ScorekeeperScreen
            contract={settingsContract}
            onBack={() => setActiveTab('dashboard')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
