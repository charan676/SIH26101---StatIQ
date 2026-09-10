import React from 'react';
import { Card, Badge, StatusBadge, ProgressRing } from '../common/Card';
import { ShieldCheck, ArrowRight, TrendingDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CompetencyScore({ score, maxScore = 100, label = "Current Level" }) {
  return (
    <div className="flex flex-col items-baseline">
      <span className="text-3xl font-extrabold text-white tracking-tight">
        {score}
        <span className="text-xs font-normal text-slate-400">/{maxScore}</span>
      </span>
      <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function SkillGapIndicator({ gap, priority }) {
  if (gap <= 0) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>No Gap</span>
      </div>
    );
  }

  const badgeStyles = {
    Critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    High: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Moderate: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${badgeStyles[priority] || badgeStyles.Moderate}`}>
      <TrendingDown className="w-3.5 h-3.5" />
      <span>Gap: -{gap} pts ({priority})</span>
    </div>
  );
}

export function CurrentVsRequired({ current, required, showGap = true }) {
  const gap = Math.max(0, required - current);
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Current: <strong className="text-cyan-400 font-semibold">{current}</strong></span>
        <span>Target: <strong className="text-blue-400 font-semibold">{required}</strong></span>
      </div>
      <div className="relative w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{ width: `${Math.min(100, current)}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-10"
          style={{ left: `${Math.min(99, required)}%` }}
        />
      </div>
      {showGap && gap > 0 && (
        <div className="flex justify-end text-xs text-rose-400 font-medium">
          <span>Gap: -{gap} points</span>
        </div>
      )}
    </div>
  );
}

export function CompetencyCard({ competency, onSelect }) {
  return (
    <div className="p-5 rounded-xl bg-[#111A28] border border-[#243247] space-y-4 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-white">{competency.name}</h4>
          <span className="text-xs text-slate-400">{competency.domain}</span>
        </div>
        <StatusBadge status={competency.status} />
      </div>

      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{competency.description}</p>

      <CurrentVsRequired current={competency.current} required={competency.required} />

      <div className="pt-3 border-t border-[#243247] flex items-center justify-between">
        <SkillGapIndicator gap={competency.gap} priority={competency.priority} />
        {onSelect && (
          <button
            onClick={() => onSelect(competency)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function ReadinessScore({ score = 74, target = 82, roleName = "Senior Statistical Officer" }) {
  const gap = (target - score).toFixed(1);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#111A28] via-[#111A28]/90 to-cyan-950/30 border border-cyan-500/40 p-6 md:p-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Official MoSPI Cadre Alignment</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Role Readiness: <span className="text-cyan-400">{roleName}</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Your overall competency profile is evaluated deterministically against Ministry of Statistics position prerequisites.
            </p>
          </div>
        </div>

        {/* Readiness gauge and summary indicators */}
        <div className="flex items-center gap-8 shrink-0 bg-[#070A0F]/80 border border-[#243247] p-4 rounded-xl shadow-inner">
          <ProgressRing score={score} size={100} strokeWidth={8} label="Readiness" />
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-xs font-medium">Current Index</span>
              <span className="text-cyan-400 font-bold text-base">{score}%</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-xs font-medium">Required Target</span>
              <span className="text-blue-400 font-bold text-base">{target}%</span>
            </div>
            <div className="pt-2 border-t border-[#243247] flex items-center justify-between gap-4">
              <span className="text-slate-400 text-xs font-medium">Gap Index</span>
              <span className="text-rose-400 font-bold text-xs bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                -{gap}% Gap
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VisualSkillGapItem({ item }) {
  const current = item.current || 0;
  const required = item.required || 0;
  const gap = item.gap || (required - current);
  const priority = item.priority || 'Moderate';

  const badgeColors = {
    Critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    High: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Moderate: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="p-4 rounded-xl bg-[#111A28] border border-[#243247] space-y-3 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.12)] transition-all">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="text-base font-semibold text-white">{item.name}</h4>
          <span className="text-xs text-slate-400">{item.domain || 'MoSPI Statistical Domain'}</span>
        </div>
        <div className="text-right">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColors[priority] || badgeColors.Moderate}`}>
            -{gap} pts ({priority})
          </span>
        </div>
      </div>

      {/* Range comparison visual bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Current: <strong className="text-cyan-400 font-semibold">{current}</strong></span>
          <span>Required Target: <strong className="text-blue-400 font-semibold">{required}</strong></span>
        </div>

        <div className="relative w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            style={{ width: `${Math.min(100, current)}%` }}
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-sm"
            style={{ left: `${Math.min(99, required)}%` }}
            title={`Target: ${required}`}
          />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-400 line-clamp-1">
          {item.description || 'Target gap in official statistical domain requires iGOT module.'}
        </p>
        <Link
          to="/learning-path"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 shrink-0"
        >
          <span>Bridge Gap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
