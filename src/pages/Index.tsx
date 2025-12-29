import { useState } from 'react';
import BootScreen from '@/components/BootScreen';
import BootTerminal from '@/components/BootTerminal';
import LoginScreen from '@/components/LoginScreen';
import Desktop from '@/components/Desktop';

type AppState = 'boot' | 'boot-terminal' | 'login' | 'desktop';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('boot');

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {appState === 'boot' && (
        <BootScreen onComplete={() => setAppState('boot-terminal')} />
      )}

      {appState === 'boot-terminal' && (
        <BootTerminal onComplete={() => setAppState('login')} />
      )}
      
      {appState === 'login' && (
        <LoginScreen onLogin={() => setAppState('desktop')} />
      )}
      
      {appState === 'desktop' && (
        <Desktop onLogout={() => setAppState('login')} />
      )}
    </div>
  );
};

export default Index;
