import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { ReadinessScore, VisualSkillGapItem } from '../components/competency/CompetencyComponents';
import { CompetencyRadar } from '../components/competency/CompetencyRadar';
import { ProgressChart } from '../components/analytics/AnalyticsComponents';
import { competencies as initialCompetencies } from '../data/competencyData';
import { useUser } from '../context/UserContext';
import {
  Sparkles,
  TrendingDown,
  BookOpen,
  FileCheck2,
  ArrowRight,
  BrainCircuit,
  LineChart,
  CheckCircle2,
  Flame,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { userState } = useUser();

  const userReadiness = userState.overallReadiness || 74;
  const userRole = userState.role || "Statistical Officer / Employee";
  const userLevel = userState.competencyLevel || "Intermediate";
  const diagnosticResult = userState.diagnosticResult;

  // Calculate dynamic competencies based on readiness score
  const dynamicCompetencies = initialCompetencies.map(c => {
    let currentVal = c.current;
    if (userState.diagnosticResult?.scorePercent) {
      const delta = Math.round((userState.diagnosticResult.scorePercent - 70) / 3);
      currentVal = Math.min(95, Math.max(35, c.current + delta));
    }
    const gapVal = Math.max(0, c.required - currentVal);
    return {
      ...c,
      current: currentVal,
      gap: gapVal
    };
  });

  const criticalGaps = dynamicCompetencies.filter(c => c.gap > 0).sort((a, b) => b.gap - a.gap);

  const readinessJourneyData = [
    { month: 'May', readiness: Math.max(40, userReadiness - 10) },
    { month: 'June', readiness: Math.max(45, userReadiness - 7) },
    { month: 'July', readiness: Math.max(50, userReadiness - 4) },
    { month: 'August', readiness: Math.max(55, userReadiness - 2) },
    { month: 'September', readiness: userReadiness },
  ];

  // Dynamic weak area recommendation
  const primaryWeakArea = diagnosticResult?.weakAreas?.[0] || "GIS & Spatial Sampling";

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* 1. WHO AM I & 2. WHERE DO I STAND? (Officer Readiness Hero) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Welcome back, {userState.name}
                </h1>
                <p className="text-xs text-slate-400 font-sans">
                  {userRole} • <span className="text-cyan-400 font-semibold">{userLevel} Level</span> • {userState.department || 'National Accounts Division'}
                </p>
              </div>
            </div>

            {/* LEARNING STREAK BADGE WIDGET */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-md">
                <Flame className="w-4 h-4 fill-amber-400 animate-bounce" />
                <span>🔥 {userState.streak?.currentStreak || 7} Day Learning Streak</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MoSPI Competency Model v2.4</span>
              </div>
            </div>
          </div>

          <ReadinessScore
            score={userReadiness}
            target={userLevel === 'Hard' ? 90 : userLevel === 'Intermediate' ? 82 : 70}
            roleName={userRole}
          />
        </section>

        {/* 3. WHAT DO I KNOW? & 4. WHAT AM I MISSING? */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3. WHAT DO I KNOW? (Competency Intelligence Map) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  <span>Competency Intelligence Map</span>
                </h3>
                <p className="text-xs text-slate-400">Current Proficiency ({userState.name}) vs MoSPI Prerequisite</p>
              </div>
              <Link
                to="/competencies"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                <span>View Framework</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <CompetencyRadar data={dynamicCompetencies} />

            <div className="flex items-center justify-around border-t border-slate-800/80 pt-4 text-xs">
              <span className="text-cyan-400 flex items-center gap-2 font-medium">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                Current Officer Score ({userReadiness}%)
              </span>
              <span className="text-blue-400 flex items-center gap-2 font-medium">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                MoSPI Target Prerequisite
              </span>
            </div>
          </div>

          {/* 4. WHAT AM I MISSING? (Priority Skill Gaps) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                  <span>Priority Skill Gaps</span>
                </h3>
                <p className="text-xs text-slate-400">Deterministic gap analysis from diagnostic assessment</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-semibold border border-rose-500/20">
                {criticalGaps.length} Critical
              </span>
            </div>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {criticalGaps.map((item) => (
                <VisualSkillGapItem key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link
                to="/skill-gaps"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                <span>Open Skill Gap Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. WHAT SHOULD I LEARN NEXT? (PERSONALIZED RECOMMENDATION) */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-cyan-950/20 border border-cyan-500/30 space-y-5 shadow-lg shadow-cyan-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">Recommended Next Action for {userState.name.split(' ')[0]}</h3>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                96% Personalized AI Match
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Estimated effort: <strong className="text-white">6 hours</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-3 flex-wrap text-xs">
                <span className="px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-400 text-xs font-semibold border border-teal-500/20">
                  Domain: {primaryWeakArea}
                </span>
                <span className="text-slate-400 font-medium">
                  Current level: <strong className="text-white font-bold">{userLevel}</strong> &nbsp;•&nbsp; Required competency: <strong className="text-cyan-400 font-bold">80+</strong>
                </span>
              </div>

              <h4 className="text-lg font-bold text-white leading-snug">
                Advanced Statistical {primaryWeakArea} Capacity Building
              </h4>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="text-cyan-400 font-bold shrink-0">Reason:</span>
                <span className="leading-relaxed">
                  "Identified as high-priority skill gap during your initial diagnostic assessment for {userRole}."
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center gap-3">
              <div className="text-xs text-slate-400 text-right hidden md:block">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Target Benchmark</span>
                <span className="text-slate-300 font-medium">Target Score: 82/100</span>
              </div>
              <Link
                to="/learning-path"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all"
              >
                <span>Start Personal Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. READINESS JOURNEY PROGRESS */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-cyan-400" />
                <span>Your Readiness Journey</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Competency readiness score updated dynamically from active diagnostic and learning evaluations.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400">Current Index: </span>
                <strong className="text-cyan-400 font-bold text-sm">{userReadiness}%</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Diagnostic Verified</span>
              </div>
            </div>
          </div>

          <ProgressChart data={readinessJourneyData} />
        </section>

        {/* 7. QUICK NEXT ACTIONS */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next actions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/my-learning"
              className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>My Progress & Streak</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/assessments"
              className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <span>Take Pending Assessments</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/ai-assessment"
              className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>AI Assessment Studio</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
