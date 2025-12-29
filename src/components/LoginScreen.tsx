import { useState } from 'react';
import { User, Power, ArrowRight, Lock, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    onLogin();
  };

  const handleUserClick = () => {
    setShowPassword(true);
  };

  return (
    <div className="fixed inset-0 flex z-50">
      {/* XP Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0058e6] to-[#003399]" />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      {/* Left Panel */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* Windows XP Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-1 mb-2">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-white text-xl font-franklin tracking-wide">
            Microsoft<sup className="text-[10px]">®</sup>
          </h1>
          <h2 className="text-white text-4xl font-bold font-franklin italic">
            Windows<span className="text-cyan-300">XP</span>
          </h2>
        </div>

        <p className="text-white text-lg font-tahoma opacity-90">
          To begin, click your user name
        </p>
      </div>

      {/* Vertical Separator */}
      <div className="relative w-[3px] h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>

      {/* Right Panel - User Selection */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* User Card */}
        <div 
          className={`
            glass-panel rounded-lg p-4 cursor-pointer transition-all duration-200
            hover:bg-white/20 hover:scale-105 hover:border-glow
            ${showPassword ? 'bg-white/15' : ''}
          `}
          onClick={handleUserClick}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-neon-cyan to-neon-green flex items-center justify-center shadow-lg border-2 border-white/30">
              <Shield className="w-8 h-8 text-primary-foreground drop-shadow" />
            </div>
            
            {/* User Info */}
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold font-tahoma">Subhajit Roy</span>
              <span className="text-white/60 text-xs font-mono">Security Engineer</span>
              
              {showPassword ? (
                <div className="flex items-center gap-2 mt-2">
                  <div className="relative">
                    <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="Type your password"
                      className="pl-8 pr-2 py-1 text-sm rounded bg-white/90 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary w-40"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogin();
                    }}
                    className="w-7 h-7 rounded flex items-center justify-center bg-green-500 hover:bg-green-400 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <span className="text-white/70 text-sm font-tahoma mt-1">Click to log in</span>
              )}
            </div>
          </div>
        </div>

        {/* Additional hint */}
        <p className="text-white/50 text-xs mt-8 font-mono">
          Password hint: No password required
        </p>
      </div>

      {/* Turn Off Button */}
      <button 
        className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg glass-panel hover:bg-red-500/30 transition-colors group"
        onClick={() => window.close()}
      >
        <Power className="w-5 h-5 text-red-400 group-hover:text-red-300" />
        <span className="text-white text-sm font-tahoma">Turn off computer</span>
      </button>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-50" />
    </div>
  );
};

export default LoginScreen;
