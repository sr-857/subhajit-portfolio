import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
    isOpen: boolean;
  }>;
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  startMenuOpen?: boolean;
}

const Taskbar = ({ windows, activeWindow, onWindowClick, onStartClick, startMenuOpen }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-11 flex items-center z-[200] bg-gradient-to-r from-zinc-900/95 via-zinc-800/95 to-zinc-900/95 backdrop-blur-md border-t border-white/10">
      {/* Start Button */}
      <button 
        className={`h-full px-4 flex items-center gap-2.5 bg-gradient-to-r from-emerald-600/90 to-emerald-700/90 hover:from-emerald-500/90 hover:to-emerald-600/90 transition-all duration-200 ${startMenuOpen ? 'brightness-90' : ''}`}
        onClick={onStartClick}
      >
        <div className="hacker-icon-3d w-7 h-7">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-sm shadow-[0_0_4px_rgba(248,113,113,0.6)]"></div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-sm shadow-[0_0_4px_rgba(74,222,128,0.6)]"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm shadow-[0_0_4px_rgba(96,165,250,0.6)]"></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-sm shadow-[0_0_4px_rgba(250,204,21,0.6)]"></div>
          </div>
        </div>
        <span className="italic font-bold text-white tracking-wide drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">start</span>
      </button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1.5 px-3 overflow-x-auto">
        {windows.filter(w => w.isOpen).map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg min-w-[140px] max-w-[200px]
              transition-all duration-200 text-sm border
              ${activeWindow === window.id 
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.2)]' 
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {window.icon}
            </div>
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 px-4 h-full bg-gradient-to-l from-black/30 to-transparent border-l border-white/10">
        {/* Status indicators */}
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" title="Network connected" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" title="Secure connection" />
        </div>

        {/* Clock */}
        <div className="flex items-center gap-2 text-white/90 text-sm font-mono tracking-wider">
          <Clock className="w-4 h-4 opacity-70 icon-glow-cyan" />
          <span className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
