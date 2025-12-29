import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'warning' | 'error' | 'info';
  content: string;
}

const COMMANDS: Record<string, string | string[]> = {
  help: [
    'Available commands:',
    '  help      - Show this help message',
    '  about     - Display information about me',
    '  skills    - List my technical skills',
    '  projects  - View my projects',
    '  contact   - Get my contact information',
    '  certs     - List certifications',
    '  github    - Show GitHub stats',
    '  status    - Check system status',
    '  scan      - Run network scan',
    '  clear     - Clear terminal',
    '  whoami    - Display user info',
  ],
  about: [
    '╔═══════════════════════════════════════════════════╗',
    '║       SUBHAJIT ROY - SECURITY ENGINEER            ║',
    '╠═══════════════════════════════════════════════════╣',
    '║  Cybersecurity professional with experience in:   ║',
    '║  → Vulnerability Assessment & Pen Testing         ║',
    '║  → Threat Hunting & Incident Response             ║',
    '║  → Security Tool Development (Python)             ║',
    '║  → SOC Analytics & SIEM Platforms                 ║',
    '║  → AI/ML Security Applications                    ║',
    '║                                                   ║',
    '║  📍 Location: Assam, India                        ║',
    '║  🎓 B.Sc. Computer Science - Assam University     ║',
    '║  🏆 Smart India Hackathon 2024 - Runner Up        ║',
    '╚═══════════════════════════════════════════════════╝',
  ],
  skills: [
    '[SCANNING SKILL MATRIX...]',
    '',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░ Python/Security Scripts  92%',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ Vulnerability Assessment 90%',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ Kali Linux/Metasploit    88%',
    '▓▓▓▓▓▓▓▓▓▓▓▓░░░░ Threat Hunting           85%',
    '▓▓▓▓▓▓▓▓▓▓▓░░░░░ SIEM (Splunk/Elastic)    78%',
    '▓▓▓▓▓▓▓▓▓▓▓▓░░░░ Web Security/OWASP       85%',
    '▓▓▓▓▓▓▓▓▓▓▓▓░░░░ FastAPI/Flask            85%',
    '▓▓▓▓▓▓▓▓▓▓░░░░░░ React/TypeScript         80%',
    '',
    '[SCAN COMPLETE]',
  ],
  projects: [
    '┌─────────────────────────────────────────────┐',
    '│ SECURITY PROJECT REGISTRY                  │',
    '├─────────────────────────────────────────────┤',
    '│ 01. AstraGuard AI                          │',
    '│     Autonomous CubeSat Fault Detection     │',
    '│     Status: DEPLOYED ● Live                │',
    '│                                            │',
    '│ 02. PhishGuard AI                          │',
    '│     ML-powered phishing detection (98.3%)  │',
    '│     Status: DEPLOYED ● Live                │',
    '│                                            │',
    '│ 03. CyberSentinel                          │',
    '│     SOC threat intelligence platform       │',
    '│     Status: DEPLOYED ● Live                │',
    '│                                            │',
    '│ 04. SpectraGraph                           │',
    '│     Visual OSINT investigation platform    │',
    '│     Status: DEPLOYED ● Live                │',
    '│                                            │',
    '│ 05. VulnVision                             │',
    '│     Passive recon & security analyzer      │',
    '│     Status: DEPLOYED ● Live                │',
    '│                                            │',
    '│ 06. Threat Hunting Playbooks               │',
    '│     Enterprise detection platform          │',
    '│     Status: DEPLOYED ● Live ★3             │',
    '└─────────────────────────────────────────────┘',
  ],
  contact: [
    '╭──────────────────────────────────────────╮',
    '│ SECURE COMMUNICATION CHANNELS            │',
    '├──────────────────────────────────────────┤',
    '│ ✉ Email: subhajitroy857@gmail.com        │',
    '│ 🔗 GitHub: github.com/sr-857             │',
    '│ 💼 LinkedIn: linkedin.com/in/sr857       │',
    '│ 📷 Instagram: s.r_857                    │',
    '│ 📍 Location: Assam, India                │',
    '╰──────────────────────────────────────────╯',
  ],
  certs: [
    '> CERTIFICATION DATABASE (25+)',
    '',
    '  [★] Google Cybersecurity Professional Certificate',
    '  [★] CCEP - Certified Cybersecurity Educator',
    '  [★] Cisco Introduction to Cybersecurity',
    '',
    '  [✓] Google - Foundations of Cybersecurity',
    '  [✓] Google - Tools of the Trade: Linux and SQL',
    '  [✓] Google - Assets, Threats, and Vulnerabilities',
    '  [✓] Google Cloud - Data Loss Prevention (DLP)',
    '',
    '  [✓] Red Team - Windows Kernel Exploitation',
    '  [✓] Red Team - Offensive Agent AI Course',
    '  [✓] Red Team - Web Browser for Hacking',
    '',
    '  [✓] EC-Council - SQL Injection Attacks',
    '  [✓] EC-Council - In-house Hacking Lab',
    '  [✓] CDAC - Windows Forensic Analysis',
    '  [✓] LinkedIn - Hashcat Essential Training',
    '  [✓] Kaggle - AI Agents Intensive Course',
    '',
    '  [✓] AWS Solutions Architecture Simulation',
    '  [✓] Deloitte Cyber + Data Analytics',
    '  [✓] Mastercard Cybersecurity Simulation',
    '  [✓] AIG Shields Up Simulation',
    '  [✓] Tata Cybersecurity Analyst',
    '',
    '  [◉] IIT Madras Shaastra 2026 - CP Potpourri',
    '  [◉] IIT Madras Shaastra 2026 - Quantathon',
    '  [◉] SKY HACK 2025 Participant',
  ],
  github: [
    '> GITHUB PROFILE: sr-857',
    '',
    '  Repositories: 15+',
    '  Followers: 3',
    '  Following: 3',
    '',
    '  Top Languages:',
    '    Python     ████████████░░ 85%',
    '    TypeScript ████████░░░░░░ 55%',
    '    JavaScript ███████░░░░░░░ 50%',
    '    Shell      █████░░░░░░░░░ 35%',
    '',
    '  Achievements: Pull Shark, YOLO, Quickdraw',
    '',
    '  $ open https://github.com/sr-857',
  ],
  status: [
    '> SYSTEM STATUS CHECK',
    '',
    '  CPU:    ████████░░ 80%',
    '  MEMORY: ██████░░░░ 60%',
    '  DISK:   ████░░░░░░ 40%',
    '  NETWORK: CONNECTED [SECURE]',
    '',
    '  SECURITY: All defenses active',
    '  THREAT LEVEL: LOW',
    '  All systems operational.',
  ],
  scan: [
    '> INITIATING NETWORK SCAN...',
    '',
    '  [■□□□□□□□□□] 10% Scanning ports...',
    '  [■■■□□□□□□□] 30% Checking services...',
    '  [■■■■■□□□□□] 50% Analyzing traffic...',
    '  [■■■■■■■□□□] 70% Detecting threats...',
    '  [■■■■■■■■■□] 90% Compiling report...',
    '  [■■■■■■■■■■] 100%',
    '',
    '  SCAN COMPLETE: No threats detected.',
    '  Firewall: ACTIVE | IDS: ONLINE',
  ],
  whoami: [
    '',
    '  User: Subhajit Roy',
    '  Role: Cybersecurity Professional',
    '  Level: Security Intern @ Codec Technologies',
    '  Clearance: Guest Access',
    '  Session: Encrypted',
    '',
  ],
  clear: '',
};

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', content: '╔════════════════════════════════════════════════════════╗' },
    { type: 'info', content: '║  SUBHAJIT ROY - SECURITY TERMINAL v2.0                 ║' },
    { type: 'info', content: '║  Type "help" for available commands                    ║' },
    { type: 'info', content: '╚════════════════════════════════════════════════════════╝' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: `guest@security:~$ ${cmd}` },
    ];

    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    const response = COMMANDS[trimmedCmd];
    
    if (response) {
      if (Array.isArray(response)) {
        response.forEach((line) => {
          newLines.push({ 
            type: trimmedCmd === 'whoami' ? 'warning' : 'success', 
            content: line 
          });
        });
      } else {
        newLines.push({ type: 'success', content: response });
      }
    } else if (trimmedCmd) {
      newLines.push({ 
        type: 'error', 
        content: `Command not found: ${trimmedCmd}. Type "help" for available commands.` 
      });
    }

    setLines(newLines);
    setHistory([...history, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const getLineClass = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'terminal-prompt';
      case 'success':
        return 'terminal-success';
      case 'warning':
        return 'terminal-warning';
      case 'error':
        return 'terminal-error';
      case 'info':
        return 'text-neon-cyan';
      default:
        return '';
    }
  };

  return (
    <div 
      className="terminal h-full w-full flex flex-col p-4 scanlines noise-overlay cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Output */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30"
      >
        {lines.map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap font-mono text-sm ${getLineClass(line.type)}`}
          >
            {line.content || '\u00A0'}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className="flex items-center mt-2 font-mono text-sm">
        <span className="terminal-prompt">guest@security:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none ml-2 text-terminal-text caret-terminal-text"
          autoFocus
          spellCheck={false}
        />
        <span className="terminal-cursor" />
      </div>
    </div>
  );
};

export default Terminal;
