import React, { useEffect, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { ReadinessScore, VisualSkillGapItem } from '../components/competency/CompetencyComponents';
import { CompetencyRadar } from '../components/competency/CompetencyRadar';
import { ProgressChart } from '../components/analytics/AnalyticsComponents';
import { useUser } from '../context/UserContext';
import { getDashboardData, getProfileData } from '../utils/api';
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
  Award,
  ExternalLink,
  Clock,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { userState } = useUser();
  const [latestResults, setLatestResults] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [liveProfile, setLiveProfile] = useState(null);

  useEffect(() => {
    let active = true;
    const userId = userState.id || 1;

    Promise.all([
      getDashboardData(userId).catch(err => { console.warn("Dashboard fetch error:", err); return null; }),
      getProfileData(userId).catch(err => { console.warn("Profile fetch error:", err); return null; })
    ]).then(([dashData, profData]) => {
      if (!active) return;
      if (dashData) {
        setLatestResults(dashData.latest_results || []);
        setCompetencies(dashData.competencies || []);
      }
      if (profData) {
        setLiveProfile(profData);
      }
    });

    return () => { active = false; };
  }, [userState.id]);

  const userReadiness = liveProfile?.overall_readiness || userState.overallReadiness || 74;
  const userName = liveProfile?.display_name || userState.name;
  const userRole = liveProfile?.designation || userState.role || "Senior Statistical Officer (SSO)";
  const userLevel = userState.competencyLevel || "Intermediate";
  const userDept = liveProfile?.department || userState.department || 'NSSO Field Operations Division';
  const diagnosticResult = userState.diagnosticResult;

  const dynamicCompetencies = (liveProfile?.competency_profile && liveProfile.competency_profile.length > 0)
    ? liveProfile.competency_profile
    : userState.competencyProfile
    ? userState.competencyProfile.map((comp) => ({
        id: comp.id,
        name: comp.name,
        domain: comp.domain,
        current: comp.current,
        required: comp.required,
        gap: comp.gap,
        priority: comp.priority,
      }))
    : competencies.map((competency) => ({
        id: competency.code,
        name: competency.name,
        domain: competency.code,
        current: competency.current_level,
        required: competency.required_level,
        gap: competency.remaining_gap,
      }));

  const criticalGaps = dynamicCompetencies.filter(c => c.gap > 0).sort((a, b) => b.gap - a.gap);
  const igotRecs = liveProfile?.igot_recommendations || userState.igotRecommendations || [];

  const readinessJourneyData = [
    ...(diagnosticResult ? [{ month: 'Diagnostic', readiness: diagnosticResult.scorePercent }] : []),
    ...latestResults.map((result) => ({
      month: result.quiz_title || `Quiz ${result.quiz_id}`,
      readiness: result.score_percent,
    }))
  ];

  const topIgotCourse = igotRecs[0];

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Welcome back, {userName}
                </h1>
                <p className="text-xs text-slate-400 font-sans">
                  {userRole} • <span className="text-cyan-400 font-semibold">{userLevel} Level</span> • {userDept}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-md">
                <Flame className="w-4 h-4 fill-amber-400 animate-bounce" />
                <span>🔥 {userState.streak?.currentStreak || 3} Day Learning Streak</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-cyan-400 font-sans bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>iGOT Karmayogi Connected</span>
              </div>
            </div>
          </div>

          <ReadinessScore
            score={userReadiness}
            target={userLevel === 'Hard' ? 90 : userLevel === 'Intermediate' ? 82 : 70}
            roleName={userRole}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-6 shadow-[0_10px_30px_rgba(7,10,15,0.6)]">
            <div className="flex items-center justify-between border-b border-[#243247] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  <span>Competency Intelligence Map</span>
                </h3>
                <p className="text-xs text-slate-400">Current Proficiency ({userName}) vs Prerequisite Requirements</p>
              </div>
              <Link
                to="/competencies"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
              >
                <span>View Framework</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <CompetencyRadar data={dynamicCompetencies} />

            <div className="flex items-center justify-around border-t border-[#243247] pt-4 text-xs">
              <span className="text-cyan-400 flex items-center gap-2 font-semibold">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                Current Officer Score ({userReadiness}%)
              </span>
              <span className="text-blue-400 flex items-center gap-2 font-semibold">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                MoSPI Target Prerequisite
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-6 shadow-[0_10px_30px_rgba(7,10,15,0.6)]">
            <div className="flex items-center justify-between border-b border-[#243247] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                  <span>Priority Skill Gap Matrix</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans">Dynamic gap analysis calculated from database scores</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-bold border border-rose-500/30">
                {criticalGaps.length} Gaps Found
              </span>
            </div>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {criticalGaps.map((item) => (
                <VisualSkillGapItem key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-2 border-t border-[#243247]">
              <Link
                to="/skill-gaps"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172235] hover:bg-[#1C2B42] text-xs font-bold text-white transition-colors border border-[#243247]"
              >
                <span>Open Skill Gap Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* iGOT KARMAYOGI RECOMMENDATION ROUTER CARD */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-[#111A28] via-[#111A28]/90 to-cyan-950/20 border border-cyan-500/40 space-y-5 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#243247] pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                iGOT Karmayogi Recommendation Router
              </h3>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Official Capacity Building Pathway
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Target Cadre: <strong className="text-white">{userRole}</strong>
            </span>
          </div>

          {topIgotCourse ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-400 text-xs font-bold border border-teal-500/30">
                    Domain: {topIgotCourse.competency}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                    Code: {topIgotCourse.code}
                  </span>
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Est. Effort: <strong className="text-white font-bold">{topIgotCourse.estimated_hours} Hours</strong>
                  </span>
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    Target Mastery: <strong className="text-emerald-400 font-bold">{topIgotCourse.target_goal_percent}%</strong>
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white leading-snug">
                  {topIgotCourse.title}
                </h4>
                <p className="text-xs text-slate-400">
                  Provider: <strong className="text-cyan-400">{topIgotCourse.provider}</strong>
                </p>

                <div className="p-3.5 rounded-xl bg-[#070A0F]/80 border border-[#243247] text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold shrink-0">Rationale:</span>
                  <span className="leading-relaxed">
                    "{topIgotCourse.recommendation_rationale}"
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center gap-3">
                <a
                  href={topIgotCourse.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:scale-[1.02] transition-all"
                >
                  <span>Launch iGOT Karmayogi Course</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="text-xs text-emerald-400 font-semibold p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              ✓ Prerequisites fully met across all statistical framework domains!
            </div>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 shadow-[0_10px_30px_rgba(7,10,15,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#243247] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-cyan-400" />
                <span>Your Readiness Journey</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic scores synced live from backend API endpoints
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-[#070A0F] border border-[#243247] text-xs">
                <span className="text-slate-400">Current Index: </span>
                <strong className="text-cyan-400 font-bold text-sm">{userReadiness}%</strong>
              </div>
            </div>
          </div>

          <ProgressChart data={readinessJourneyData} />
        </section>
      </div>
    </PageContainer>
  );
}
