import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { GapChart } from '../components/analytics/AnalyticsComponents';
import { VisualSkillGapItem } from '../components/competency/CompetencyComponents';
import { competencies, overallReadinessScore } from '../data/competencyData';
import { TrendingDown, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Filter, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkillGaps() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Competencies', count: competencies.length },
    { id: 'Critical', label: 'Critical Gaps', count: competencies.filter(c => c.priority === 'Critical').length },
    { id: 'High', label: 'High Priority', count: competencies.filter(c => c.priority === 'High').length },
    { id: 'Moderate', label: 'Moderate Gaps', count: competencies.filter(c => c.priority === 'Moderate').length },
    { id: 'Strong', label: 'Met Target / Strong', count: competencies.filter(c => c.priority === 'Strong').length },
  ];

  const filteredGaps = competencies.filter(c => {
    if (activeFilter === 'all') return true;
    return c.priority === activeFilter;
  }).sort((a, b) => b.gap - a.gap);

  const gapsOnlyList = competencies.filter(c => c.gap > 0).sort((a, b) => b.gap - a.gap);

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <TrendingDown className="w-6 h-6 text-rose-400" />
              <span>Deterministic Skill Gap Analysis Engine</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Mathematically computed difference between official current proficiency and position target prerequisites: <strong className="text-cyan-400 font-mono">gap = max(0, required - current)</strong>
            </p>
          </div>

          <Link
            to="/learning-path"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-semibold text-white shadow-md transition-all hover:scale-[1.02] shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Learning Path</span>
          </Link>
        </div>

        {/* Priority Summary Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-sans">Cadre Readiness</span>
              <p className="text-xl font-bold text-white mt-0.5">{overallReadinessScore.score}%</p>
            </div>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-semibold">
              Target: {overallReadinessScore.targetScore}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-sans">Critical Priority Gaps</span>
              <p className="text-xl font-bold text-rose-400 mt-0.5">{overallReadinessScore.criticalCount}</p>
            </div>
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-sans">High & Moderate Gaps</span>
              <p className="text-xl font-bold text-amber-400 mt-0.5">
                {overallReadinessScore.highCount + overallReadinessScore.moderateCount}
              </p>
            </div>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-sans">Strong / Met Target</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">{overallReadinessScore.strongCount}</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Competency Gap Magnitude Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Competency Gap Magnitude (Points Below Target)</h3>
              <p className="text-xs text-slate-400">Deterministic gap points across official statistical domains</p>
            </div>
            <span className="text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 font-semibold">
              Max Gap: -33 pts (AI/ML)
            </span>
          </div>

          <GapChart data={gapsOnlyList} />
        </div>

        {/* Skill Gap Filter Tabs & Breakdown */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">Prioritized Remediation Action Breakdown</h3>

            <div className="flex items-center gap-1.5 flex-wrap">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Visual Range Comparison Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGaps.map((item) => (
              <VisualSkillGapItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
