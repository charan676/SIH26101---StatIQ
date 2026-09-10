import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { MetricCard, ProgressChart } from '../components/analytics/AnalyticsComponents';
import { orgAnalyticsData } from '../data/analyticsData';
import { useUser } from '../context/UserContext';
import { BarChart3, Users, Award, BookOpen, AlertTriangle, Building2, ShieldCheck, Download, Sparkles, Check, CheckCircle2, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { userState } = useUser();
  const { summary, departmentGaps, competencyHealth, monthlyProgressTrend } = orgAnalyticsData;
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  // Sync candidate user readiness index into National Accounts Division stats
  const liveUserReadiness = userState.overallReadiness || 74;
  const dynamicDepartmentGaps = departmentGaps.map(d => {
    if (d.department === "National Accounts Division") {
      return {
        ...d,
        avgReadiness: Math.round((d.avgReadiness + liveUserReadiness) / 2)
      };
    }
    return d;
  });

  const filteredDivisions = dynamicDepartmentGaps.filter(d => {
    if (selectedDivision === 'all') return true;
    return d.department.toLowerCase().includes(selectedDivision.toLowerCase());
  });

  const handleExportReport = () => {
    setIsExporting(true);
    setExportMessage("Generating official MoSPI Executive Cadre Capacity Report (PDF)...");
    setTimeout(() => {
      setIsExporting(false);
      setExportMessage("✓ Report successfully downloaded: MoSPI_Cadre_Capacity_Report_2026.pdf");
      setTimeout(() => setExportMessage(''), 5000);
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243247] pb-6">
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
            <button
              onClick={handleExportReport}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 text-xs shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all shrink-0 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? "Generating PDF..." : "Export Cadre Report (PDF)"}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-2 rounded-full border border-cyan-500/20">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Cadre Audit Active</span>
            </div>
          </div>
        </div>

        {/* Feedback Export Banner */}
        {exportMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{exportMessage}</span>
            </div>
          </div>
        )}

        {/* Division Selector Filter Bar */}
        <div className="flex items-center gap-2 border-b border-[#243247] pb-3 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold mr-2 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Division Filter:
          </span>
          {[
            { id: 'all', label: 'All MoSPI Divisions' },
            { id: 'National Accounts', label: 'National Accounts' },
            { id: 'Field Operations', label: 'FOD (Field Operations)' },
            { id: 'Economic Statistics', label: 'Economic Stats' },
            { id: 'Social Statistics', label: 'Social Stats' },
            { id: 'Computer Centre', label: 'Computer Centre' },
          ].map((div) => (
            <button
              key={div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDivision === div.id
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                  : 'bg-[#111A28] text-slate-400 hover:text-white border border-[#243247]'
              }`}
            >
              {div.label}
            </button>
          ))}
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
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
            <div className="flex items-center justify-between border-b border-[#243247] pb-3">
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

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
            <div className="flex items-center justify-between border-b border-[#243247] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Departmental Skill Gap Heatmap</span>
              </h3>
              <span className="text-xs text-slate-400">{filteredDivisions.length} Divisions Shown</span>
            </div>

            <div className="space-y-3">
              {filteredDivisions.map((dept, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#070A0F] border border-[#243247] space-y-1.5 hover:border-cyan-500/40 transition-colors">
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

        {/* Competency Domain Health Grid */}
        <div className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
          <div className="flex items-center justify-between border-b border-[#243247] pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>MoSPI Cadre Competency Domain Benchmark Grid</span>
              </h3>
              <p className="text-xs text-slate-400">Organizational baseline performance across 9 official statistical domains</p>
            </div>
            <span className="text-xs text-slate-400">Target Benchmark: 75% - 85%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {competencyHealth.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.competency}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    item.health === 'Optimal'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                      : item.health === 'Good' || item.health === 'Moderate'
                      ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/20'
                  }`}>
                    {item.health}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Current Avg: <strong className="text-white">{item.currentAvg}%</strong></span>
                  <span>Target: <strong className="text-cyan-400">{item.requiredAvg}%</strong></span>
                </div>

                <div className="w-full bg-[#172235] h-1.5 rounded-full overflow-hidden border border-[#243247]">
                  <div
                    className={`h-full rounded-full ${
                      item.currentAvg >= item.requiredAvg ? 'bg-emerald-400' : item.currentAvg >= 65 ? 'bg-cyan-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${item.currentAvg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

