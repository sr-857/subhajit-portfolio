import { useState, useRef, useEffect, ReactNode } from 'react';
import { Minus, Square, X } from 'lucide-react';

interface XPWindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isActive?: boolean;
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
  minimized?: boolean;
  className?: string;
}

const XPWindow = ({
  title,
  icon,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 500, height: 400 },
  isActive = true,
  onClose,
  onFocus,
  zIndex = 10,
  minimized = false,
  className = '',
}: XPWindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (onFocus) onFocus();
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: Math.max(0, e.clientX - dragOffset.x),
          y: Math.max(0, e.clientY - dragOffset.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (minimized) return null;

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)' }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  return (
    <div
      ref={windowRef}
      className={`xp-window fixed flex flex-col ${className}`}
      style={{
        ...windowStyle,
        zIndex,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`xp-window-header ${!isActive ? 'xp-window-header-inactive' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="text-white text-sm font-bold truncate select-none">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="xp-control-button hover:brightness-110 transition-all">
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button 
            className="xp-control-button hover:brightness-110 transition-all"
            onClick={handleMaximize}
          >
            <Square className="w-2.5 h-2.5 text-white" />
          </button>
          <button 
            className="xp-control-button close hover:brightness-110 transition-all"
            onClick={onClose}
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 bg-card overflow-hidden glass-panel border-t-0 rounded-t-none">
        {children}
      </div>
    </div>
  );
};

export default XPWindow;
