import { useEffect, useState, useMemo, memo } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

interface BootLine {
  text: string;
  status: 'ok' | 'info' | 'loading';
  delay: number;
}

const KaliDragonLogo = memo(() => (
  <svg 
    viewBox="0 0 100 100" 
    className="w-24 h-24 md:w-32 md:h-32"
    aria-label="Kali Dragon Logo"
  >
    <defs>
      <linearGradient id="dragonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(270, 80%, 55%)" stopOpacity="0.8" />
        <stop offset="50%" stopColor="hsl(200, 100%, 50%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(270, 80%, 55%)" stopOpacity="0.8" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Stylized dragon outline */}
    <g filter="url(#glow)" stroke="url(#dragonGlow)" strokeWidth="1.5" fill="none">
      {/* Dragon head */}
      <path d="M50 15 C35 20, 25 35, 30 50 C25 55, 20 60, 25 70 C30 75, 40 72, 45 68" />
      <path d="M50 15 C65 20, 75 35, 70 50 C75 55, 80 60, 75 70 C70 75, 60 72, 55 68" />
      {/* Dragon body curve */}
      <path d="M45 68 C40 75, 35 80, 40 88 C45 92, 55 92, 60 88 C65 80, 60 75, 55 68" />
      {/* Dragon wings */}
      <path d="M30 50 C20 45, 12 50, 10 60 C12 65, 18 62, 25 55" />
      <path d="M70 50 C80 45, 88 50, 90 60 C88 65, 82 62, 75 55" />
      {/* Eye accents */}
      <circle cx="42" cy="35" r="2" fill="hsl(200, 100%, 60%)" />
      <circle cx="58" cy="35" r="2" fill="hsl(200, 100%, 60%)" />
    </g>
  </svg>
));

KaliDragonLogo.displayName = 'KaliDragonLogo';

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  const bootSequence: BootLine[] = useMemo(() => [
    { text: 'Initializing kernel modules', status: 'ok', delay: 400 },
    { text: 'Loading hardware drivers', status: 'ok', delay: 600 },
    { text: 'Starting network services', status: 'ok', delay: 500 },
    { text: 'Mounting filesystem', status: 'ok', delay: 450 },
    { text: 'Checking security protocols', status: 'ok', delay: 550 },
    { text: 'Loading user configuration', status: 'ok', delay: 400 },
    { text: 'Starting display manager', status: 'ok', delay: 500 },
  ], []);

  useEffect(() => {
    let currentLine = 0;
    let totalDelay = 800; // Initial delay before first line

    const timers: NodeJS.Timeout[] = [];

    bootSequence.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
        currentLine = index + 1;
      }, totalDelay);
      timers.push(timer);
      totalDelay += line.delay;
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    // Show prompt after boot sequence
    const promptTimer = setTimeout(() => {
      setShowPrompt(true);
    }, totalDelay + 300);
    timers.push(promptTimer);

    // Complete boot
    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDelay + 1500);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [bootSequence, onComplete]);

  const progressBar = useMemo(() => {
    const filled = Math.floor(progress / 5);
    const empty = 20 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }, [progress]);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden scanlines noise-overlay"
      style={{ backgroundColor: 'hsl(220, 20%, 4%)' }}
      role="status"
      aria-label="System booting"
    >
      {/* Faint scrolling boot logs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0 font-mono text-[10px] leading-tight text-foreground/50 whitespace-pre animate-scroll-up">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="py-0.5">
              [{new Date().toISOString()}] kernel: Loading module {i + 1}...
            </div>
          ))}
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-2xl w-full">
        {/* Kali Dragon Logo with glow */}
        <div className="relative">
          <div 
            className="absolute inset-0 blur-2xl opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(270, 80%, 55%) 0%, transparent 70%)' }}
          />
          <KaliDragonLogo />
        </div>

        {/* Boot sequence output */}
        <div className="w-full font-mono text-sm md:text-base space-y-1">
          {bootSequence.slice(0, visibleLines).map((line, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span 
                className="text-[hsl(128,100%,50%)] font-bold"
                style={{ textShadow: '0 0 8px hsl(128, 100%, 50%)' }}
              >
                [ OK ]
              </span>
              <span className="text-foreground/80">{line.text}</span>
            </div>
          ))}

          {/* Loading progress bar */}
          {visibleLines >= 3 && (
            <div className="mt-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-foreground/60">Loading system environment...</span>
                <span 
                  className="text-[hsl(200,100%,50%)]"
                  style={{ textShadow: '0 0 6px hsl(200, 100%, 50%)' }}
                >
                  {progressBar}
                </span>
                <span className="text-[hsl(270,80%,70%)]">{Math.min(100, Math.floor(progress))}%</span>
              </div>
            </div>
          )}

          {/* Terminal prompt */}
          {showPrompt && (
            <div className="mt-4 flex items-center animate-fade-in">
              <span 
                className="text-[hsl(270,80%,60%)]"
                style={{ textShadow: '0 0 8px hsl(270, 80%, 55%)' }}
              >
                root@kali
              </span>
              <span className="text-foreground/60">:</span>
              <span 
                className="text-[hsl(200,100%,50%)]"
                style={{ textShadow: '0 0 6px hsl(200, 100%, 50%)' }}
              >
                ~
              </span>
              <span className="text-foreground/60">#</span>
              <span className="terminal-cursor ml-2" />
            </div>
          )}
        </div>
      </div>

      {/* Subtle scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)'
        }}
      />

      {/* Corner vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Fullscreen hint */}
      <div className="absolute bottom-6 left-6 animate-fade-in opacity-40">
        <p className="text-foreground/50 text-xs font-mono">
          Press F11 for fullscreen
        </p>
      </div>
    </div>
  );
};

export default BootScreen;
