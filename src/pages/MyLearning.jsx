import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { CourseDetailModal } from '../components/learning/LearningComponents';
import { courses as initialCourses } from '../data/courseData';
import { useUser } from '../context/UserContext';
import {
  GraduationCap,
  PlayCircle,
  CheckCircle2,
  Clock,
  Award,
  FileCheck2,
  ArrowRight,
  Flame,
  LineChart,
  Calendar,
  Sparkles,
  TrendingUp,
  Activity,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyLearning() {
  const { userState } = useUser();
  const [activeTab, setActiveTab] = useState('progress');
  const [coursesList, setCoursesList] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const activeCourses = coursesList.filter(c => c.enrolled && c.progress < 100);
  const completedCourses = coursesList.filter(c => c.progress === 100);

  const streak = userState.streak || {
    currentStreak: 7,
    bestStreak: 14,
    weeklyActivity: [true, true, true, true, true, false, true]
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleToggleEnroll = (courseId) => {
    setCoursesList(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: false, progress: 0 };
      }
      return c;
    }));
  };

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <span>My Learning & Progress Analytics</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track learning streak consistency, course progression, diagnostic evaluations, and verified competency credits
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors shrink-0 shadow-md"
          >
            <span>Browse More iGOT Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 flex-wrap">
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Progress & Learning Streak</span>
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'active'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Enrolled Modules ({activeCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Completed & Certified ({completedCourses.length})
          </button>
        </div>

        {/* 1. DEDICATED PROGRESS & LEARNING STREAK TAB */}
        {activeTab === 'progress' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* LEARNING STREAK BANNER */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30">
                    <Flame className="w-4 h-4 fill-amber-400 animate-bounce" />
                    <span>Official Cadre Consistency Streak</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    🔥 {streak.currentStreak} Day Learning Streak
                  </h2>
                  <p className="text-xs text-slate-300">
                    Keep learning consistently to maintain your streak. Daily module progression or assessment completion counts toward your continuous cadre record.
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[110px]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Streak</span>
                    <span className="text-2xl font-black text-amber-400">{streak.currentStreak} Days</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[110px]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Streak</span>
                    <span className="text-2xl font-black text-cyan-400">{streak.bestStreak} Days</span>
                  </div>
                </div>
              </div>

              {/* Weekly Activity Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-sans">
                  <span>Weekly Learning Activity (Mon - Sun)</span>
                  <span className="text-emerald-400 font-semibold">5 / 7 Days Active This Week</span>
                </div>
                <div className="grid grid-cols-7 gap-2.5">
                  {daysOfWeek.map((day, idx) => {
                    const isActive = streak.weeklyActivity[idx];
                    return (
                      <div
                        key={day}
                        className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                          isActive
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">{day}</span>
                        <div className="w-6 h-6 rounded-full mx-auto flex items-center justify-center bg-slate-900 border border-slate-800">
                          {isActive ? (
                            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* OVERALL LEARNING METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">Overall Learning Progress</span>
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-white">{userState.learningStats?.overallProgress || 68}%</p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${userState.learningStats?.overallProgress || 68}%` }} />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">Courses Completed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-emerald-400">{userState.learningStats?.coursesCompleted || 4}</p>
                <span className="text-[11px] text-slate-400">Out of {initialCourses.length} Enrolled Modules</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">Assessments Completed</span>
                  <FileCheck2 className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-blue-400">{userState.learningStats?.assessmentsCompleted || 5}</p>
                <span className="text-[11px] text-slate-400">Avg Score: <strong className="text-white">{userState.learningStats?.avgAssessmentScore || 82}%</strong></span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">Time Spent Learning</span>
                  <Clock className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-teal-400">{userState.learningStats?.timeSpentHours || 34.5} hrs</p>
                <span className="text-[11px] text-slate-400">Verified iGOT Time Credits</span>
              </div>
            </div>

            {/* RECENT ACTIVITY LOG */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Recent Learning & Assessment Activity</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">StatIQ Initial Diagnostic Evaluation</span>
                      <span className="text-slate-400">Score: {userState.diagnosticResult?.scorePercent || 74}% • Cadre Baseline Established</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold shrink-0">+1 Day Streak</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Advanced Econometric Data Processing in Python</span>
                      <span className="text-slate-400">Completed Module 4 • Pandas Vectorization</span>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-bold shrink-0">+2.5 hrs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ACTIVE ENROLLED COURSES TAB */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-cyan-400 font-semibold">{course.provider} • {course.code}</span>
                      <h4 className="text-lg font-bold text-white leading-snug">{course.title}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-semibold border border-cyan-500/20 shrink-0">
                      Target: {course.competency}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Module Completion Progress</span>
                      <span className="font-bold text-cyan-400">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-sm hover:scale-[1.02] transition-all"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. COMPLETED COURSES TAB */}
        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <div key={course.id} className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/30 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-emerald-400 font-semibold">{course.provider} • {course.code}</span>
                    <h4 className="text-lg font-bold text-white leading-snug">{course.title}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/20 shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Completed</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Verified Competency Gain:</span>
                  <span className="text-emerald-400 font-bold">+12 pts in {course.competency}</span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-400" />
                    MoSPI iGOT Verified Certificate
                  </span>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onToggleEnroll={handleToggleEnroll}
        />
      )}
    </PageContainer>
  );
}
