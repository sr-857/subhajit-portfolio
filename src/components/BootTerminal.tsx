import { useEffect, useState } from 'react';

interface BootTerminalProps {
  onComplete: () => void;
}

const BootTerminal = ({ onComplete }: BootTerminalProps) => {
  const [lines, setLines] = useState<Array<{ text: string; type: 'info' | 'success' | 'warning' | 'system' }>>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const bootSequence = [
    { text: '[SYSTEM] Initializing security kernel...', type: 'system' as const, delay: 100 },
    { text: '[OK] Kernel 6.1.0-security loaded', type: 'success' as const, delay: 300 },
    { text: '[SYSTEM] Loading cryptographic modules...', type: 'system' as const, delay: 200 },
    { text: '[OK] AES-256 encryption enabled', type: 'success' as const, delay: 150 },
    { text: '[OK] RSA-4096 keys verified', type: 'success' as const, delay: 150 },
    { text: '[SYSTEM] Establishing secure connection...', type: 'system' as const, delay: 400 },
    { text: '[OK] TLS 1.3 handshake complete', type: 'success' as const, delay: 200 },
    { text: '[SYSTEM] Scanning network interfaces...', type: 'system' as const, delay: 300 },
    { text: '[INFO] eth0: 192.168.1.100 (secured)', type: 'info' as const, delay: 100 },
    { text: '[INFO] wlan0: disabled (security policy)', type: 'info' as const, delay: 100 },
    { text: '[SYSTEM] Loading firewall rules...', type: 'system' as const, delay: 250 },
    { text: '[OK] 847 rules loaded', type: 'success' as const, delay: 150 },
    { text: '[SYSTEM] Initializing IDS/IPS...', type: 'system' as const, delay: 300 },
    { text: '[OK] Snort signatures: 45,892 loaded', type: 'success' as const, delay: 200 },
    { text: '[SYSTEM] Mounting encrypted volumes...', type: 'system' as const, delay: 350 },
    { text: '[OK] /secure mounted (LUKS2)', type: 'success' as const, delay: 150 },
    { text: '[SYSTEM] Loading user environment...', type: 'system' as const, delay: 200 },
    { text: '[INFO] User: sr-857 (Security Researcher)', type: 'info' as const, delay: 150 },
    { text: '[OK] Security clearance: VERIFIED', type: 'success' as const, delay: 200 },
    { text: '[SYSTEM] Starting graphical interface...', type: 'system' as const, delay: 300 },
    { text: '', type: 'system' as const, delay: 100 },
    { text: '╔══════════════════════════════════════════════╗', type: 'success' as const, delay: 50 },
    { text: '║     SECURITY TERMINAL v2.0 - READY           ║', type: 'success' as const, delay: 50 },
    { text: '║     All systems operational                  ║', type: 'success' as const, delay: 50 },
    { text: '╚══════════════════════════════════════════════╝', type: 'success' as const, delay: 50 },
  ];

  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLines(prev => [...prev, bootSequence[currentLine]]);
      setCurrentLine(prev => prev + 1);
    }, bootSequence[currentLine].delay);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete]);

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-neon-green text-glow-green';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-neon-cyan text-glow-cyan';
      case 'system': return 'text-white/80';
      default: return 'text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* CRT Screen Effect */}
      <div className="absolute inset-0 crt-screen">
        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm h-full overflow-hidden">
          {/* Header */}
          <div className="mb-4 text-neon-green text-glow-green">
            <pre className="text-xs leading-tight">
{`
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
╚██████╗   ██║   ██████╔╝███████╗██║  ██║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
`}
            </pre>
            <p className="mt-2 text-neon-cyan">Security Portfolio System v2.0</p>
            <div className="border-b border-neon-green/30 my-2" />
          </div>

          {/* Boot Lines */}
          <div className="space-y-1">
            {lines.map((line, index) => (
              <div 
                key={index} 
                className={`${getTextColor(line.type)} animate-fade-in`}
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                {line.text}
              </div>
            ))}
            {currentLine < bootSequence.length && (
              <span className="inline-block w-2 h-4 bg-neon-green animate-pulse" />
            )}
          </div>
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none scanlines-overlay" />
        
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none vignette" />

        {/* Flicker Effect */}
        <div className="absolute inset-0 pointer-events-none crt-flicker" />
      </div>
    </div>
  );
};

export default BootTerminal;
