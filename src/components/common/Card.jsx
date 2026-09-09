import React from 'react';

export function Card({ children, className = '', hover = true, glow = false }) {
  return (
    <div
      className={`rounded-stat-xl bg-stat-bg-card border border-stat-border-subtle p-5 shadow-stat-card ${
        hover ? 'stat-glass-card-hover' : ''
      } ${glow ? 'border-stat-cyan/40 shadow-stat-glow-cyan/30' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'cyan', className = '' }) {
  const variants = {
    cyan: 'bg-stat-cyan/15 text-stat-cyan border-stat-cyan/30',
    blue: 'bg-stat-blue/15 text-stat-blue border-stat-blue/30',
    teal: 'bg-stat-teal/15 text-stat-teal border-stat-teal/30',
    strong: 'bg-stat-competency-strong/15 text-stat-competency-strong border-stat-competency-strong/30',
    moderate: 'bg-stat-competency-moderate/15 text-stat-competency-moderate border-stat-competency-moderate/30',
    critical: 'bg-stat-competency-critical/15 text-stat-competency-critical border-stat-competency-critical/30',
    muted: 'bg-stat-bg-secondary text-stat-text-muted border-stat-border-subtle',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const statusMap = {
    Proficient: { variant: 'strong', dot: 'bg-stat-competency-strong' },
    Developing: { variant: 'moderate', dot: 'bg-stat-competency-moderate' },
    'Needs Action': { variant: 'moderate', dot: 'bg-stat-competency-moderate' },
    'Critical Gap': { variant: 'critical', dot: 'bg-stat-competency-critical animate-pulse' },
    Optimal: { variant: 'strong', dot: 'bg-stat-competency-strong' },
    Completed: { variant: 'strong', dot: 'bg-stat-status-success' },
    'In Progress': { variant: 'cyan', dot: 'bg-stat-cyan' },
    Available: { variant: 'blue', dot: 'bg-stat-blue' },
  };

  const current = statusMap[status] || { variant: 'muted', dot: 'bg-stat-text-muted' };

  return (
    <Badge variant={current.variant} className={className}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} mr-1.5`} />
      {status}
    </Badge>
  );
}

export function ProgressBar({ value = 0, max = 100, variant = 'cyan', size = 'md', className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    cyan: 'bg-gradient-to-r from-stat-cyan to-stat-blue shadow-stat-glow-cyan',
    teal: 'bg-gradient-to-r from-stat-teal to-stat-cyan',
    strong: 'bg-stat-competency-strong',
    moderate: 'bg-stat-competency-moderate',
    critical: 'bg-stat-competency-critical',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full bg-stat-bg-secondary rounded-full overflow-hidden border border-stat-border-subtle p-0.5 ${className}`}>
      <div
        className={`rounded-full transition-all duration-500 ${sizes[size]} ${variants[variant]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function ProgressRing({ score = 0, size = 120, strokeWidth = 10, label = 'Score' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return '#10B981';
    if (s >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-extrabold font-mono text-stat-text-bright">
          {score}
        </span>
        <span className="text-[10px] uppercase font-mono text-stat-text-muted tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
