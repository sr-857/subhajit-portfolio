import { useState, useCallback, memo, useMemo } from 'react';
import { ExternalLink, Github, Eye, Star, GitFork, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'development' | 'archived';
  stars: number;
  forks: number;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AstraGuard AI',
    description: 'Autonomous Fault Detection & Recovery System for CubeSats. Real-Time Telemetry Simulation, Anomaly Detection, State Machine, Streamlit Dashboard & 3D Attitude Visualizer.',
    tech: ['Python', 'AI', 'Streamlit', 'Pathway'],
    status: 'live',
    stars: 1,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(260, 70%, 50%), hsl(200, 70%, 50%))',
    githubUrl: 'https://github.com/sr-857/AstraGuard',
  },
  {
    id: 2,
    title: 'PhishGuard AI',
    description: 'Next-Gen AI Phishing Detection System with 98.3% accuracy. Real-time email analysis powered by ML & NLP with FastAPI backend and React dashboard.',
    tech: ['Python', 'FastAPI', 'React', 'ML', 'NLP'],
    status: 'live',
    stars: 1,
    forks: 1,
    image: 'linear-gradient(135deg, hsl(280, 70%, 50%), hsl(320, 70%, 50%))',
    githubUrl: 'https://github.com/sr-857/phishguard-ai',
  },
  {
    id: 3,
    title: 'CyberSentinel',
    description: 'Threat Intel + Log Correlation Dashboard. Ingests threat intelligence, parses SSH/Apache logs, correlates IOCs, and generates real-time alerts.',
    tech: ['Python', 'Flask', 'Docker', 'Chart.js', 'SQLite'],
    status: 'live',
    stars: 1,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(200, 70%, 50%), hsl(220, 70%, 60%))',
    githubUrl: 'https://github.com/sr-857/CyberSentinel',
  },
  {
    id: 4,
    title: 'SpectraGraph',
    description: 'Visual investigation platform that maps threats, uncovers hidden links, and helps analysts investigate faster through an interactive graph workspace.',
    tech: ['TypeScript', 'Python', 'OSINT', 'Recon'],
    status: 'live',
    stars: 0,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(150, 70%, 40%), hsl(180, 70%, 50%))',
    githubUrl: 'https://github.com/sr-857/SpectraGraph',
  },
  {
    id: 5,
    title: 'VulnVision',
    description: 'Web-based passive recon & security posture analyzer. Tech detection, SSL checks, exposure analysis, security-header grading with HTML reports.',
    tech: ['Python', 'FastAPI', 'Tailwind', 'Security'],
    status: 'live',
    stars: 0,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(0, 70%, 45%), hsl(30, 70%, 50%))',
    githubUrl: 'https://github.com/sr-857/vulnvision',
  },
  {
    id: 6,
    title: 'Threat Hunting Playbooks',
    description: 'Enterprise threat hunting platform with automated detection rules and playbook management for security operations.',
    tech: ['Python', 'SIEM', 'Sigma', 'YARA'],
    status: 'live',
    stars: 3,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(40, 70%, 50%), hsl(60, 70%, 45%))',
    githubUrl: 'https://github.com/sr-857/threat-hunting-playbooks',
  },
  {
    id: 7,
    title: 'AutoOps AI',
    description: 'Multi-agent enterprise AI system that turns raw CSV data into explainable insights, strategic recommendations, and executive-ready reports.',
    tech: ['Python', 'AI', 'Multi-Agent', 'Analytics'],
    status: 'live',
    stars: 1,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(186, 100%, 43%), hsl(128, 100%, 50%))',
    githubUrl: 'https://github.com/sr-857/autoops-ai',
  },
  {
    id: 8,
    title: 'BugBounty Toolkit',
    description: 'Comprehensive bug bounty tool collection with automated installation scripts for penetration testing and security research.',
    tech: ['Shell', 'Kali Linux', 'Tools'],
    status: 'live',
    stars: 2,
    forks: 0,
    image: 'linear-gradient(135deg, hsl(300, 70%, 45%), hsl(330, 70%, 50%))',
    githubUrl: 'https://github.com/sr-857/bugbounty-toolkit_V0',
  },
];

const getStatusColor = (status: Project['status']): string => {
  switch (status) {
    case 'live':
      return 'bg-green-500 text-black';
    case 'development':
      return 'bg-amber-500 text-black';
    case 'archived':
      return 'bg-muted text-muted-foreground';
  }
};

// Memoized project card
const ProjectCard = memo(({ project, onClick }: { project: Project; onClick: () => void }) => (
  <article
    className="glass-panel rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all hover:scale-[1.02] group focus-within:ring-2 focus-within:ring-primary"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
    tabIndex={0}
    role="button"
    aria-label={`View details for ${project.title}`}
  >
    {/* Project Image/Gradient */}
    <div 
      className="h-20 relative"
      style={{ background: project.image }}
      aria-hidden="true"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <Eye className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      
      {/* Status Badge */}
      <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(project.status)}`}>
        {project.status.toUpperCase()}
      </span>
    </div>

    {/* Content */}
    <div className="p-2.5">
      <h3 className="font-bold text-foreground text-sm mb-1 truncate">
        {project.title}
      </h3>
      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
        {project.description}
      </p>

      {/* Tech Stack */}
      <ul className="flex flex-wrap gap-1 mb-1.5" role="list" aria-label="Technologies used">
        {project.tech.slice(0, 3).map((tech) => (
          <li key={tech}>
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] border border-primary/20">
              {tech}
            </span>
          </li>
        ))}
        {project.tech.length > 3 && (
          <li className="px-1.5 py-0.5 text-[9px] text-muted-foreground">
            +{project.tech.length - 3}
          </li>
        )}
      </ul>

      {/* Stats */}
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1" aria-label={`${project.stars} stars`}>
          <Star className="w-3 h-3 text-amber-400" aria-hidden="true" />
          <span>{project.stars}</span>
        </span>
        <span className="flex items-center gap-1" aria-label={`${project.forks} forks`}>
          <GitFork className="w-3 h-3" aria-hidden="true" />
          <span>{project.forks}</span>
        </span>
      </div>
    </div>
  </article>
));
ProjectCard.displayName = 'ProjectCard';

// Project detail modal
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  // Handle escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <article 
        className="glass-panel-glow rounded-xl max-w-lg w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="h-28 relative"
          style={{ background: project.image }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
            {project.status.toUpperCase()}
          </span>
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 -mt-6 relative">
          <h2 id="modal-title" className="text-xl font-bold text-foreground mb-2">
            {project.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <ul className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies">
            {project.tech.map((tech) => (
              <li key={tech}>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">
                  {tech}
                </span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Star className="w-4 h-4" aria-hidden="true" />
              <span>{project.stars} stars</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <GitFork className="w-4 h-4" aria-hidden="true" />
              <span>{project.forks} forks</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                View on GitHub
              </a>
            )}
          </div>

          {/* Close hint */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd> or click outside to close
          </p>
        </div>
      </article>
    </div>
  );
});
ProjectModal.displayName = 'ProjectModal';

const ProjectsContent = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section 
      className="h-full overflow-auto p-4 bg-gradient-to-br from-card to-background"
      aria-labelledby="projects-heading"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-3">
        <h2 id="projects-heading" className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="text-primary font-mono" aria-hidden="true">{">"}</span> 
          Security Projects
        </h2>
        <p className="text-xs font-mono text-muted-foreground" aria-live="polite">
          {projects.length} projects loaded
        </p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list" aria-label="Project list">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleOpenProject(project)}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseProject} />
      )}
    </section>
  );
};

export default ProjectsContent;
