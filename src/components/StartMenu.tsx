import { useState } from 'react';
import {
  User,
  FolderOpen,
  Mail,
  Terminal,
  Shield,
  Settings,
  Power,
  LogOut,
  Lock,
  HelpCircle,
  Search,
  FileText,
  Globe,
  Music,
  Image,
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
  onLogout: () => void;
}

const StartMenu = ({ isOpen, onClose, onOpenWindow, onLogout }: StartMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const menuItems = [
    { id: 'about', label: 'About Me', icon: User, description: 'View profile information' },
    { id: 'projects', label: 'Security Projects', icon: FolderOpen, description: 'Browse my work' },
    { id: 'skills', label: 'Technical Skills', icon: Shield, description: 'View certifications & skills' },
    { id: 'contact', label: 'Contact Me', icon: Mail, description: 'Get in touch' },
    { id: 'terminal', label: 'Security Terminal', icon: Terminal, description: 'Access command line' },
  ];

  const quickItems = [
    { icon: Globe, label: 'GitHub', url: 'https://github.com/sr-857' },
    { icon: FileText, label: 'LinkedIn', url: 'https://linkedin.com/in/sr857' },
  ];

  const handleItemClick = (id: string) => {
    onOpenWindow(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[190]" 
        onClick={onClose}
      />

      {/* Start Menu */}
      <div className="fixed bottom-10 left-0 z-[200] w-[400px] animate-scale-in origin-bottom-left">
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(213,72%,36%)] via-[hsl(213,80%,42%)] to-[hsl(213,72%,36%)] rounded-t-lg px-4 py-3 flex items-center gap-3">
          <div className="hacker-icon-3d w-14 h-14">
            <Shield className="w-8 h-8 icon-glow-cyan" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">Subhajit Roy</p>
            <p className="text-white/70 text-xs">Security Researcher</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 backdrop-blur-sm">
          {/* Left Column - Programs */}
          <div className="flex-1 py-2">
            {menuItems.map((item, index) => {
              const glowColors = ['icon-glow-cyan', 'icon-glow-green', 'icon-glow-cyan', 'icon-glow-white', 'icon-glow-green'];
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-all duration-200 ${
                    hoveredItem === item.id 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-green-500/10 border-l-2 border-cyan-400' 
                      : 'border-l-2 border-transparent'
                  }`}
                >
                  <div className={`hacker-icon-3d w-10 h-10 ${hoveredItem === item.id ? 'scale-105' : ''}`}>
                    <item.icon className={`w-5 h-5 ${glowColors[index]} transition-all duration-200`} />
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${hoveredItem === item.id ? 'text-cyan-300' : 'text-white/90'}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs ${hoveredItem === item.id ? 'text-cyan-400/70' : 'text-white/50'}`}>
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Separator */}
            <div className="border-t border-white/10 my-2 mx-3" />

            {/* Quick Links */}
            <div className="px-3 py-1">
              <p className="text-xs text-cyan-400/60 mb-2 uppercase tracking-wider">Quick Links</p>
              <div className="flex gap-2">
                {quickItems.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4 icon-glow-cyan" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - System */}
          <div className="w-[140px] bg-white/5 py-2 px-2 border-l border-white/10">
            <button className="w-full px-2 py-2 flex items-center gap-2 text-left text-white/70 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-lg text-sm transition-all duration-200">
              <FileText className="w-4 h-4" />
              Resume
            </button>
            <button className="w-full px-2 py-2 flex items-center gap-2 text-left text-white/70 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-lg text-sm transition-all duration-200">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="w-full px-2 py-2 flex items-center gap-2 text-left text-white/70 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-lg text-sm transition-all duration-200">
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
            <button className="w-full px-2 py-2 flex items-center gap-2 text-left text-white/70 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-lg text-sm transition-all duration-200">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 rounded-b-lg px-3 py-2 flex justify-end gap-2 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-orange-500/20 hover:text-orange-300 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Log Off
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200 font-medium">
            <Power className="w-4 h-4" />
            Turn Off
          </button>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
