import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';

export function CompetencyRadar({ data = [] }) {
  const chartData = data.map((item) => ({
    subject: item.name,
    Current: item.current,
    Required: item.required,
    fullMark: 100,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const current = payload.find(p => p.dataKey === 'Current')?.value || 0;
      const required = payload.find(p => p.dataKey === 'Required')?.value || 0;
      const gap = Math.max(0, required - current);

      return (
        <div className="bg-stat-bg-elevated border border-stat-border-cyan p-3 rounded-stat-lg shadow-stat-glow-cyan text-xs space-y-1">
          <p className="font-bold text-stat-text-bright">{payload[0]?.payload?.subject}</p>
          <div className="flex items-center gap-4 text-stat-cyan">
            <span>Current Score: <strong>{current}/100</strong></span>
          </div>
          <div className="flex items-center gap-4 text-stat-blue">
            <span>Target Score: <strong>{required}/100</strong></span>
          </div>
          {gap > 0 ? (
            <p className="text-stat-competency-critical font-mono pt-1 border-t border-stat-border-subtle">
              Gap: <strong>-{gap} pts</strong> (Action Required)
            </p>
          ) : (
            <p className="text-stat-competency-strong font-mono pt-1 border-t border-stat-border-subtle">
              ✓ Target Exceeded (+{current - required} pts)
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[320px] lg:h-[380px] relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#CBD5E1', fontSize: 12, fontFamily: 'Inter' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 10 }}
            stroke="rgba(255, 255, 255, 0.05)"
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Current Score"
            dataKey="Current"
            stroke="#06B6D4"
            fill="#06B6D4"
            fillOpacity={0.35}
            strokeWidth={2}
          />
          <Radar
            name="Required Target"
            dataKey="Required"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.15}
            strokeDasharray="4 4"
            strokeWidth={2}
          />
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontFamily: 'Inter' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
