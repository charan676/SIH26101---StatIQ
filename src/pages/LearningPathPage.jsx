import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { LearningPathStep, CourseDetailModal } from '../components/learning/LearningComponents';
import { learningPathSteps, courses } from '../data/courseData';
import { Route as RouteIcon, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, BookOpen, FileCheck2, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningPathPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const topCourse = courses[0];

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <RouteIcon className="w-6 h-6 text-cyan-400" />
              <span>iGOT Personalized Capacity-Building Pathway</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated sequential training path optimized to close top priority statistical gaps for your cadre target
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors shrink-0"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Explore All iGOT Courses</span>
          </Link>
        </div>

        {/* Target Position Alignment Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-semibold">Active Capacity Target</span>
                <h3 className="text-xl font-bold text-white">Senior Statistical Officer / Lead Data Analyst</h3>
                <p className="text-xs text-slate-400">National Accounts Division • MoSPI Competency Target 82%</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-300 shrink-0 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 text-[11px]">Total Path Duration</span>
                <p className="font-bold text-white text-sm">64 Hours</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Pathway Progress</span>
                <p className="font-bold text-cyan-400 text-sm">34% Completed</p>
              </div>
            </div>
          </div>

          {/* Sequential 5-Stage Learning Cycle Diagram */}
          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">5-Stage Capacity Building Cycle</h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase">Stage 1</span>
                <p className="text-xs font-semibold text-white">Skill Gap Identified</p>
                <span className="text-[10px] text-slate-400">AI/ML (-33 pts)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">Stage 2</span>
                <p className="text-xs font-semibold text-white">iGOT Course Enrolled</p>
                <span className="text-[10px] text-slate-400">NSSTA-ML-401</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-blue-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase">Stage 3</span>
                <p className="text-xs font-semibold text-white">Module Completion</p>
                <span className="text-[10px] text-slate-400">18 Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Stage 4</span>
                <p className="text-xs font-semibold text-white">Knowledge Assessment</p>
                <span className="text-[10px] text-slate-400">MCQ Quiz Runner</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/20 text-center space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Stage 5</span>
                <p className="text-xs font-semibold text-white">Score Recalculated</p>
                <span className="text-[10px] text-slate-400">+16 pts Gain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sequential Step Timeline */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">Sequential Milestone Roadmap</h3>

          <div className="space-y-4">
            {learningPathSteps.map((step) => (
              <div key={step.stepNumber} className="space-y-2">
                <LearningPathStep step={step} />

                {/* Direct Action Link per Step */}
                <div className="pl-14 flex items-center gap-3">
                  {step.stepNumber === 1 && (
                    <button
                      onClick={() => setSelectedCourse(topCourse)}
                      className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Resume Course: NSSTA-ML-401</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {step.stepNumber === 2 && (
                    <Link
                      to="/my-learning"
                      className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Continue Module: ISRO-GIS-202 (65%)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {step.stepNumber === 3 && (
                    <Link
                      to="/quiz/quiz_stat_101"
                      className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Take Diagnostic Knowledge Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </PageContainer>
  );
}
