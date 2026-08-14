import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import MainMenuScreen from './components/MainMenuScreen';
import SettingsScreen from './components/SettingsScreen';
import ScorekeeperScreen from './components/ScorekeeperScreen';
import DatabaseScreen from './components/DatabaseScreen';
import { Screen, Player } from './types';
import { defaultSettingsContract } from './settingsContract';
import { supabase } from './utils/supabase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [scheduledGameData, setScheduledGameData] = useState<{
    homeTeam: string;
    awayTeam: string;
    homeRoster?: Player[];
    awayRoster?: Player[];
    date?: string;
    time?: string;
    location?: string;
    competition?: string;
    matchType?: string;
  } | null>(null);

  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select();

      if (todos) {
        setTodos(todos);
      }
    }

    getTodos();
  }, []);

  const handleStartScheduledGame = (gameData: any) => {
    setScheduledGameData(gameData);
    setCurrentScreen('settings');
  };

  const handleNewGame = () => {
    setScheduledGameData(null);
    setCurrentScreen('settings');
  };

  return (
    <div className="w-full min-h-screen bg-background text-on-background font-body overflow-x-hidden selection:bg-tertiary selection:text-on-tertiary flex flex-col">
      <div className="flex-1">
        {currentScreen === 'splash' && <LoginScreen onLogin={() => setCurrentScreen('main-menu')} />}

        {currentScreen === 'main-menu' && (
          <MainMenuScreen
            onNewGame={handleNewGame}
            onLogout={() => setCurrentScreen('splash')}
            onDatabase={() => setCurrentScreen('database')}
          />
        )}

        {currentScreen === 'database' && (
          <DatabaseScreen onBack={() => setCurrentScreen('main-menu')} />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            scheduledGameData={scheduledGameData}
            contract={defaultSettingsContract}
            onStart={() => setCurrentScreen('scorekeeper')}
            onBack={() => setCurrentScreen('main-menu')}
          />
        )}

        {currentScreen === 'scorekeeper' && <ScorekeeperScreen contract={defaultSettingsContract} onBack={() => setCurrentScreen('settings')} />}
      </div>

      {todos.length > 0 && (
        <div className="p-4 bg-surface-container-low border-t border-[#2A2A2A]">
          <h2 className="text-white font-bold mb-2">Supabase Todos Data:</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
