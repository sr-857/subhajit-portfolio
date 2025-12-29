import { useState, useEffect } from 'react';
import { 
  User, 
  FolderOpen, 
  Mail, 
  Terminal as TerminalIcon, 
  Code, 
  Shield
} from 'lucide-react';
import desktopWallpaper from '@/assets/hacker-binary-wallpaper.jpg';
import XPWindow from './XPWindow';
import Terminal from './Terminal';
import AboutContent from './sections/AboutContent';
import ProjectsContent from './sections/ProjectsContent';
import SkillsContent from './sections/SkillsContent';
import ContactContent from './sections/ContactContent';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import CRTOverlay from './CRTOverlay';

// Preload wallpaper
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
};

preloadImage(desktopWallpaper);

interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isOpen: boolean;
  isMinimized: boolean;
}

interface DesktopProps {
  onLogout?: () => void;
}

const Desktop = ({ onLogout }: DesktopProps) => {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'about',
      title: 'About Me',
      icon: <User className="w-4 h-4" />,
      component: <AboutContent />,
      position: { x: 80, y: 60 },
      size: { width: 600, height: 500 },
      isOpen: false,
      isMinimized: false,
    },
    {
      id: 'projects',
      title: 'Security Projects',
      icon: <FolderOpen className="w-4 h-4" />,
      component: <ProjectsContent />,
      position: { x: 150, y: 80 },
      size: { width: 750, height: 500 },
      isOpen: false,
      isMinimized: false,
    },
    {
      id: 'skills',
      title: 'Technical Skills',
      icon: <Shield className="w-4 h-4" />,
      component: <SkillsContent />,
      position: { x: 200, y: 100 },
      size: { width: 600, height: 520 },
      isOpen: false,
      isMinimized: false,
    },
    {
      id: 'contact',
      title: 'Contact Me',
      icon: <Mail className="w-4 h-4" />,
      component: <ContactContent />,
      position: { x: 250, y: 120 },
      size: { width: 500, height: 550 },
      isOpen: false,
      isMinimized: false,
    },
    {
      id: 'terminal',
      title: 'Security Terminal',
      icon: <TerminalIcon className="w-4 h-4" />,
      component: <Terminal />,
      position: { x: 100, y: 80 },
      size: { width: 700, height: 450 },
      isOpen: false,
      isMinimized: false,
    },
  ]);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);

  const desktopIcons = [
    { id: 'about', label: 'About Me', icon: User, glow: 'cyan' as const },
    { id: 'projects', label: 'Projects', icon: FolderOpen, glow: 'green' as const },
    { id: 'skills', label: 'Skills', icon: Shield, glow: 'cyan' as const },
    { id: 'contact', label: 'Contact', icon: Mail, glow: 'white' as const },
    { id: 'terminal', label: 'Terminal', icon: TerminalIcon, glow: 'green' as const },
  ];

  const openWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: true, isMinimized: false } : w
    ));
    setActiveWindow(id);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false } : w
    ));
    if (activeWindow === id) {
      const openWindows = windows.filter(w => w.isOpen && w.id !== id);
      setActiveWindow(openWindows.length > 0 ? openWindows[openWindows.length - 1].id : null);
    }
  };

  const focusWindow = (id: string) => {
    setActiveWindow(id);
  };

  const getZIndex = (id: string) => {
    if (activeWindow === id) return 100;
    return 10;
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    setStartMenuOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Desktop Wallpaper */}
      <img 
        src={desktopWallpaper} 
        alt="Cyber hacker background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${wallpaperLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        onLoad={() => setWallpaperLoaded(true)}
      />

      {/* Dark gradient overlay for better contrast and UI readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/35" />

      {/* Vignette effect for depth */}
      <div className="absolute inset-0 vignette pointer-events-none opacity-60" />

      {/* Subtle data grid overlay */}
      <div className="absolute inset-0 data-grid-overlay pointer-events-none opacity-40" />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-3 z-10">
        {desktopIcons.map((item) => {
          const glowClass = item.glow === 'cyan' ? 'icon-glow-cyan' : 
                           item.glow === 'green' ? 'icon-glow-green' : 'icon-glow-white';
          return (
            <div
              key={item.id}
              className="desktop-icon group"
              onDoubleClick={() => openWindow(item.id)}
            >
              <div className="hacker-icon-3d w-14 h-14">
                <item.icon className={`w-7 h-7 ${glowClass} transition-all duration-300 group-hover:scale-110`} />
              </div>
              <span className="mt-1">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map((window) => 
        window.isOpen && (
          <XPWindow
            key={window.id}
            title={window.title}
            icon={window.icon}
            defaultPosition={window.position}
            defaultSize={window.size}
            isActive={activeWindow === window.id}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            zIndex={getZIndex(window.id)}
            minimized={window.isMinimized}
          >
            {window.component}
          </XPWindow>
        )
      )}

      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWindow={openWindow}
        onLogout={handleLogout}
      />

      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        activeWindow={activeWindow}
        onWindowClick={openWindow}
        onStartClick={toggleStartMenu}
        startMenuOpen={startMenuOpen}
      />

      {/* CRT Screen Effects */}
      <CRTOverlay />
    </div>
  );
};

export default Desktop;
