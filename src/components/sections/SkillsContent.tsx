import { memo, useMemo } from 'react';
import { Shield, Terminal, Database, Cloud, Bug, Lock, Award } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Security Skills',
    icon: <Shield className="w-5 h-5" />,
    skills: [
      { name: 'Vulnerability Assessment', level: 90, color: 'bg-green-500' },
      { name: 'Penetration Testing', level: 85, color: 'bg-green-500' },
      { name: 'Threat Hunting', level: 88, color: 'bg-green-500' },
      { name: 'Incident Response', level: 82, color: 'bg-green-500' },
    ],
  },
  {
    title: 'Security Tools',
    icon: <Bug className="w-5 h-5" />,
    skills: [
      { name: 'Kali Linux / Metasploit', level: 88, color: 'bg-amber-500' },
      { name: 'Burp Suite / OWASP ZAP', level: 85, color: 'bg-amber-500' },
      { name: 'Wireshark / Nmap', level: 90, color: 'bg-amber-500' },
      { name: 'Splunk / Elastic Stack', level: 78, color: 'bg-amber-500' },
    ],
  },
  {
    title: 'Programming',
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: 'Python', level: 92, color: 'bg-cyan-500' },
      { name: 'JavaScript / React', level: 80, color: 'bg-cyan-500' },
      { name: 'Bash / Shell Scripting', level: 85, color: 'bg-cyan-500' },
      { name: 'SQL', level: 82, color: 'bg-cyan-500' },
    ],
  },
  {
    title: 'Frameworks',
    icon: <Lock className="w-5 h-5" />,
    skills: [
      { name: 'OWASP Top 10', level: 90, color: 'bg-red-500' },
      { name: 'MITRE ATT&CK', level: 85, color: 'bg-red-500' },
      { name: 'NIST Framework', level: 80, color: 'bg-red-500' },
      { name: 'ISO 27001', level: 75, color: 'bg-red-500' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-5 h-5" />,
    skills: [
      { name: 'AWS / Azure', level: 75, color: 'bg-primary' },
      { name: 'Docker', level: 80, color: 'bg-primary' },
      { name: 'CI/CD Pipelines', level: 78, color: 'bg-primary' },
      { name: 'Linux Administration', level: 88, color: 'bg-primary' },
    ],
  },
  {
    title: 'Backend',
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: 'FastAPI / Flask', level: 85, color: 'bg-slate-500' },
      { name: 'PostgreSQL / Redis', level: 80, color: 'bg-slate-500' },
      { name: 'REST APIs', level: 88, color: 'bg-slate-500' },
    ],
  },
];

interface Certification {
  name: string;
  issuer: string;
  highlight?: boolean;
}

const certifications: Certification[] = [
  { name: 'Google Cybersecurity Professional', issuer: 'Google', highlight: true },
  { name: 'Foundations of Cybersecurity', issuer: 'Google' },
  { name: 'Tools of the Trade: Linux and SQL', issuer: 'Google' },
  { name: 'Assets, Threats, and Vulnerabilities', issuer: 'Google' },
  { name: '5-Day AI Agents Intensive Course', issuer: 'Kaggle' },
  { name: 'DLP - Data Loss Prevention', issuer: 'Google Cloud Security' },
  { name: 'CCEP - Certified Cybersecurity Educator', issuer: 'Red Team Leaders', highlight: true },
  { name: 'Windows Kernel Exploitation', issuer: 'Red Team Leaders' },
  { name: 'Offensive Agent AI Course', issuer: 'Red Team Leaders' },
  { name: 'Web Browser for Hacking', issuer: 'Red Team Leaders' },
  { name: 'SQL Injection Attacks', issuer: 'EC-Council' },
  { name: 'In-house Hacking & Pentesting Lab', issuer: 'EC-Council' },
  { name: 'Cisco Introduction to Cybersecurity', issuer: 'Cisco', highlight: true },
  { name: 'Windows Forensic Analysis Bootcamp', issuer: 'CDAC' },
  { name: 'Hashcat Essential Training', issuer: 'LinkedIn' },
  { name: 'AWS Solutions Architecture', issuer: 'AWS' },
  { name: 'Deloitte Cyber Simulation', issuer: 'Deloitte' },
  { name: 'Mastercard Cybersecurity', issuer: 'Mastercard' },
  { name: 'AIG Shields Up', issuer: 'AIG' },
  { name: 'Tata Cybersecurity Analyst', issuer: 'Tata' },
];

// Memoized skill bar component
const SkillBar = memo(({ skill }: { skill: Skill }) => (
  <div role="listitem">
    <div className="flex items-center justify-between mb-0.5">
      <span className="text-xs text-foreground">{skill.name}</span>
      <span className="text-[10px] text-muted-foreground font-mono" aria-hidden="true">
        {skill.level}%
      </span>
    </div>
    
    {/* Progress Bar */}
    <div 
      className="h-1 bg-muted rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={skill.level}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill.name}: ${skill.level}% proficiency`}
    >
      <div 
        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${skill.level}%` }}
      />
    </div>
  </div>
));
SkillBar.displayName = 'SkillBar';

// Memoized skill category component
const SkillCategoryCard = memo(({ category }: { category: SkillCategory }) => (
  <article className="glass-panel rounded-xl p-3">
    {/* Category Header */}
    <header className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
      <span className="text-primary" aria-hidden="true">{category.icon}</span>
      <h3 className="font-bold text-foreground text-sm">{category.title}</h3>
    </header>

    {/* Skills */}
    <div className="space-y-2" role="list" aria-label={`${category.title} skills`}>
      {category.skills.map((skill) => (
        <SkillBar key={skill.name} skill={skill} />
      ))}
    </div>
  </article>
));
SkillCategoryCard.displayName = 'SkillCategoryCard';

// Memoized certification badge
const CertificationBadge = memo(({ cert }: { cert: Certification }) => (
  <li>
    <span 
      className={`inline-block px-2 py-0.5 rounded-full text-[10px] border ${
        cert.highlight 
          ? 'bg-primary/20 text-primary border-primary/30' 
          : 'bg-muted/50 text-muted-foreground border-border'
      }`}
      title={`Issued by ${cert.issuer}`}
    >
      {cert.name}
    </span>
  </li>
));
CertificationBadge.displayName = 'CertificationBadge';

const SkillsContent = () => {
  const certCount = useMemo(() => certifications.length, []);

  return (
    <section 
      className="h-full overflow-auto p-5 bg-gradient-to-br from-card to-background"
      aria-labelledby="skills-heading"
    >
      {/* Header */}
      <header className="mb-4">
        <h2 id="skills-heading" className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="text-primary font-mono" aria-hidden="true">{">"}</span>
          Technical Skills
        </h2>
        <p className="text-xs text-muted-foreground font-mono mt-1" aria-hidden="true">
          $ nmap --scan-skills --verbose
        </p>
      </header>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list" aria-label="Skill categories">
        {skillCategories.map((category) => (
          <SkillCategoryCard key={category.title} category={category} />
        ))}
      </div>

      {/* Certifications */}
      <section className="mt-4 glass-panel rounded-lg p-4" aria-labelledby="certifications-heading">
        <h3 id="certifications-heading" className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
          Certifications ({certCount}+)
        </h3>
        <ul 
          className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto" 
          role="list"
          aria-label="List of certifications"
        >
          {certifications.map((cert) => (
            <CertificationBadge key={cert.name} cert={cert} />
          ))}
        </ul>
        <p className="text-[10px] text-muted-foreground mt-2 font-mono" aria-hidden="true">
          + IIT Madras Shaastra 2026 Participant • SKY HACK 2025 • HP Power Lab 2.0
        </p>
      </section>

      {/* Terminal-style footer */}
      <footer className="mt-3 font-mono text-xs text-muted-foreground" aria-hidden="true">
        <div className="text-primary">$ security-scan --complete</div>
        <div className="text-green-400">✓ {certCount}+ certifications verified</div>
      </footer>
    </section>
  );
};

export default SkillsContent;
