import { memo } from 'react';
import { User, MapPin, Briefcase, GraduationCap, Award, Shield } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  color: string;
}

const stats: StatItem[] = [
  { label: 'Certifications', value: '15+', color: 'text-green-400' },
  { label: 'Projects', value: '5+', color: 'text-cyan-400' },
  { label: 'Internships', value: '3', color: 'text-primary' },
];

// Memoized stat card
const StatCard = memo(({ stat }: { stat: StatItem }) => (
  <div className="glass-panel rounded-lg p-4 text-center" role="listitem">
    <div className={`text-2xl font-bold ${stat.color} font-mono`} aria-label={`${stat.value} ${stat.label}`}>
      {stat.value}
    </div>
    <div className="text-sm text-muted-foreground">{stat.label}</div>
  </div>
));
StatCard.displayName = 'StatCard';

const AboutContent = () => {
  return (
    <article 
      className="h-full overflow-auto p-6 bg-gradient-to-br from-card to-background"
      aria-labelledby="about-heading"
    >
      {/* Glass Header */}
      <header className="glass-panel-glow rounded-xl p-6 mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div 
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-cyan-400 to-green-400 p-1 flex-shrink-0"
            role="img"
            aria-label="Profile avatar"
          >
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <Shield className="w-12 h-12 text-primary" aria-hidden="true" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 id="about-heading" className="text-3xl font-bold text-foreground mb-1">
              <span className="text-cyan-400">Subhajit Roy</span>
            </h1>
            <p className="text-primary font-mono text-sm mb-3">
              Cybersecurity Professional & Security Engineer
            </p>
            
            <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground" role="list" aria-label="Key information">
              <li className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Assam, India</span>
              </li>
              <li className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Security Intern</span>
              </li>
              <li className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>SIH 2024 Runner-Up</span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Bio Section */}
      <section className="glass-panel rounded-xl p-5 mb-6" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="text-primary" aria-hidden="true">{">"}</span> Professional Summary
        </h2>
        <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
          <p>
            Cybersecurity professional with hands-on experience in vulnerability assessment, threat analysis, 
            and security engineering. Proven track record through national hackathon achievement 
            (Smart India Hackathon Runner-Up) and multiple cybersecurity internships.
          </p>
          <p>
            Skilled in building security tools, conducting penetration testing, and implementing defense strategies. 
            Strong foundation in Python, security frameworks, and cloud technologies with Google Cybersecurity 
            Professional Certificate and 15+ industry certifications.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section aria-labelledby="stats-heading" className="mb-6">
        <h2 id="stats-heading" className="sr-only">Statistics</h2>
        <ul className="grid grid-cols-3 gap-4" role="list">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </ul>
      </section>

      {/* Education & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="glass-panel rounded-xl p-5" aria-labelledby="education-heading">
          <h3 id="education-heading" className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" aria-hidden="true" />
            Education
          </h3>
          <ul className="space-y-3 text-sm" role="list">
            <li>
              <p className="text-foreground font-medium">B.Sc. Computer Science</p>
              <p className="text-muted-foreground">Assam Central University</p>
              <time className="text-xs text-primary font-mono">Aug 2025 – Present</time>
            </li>
            <li>
              <p className="text-foreground font-medium">High School Diploma, Science</p>
              <p className="text-muted-foreground">Ramanuj Gupta Sr. Secondary</p>
              <time className="text-xs text-primary font-mono">Apr 2023 – Mar 2025</time>
            </li>
          </ul>
        </section>

        <section className="glass-panel rounded-xl p-5" aria-labelledby="achievements-heading">
          <h3 id="achievements-heading" className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
            Achievements
          </h3>
          <ul className="space-y-2 text-sm" role="list">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5" aria-hidden="true">●</span>
              <span className="text-muted-foreground">Smart India Hackathon 2024 - National Runner-Up</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5" aria-hidden="true">●</span>
              <span className="text-muted-foreground">SKY HACK 2025 Participant</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5" aria-hidden="true">●</span>
              <span className="text-muted-foreground">Student Coordinator, Edge3 - 300+ students</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Terminal-style footer */}
      <footer className="mt-6 font-mono text-xs text-muted-foreground" aria-hidden="true">
        <span className="text-primary">$</span> cat /about/status.txt<br />
        <span className="text-green-400">→</span> Currently pursuing B.Sc. & actively learning cybersecurity
      </footer>
    </article>
  );
};

export default AboutContent;
