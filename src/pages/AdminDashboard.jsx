import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { MetricCard, ProgressChart } from '../components/analytics/AnalyticsComponents';
import { orgAnalyticsData } from '../data/analyticsData';
import { BarChart3, Users, Award, BookOpen, AlertTriangle, Building2, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const { summary, departmentGaps, competencyHealth, monthlyProgressTrend } = orgAnalyticsData;

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <span>MoSPI Organization Intelligence Dashboard</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Cadre-wide competency health analytics, Ministry training throughput & critical skill gap heatmaps
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Cadre Report (PDF)</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Cadre Audit Active</span>
            </div>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Officials Tracked"
            value={summary.totalOfficials.toLocaleString()}
            change={summary.readinessChangeMonth}
            icon={Users}
            variant="cyan"
            subtitle="Indian Statistical Service & Subordinate Staff"
          />
          <MetricCard
            title="Cadre Readiness Index"
            value={`${summary.overallCadreReadiness}%`}
            icon={Award}
            variant="blue"
            subtitle="Target Cadre Index: 82.0%"
          />
          <MetricCard
            title="iGOT Course Completions"
            value={summary.totalCoursesCompleted.toLocaleString()}
            icon={BookOpen}
            variant="teal"
            subtitle="34,290 verified modules"
          />
          <MetricCard
            title="Top Ministry Gap"
            value="AI & Spatial GIS"
            icon={AlertTriangle}
            variant="critical"
            subtitle="High priority remediation domain"
          />
        </div>

        {/* Progress Trend Chart & Department Gap Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Cadre Competency Readiness Trend (2026)</span>
              </h3>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                +1.8% / Month Growth
              </span>
            </div>
            <ProgressChart data={monthlyProgressTrend} />
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Departmental Skill Gap Heatmap</span>
              </h3>
              <span className="text-xs text-slate-400">5 Divisions</span>
            </div>

            <div className="space-y-3">
              {departmentGaps.map((dept, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {dept.department}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      dept.criticalGaps > 20
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/20'
                        : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20'
                    }`}>
                      {dept.criticalGaps} Critical Gaps
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{dept.totalOfficers} Officers</span>
                    <span>Readiness: <strong className="text-cyan-400 font-bold">{dept.avgReadiness}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

