import React from 'react';
import { Card, Badge } from '../common/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Award, BookOpen, AlertTriangle } from 'lucide-react';

export function MetricCard({ title, value, change, icon: Icon, variant = 'cyan', subtitle }) {
  const iconVariants = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    teal: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-4">
      <div className="space-y-1">
        <span className="text-xs text-slate-400 font-sans font-medium">{title}</span>
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            {value}
          </h3>
          {change && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              {change}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      {Icon && (
        <div className={`p-2.5 rounded-lg border shrink-0 ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}

export function GapChart({ data = [] }) {
  const chartData = data.map(d => ({
    name: d.name,
    Gap: d.gap,
    Current: d.current,
    Required: d.required
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="bg-stat-bg-elevated border border-stat-border-cyan p-3 rounded-stat-lg shadow-stat-glow-cyan text-xs space-y-1">
          <p className="font-bold text-stat-text-bright">{p.name}</p>
          <p className="text-stat-cyan">Current: <strong>{p.Current}</strong></p>
          <p className="text-stat-blue">Target: <strong>{p.Required}</strong></p>
          <p className="text-stat-competency-critical font-mono font-bold">Gap: <strong>-{p.Gap} pts</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }} interval={0} angle={-25} textAnchor="end" />
          <YAxis tick={{ fill: '#64748B', fontSize: 10 }} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Gap" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProgressChart({ data = [] }) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#64748B', fontSize: 11 }} domain={[60, 90]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#12182B', borderColor: '#06B6D4', borderRadius: '8px', fontSize: '12px' }}
          />
          <Area type="monotone" dataKey="readiness" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#readinessGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
