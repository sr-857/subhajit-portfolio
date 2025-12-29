import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HackerIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'glass' | 'metallic' | 'holographic' | 'wireframe';
  glowColor?: 'cyan' | 'green' | 'white' | 'mixed';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const glowClasses = {
  cyan: 'shadow-[0_0_15px_rgba(0,255,255,0.4),0_0_30px_rgba(0,255,255,0.2),inset_0_0_10px_rgba(0,255,255,0.1)]',
  green: 'shadow-[0_0_15px_rgba(0,255,136,0.4),0_0_30px_rgba(0,255,136,0.2),inset_0_0_10px_rgba(0,255,136,0.1)]',
  white: 'shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.15),inset_0_0_10px_rgba(255,255,255,0.1)]',
  mixed: 'shadow-[0_0_15px_rgba(0,255,255,0.3),0_0_30px_rgba(0,255,136,0.2),inset_0_0_10px_rgba(0,255,255,0.1)]',
};

const variantStyles = {
  glass: {
    container: 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 backdrop-blur-md',
    icon: 'text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]',
  },
  metallic: {
    container: 'bg-gradient-to-br from-zinc-700/90 via-zinc-800/90 to-zinc-900/90 border border-zinc-500/30',
    icon: 'text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]',
  },
  holographic: {
    container: 'bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-green-500/20 border border-cyan-400/30 backdrop-blur-sm',
    icon: 'text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]',
  },
  wireframe: {
    container: 'bg-transparent border-2 border-cyan-400/50 backdrop-blur-sm',
    icon: 'text-cyan-400 drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]',
  },
};

const HackerIcon = ({
  icon: Icon,
  size = 'lg',
  variant = 'glass',
  glowColor = 'cyan',
  className,
}: HackerIconProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative rounded-xl flex items-center justify-center transition-all duration-300',
        'hover:scale-110 hover:brightness-125',
        'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-t before:from-transparent before:via-white/5 before:to-white/10 before:pointer-events-none',
        'after:absolute after:inset-[-1px] after:rounded-xl after:bg-gradient-to-br after:from-white/20 after:via-transparent after:to-transparent after:pointer-events-none after:opacity-50',
        sizeClasses[size],
        styles.container,
        glowClasses[glowColor],
        className
      )}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-30" />
      
      {/* Ambient light reflection */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400/10 via-transparent to-green-400/10 blur-sm opacity-50" />
      
      {/* Icon */}
      <Icon className={cn('relative z-10', iconSizeClasses[size], styles.icon)} />
    </div>
  );
};

export default HackerIcon;
