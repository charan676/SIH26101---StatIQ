import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { LearningPathStep, CourseDetailModal } from '../components/learning/LearningComponents';
import { getDynamicLearningPath, courses } from '../data/courseData';
import { useUser } from '../context/UserContext';
import { Route as RouteIcon, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, BookOpen, FileCheck2, TrendingUp, Award, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningPathPage() {
  const { userState, enrollCourse } = useUser();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const weakAreas = userState.diagnosticResult?.weakAreas || ["GIS & Spatial Sampling", "AI/ML", "Python & SQL"];
  const dynamicSteps = getDynamicLearningPath(weakAreas, userState.role, userState.competencyProfile);
  const enrolledList = userState.enrolledCourses || ['crs_igot_102', 'crs_igot_103'];

  const targetReadiness = userState.competencyLevel === 'Hard' ? 90 : userState.competencyLevel === 'Intermediate' ? 82 : 72;
  const currentReadiness = userState.overallReadiness || 74;

  const handleEnrollStepCourse = (courseId) => {
    enrollCourse(courseId);
    const targetCourse = courses.find(c => c.id === courseId) || courses[0];
    setSelectedCourse(targetCourse);
  };

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243247] pb-6">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172235] hover:bg-[#243247] border border-[#243247] text-xs font-semibold text-white transition-all duration-200 shrink-0"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Explore All iGOT Courses</span>
          </Link>
        </div>

        {/* Target Position Alignment Banner */}
        <div className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] shadow-[0_0_20px_rgba(6,182,212,0.12)] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-semibold">Active Cadre Capacity Target</span>
                <h3 className="text-xl font-bold text-white">{userState.role}</h3>
                <p className="text-xs text-slate-400">
                  {userState.department || 'National Accounts Division'} • MoSPI Readiness: <strong className="text-white">{currentReadiness}%</strong> / Target: <strong className="text-cyan-400">{targetReadiness}%</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-300 shrink-0 bg-[#070A0F]/80 p-3 rounded-xl border border-[#243247]">
              <div>
                <span className="text-slate-400 text-[11px]">Dynamic Milestones</span>
                <p className="font-bold text-white text-sm">{dynamicSteps.length} Stages</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Primary Focus</span>
                <p className="font-bold text-cyan-400 text-sm">{weakAreas[0] || 'Statistical Methods'}</p>
              </div>
            </div>
          </div>

          {/* Sequential 5-Stage Learning Cycle Diagram */}
          <div className="pt-4 border-t border-[#243247]">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">5-Stage Capacity Building Cycle</h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-3 rounded-xl bg-[#070A0F]/70 border border-rose-500/30 text-center space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase">Stage 1</span>
                <p className="text-xs font-semibold text-white">Skill Gap Identified</p>
                <span className="text-[10px] text-slate-400">{weakAreas[0] || 'GIS'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070A0F]/70 border border-cyan-500/30 text-center space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">Stage 2</span>
                <p className="text-xs font-semibold text-white">iGOT Course Enrolled</p>
                <span className="text-[10px] text-slate-400">Module Match</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070A0F]/70 border border-blue-500/30 text-center space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase">Stage 3</span>
                <p className="text-xs font-semibold text-white">Module Completion</p>
                <span className="text-[10px] text-slate-400">Interactive E-Learning</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070A0F]/70 border border-amber-500/30 text-center space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Stage 4</span>
                <p className="text-xs font-semibold text-white">Knowledge Assessment</p>
                <span className="text-[10px] text-slate-400">MCQ Quiz Runner</span>
              </div>
              <div className="p-3 rounded-xl bg-[#070A0F]/70 border border-emerald-500/30 text-center space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Stage 5</span>
                <p className="text-xs font-semibold text-white">Score Recalculated</p>
                <span className="text-[10px] text-slate-400">+12 pts Gain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sequential Step Timeline */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">Diagnostic-Driven Milestone Roadmap</h3>

          <div className="space-y-4">
            {dynamicSteps.map((step) => {
              const isEnrolled = enrolledList.includes(step.courseId);
              return (
                <div key={step.stepNumber} className="p-5 rounded-2xl bg-[#111A28] border border-[#243247] space-y-3 hover:border-cyan-500/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-bold text-xs flex items-center justify-center">
                        #{step.stepNumber}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{step.competency}</span>
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isEnrolled ? (
                        <Link
                          to="/my-learning"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Enrolled (Open My Learning)</span>
                        </Link>
                      ) : step.courseId !== 'capstone_eval' ? (
                        <button
                          onClick={() => handleEnrollStepCourse(step.courseId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Enroll Course: {step.courseCode}</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-lg bg-[#172235] text-slate-400 border border-[#243247] text-xs font-medium">
                          Capstone Evaluation
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pl-11">
                    Matched Course: <strong className="text-white">{step.courseTitle}</strong> ({step.estimatedHours} Hours)
                  </p>
                </div>
              );
            })}
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
