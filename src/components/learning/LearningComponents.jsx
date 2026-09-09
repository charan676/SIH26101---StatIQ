import React, { useState } from 'react';
import { Card, Badge, StatusBadge, ProgressBar } from '../common/Card';
import { Button } from '../common/Button';
import { BookOpen, ExternalLink, Sparkles, Clock, Star, Users, CheckCircle2, ArrowRight, X, PlayCircle, ShieldCheck, Check } from 'lucide-react';

export function CourseCard({ course, onSelectCourse }) {
  return (
    <div
      onClick={() => onSelectCourse && onSelectCourse(course)}
      className="flex flex-col justify-between h-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 group hover:border-slate-700 transition-colors cursor-pointer"
    >
      <div className="space-y-3">
        {/* Cover Image & iGOT Badge */}
        <div className="relative h-36 rounded-lg overflow-hidden border border-slate-800">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-1 z-10">
            <span className="px-2 py-0.5 rounded bg-cyan-500/90 backdrop-blur-sm text-slate-950 font-bold text-[11px]">
              {course.provider}
            </span>
          </div>
          {course.priority === 'Critical' && (
            <div className="absolute bottom-2 right-2 z-10">
              <span className="px-2 py-0.5 rounded bg-rose-500/90 backdrop-blur-sm text-white font-semibold text-[11px]">
                Targeting Critical Gap
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-sans">
          <span>{course.code}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
        </div>

        <h4 className="text-base font-semibold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {course.title}
        </h4>

        {/* Competency Targeted */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Target Competency:</span>
          <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-400 border border-teal-500/20 font-medium">
            {course.competency}
          </span>
        </div>

        {/* Skills Tag list */}
        <div className="flex flex-wrap gap-1 pt-1">
          {course.skillsCovered.map((skill, idx) => (
            <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Rationale & Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        {course.recommendationRationale && (
          <p className="text-xs text-teal-300 bg-teal-500/10 border border-teal-500/20 p-2.5 rounded-lg flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-teal-400 mt-0.5" />
            <span className="line-clamp-2">{course.recommendationRationale}</span>
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-white font-bold">{course.rating}</span>
            <span>({course.enrolledCount.toLocaleString()})</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectCourse && onSelectCourse(course);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 text-xs font-semibold border border-cyan-500/30 transition-all"
          >
            <span>{course.enrolled ? 'Resume' : 'View Course'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CourseGrid({ courses = [], onSelectCourse }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
      ))}
    </div>
  );
}

export function RecommendationCard({ course, onSelectCourse }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-medium border border-cyan-500/30">
              Top Recommended iGOT Pathway
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-medium border border-rose-500/30">
              Critical Gap: -{course.targetGap} pts
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{course.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{course.recommendationRationale}</p>
        </div>

        <button
          onClick={() => onSelectCourse && onSelectCourse(course)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] shrink-0"
        >
          <span>Start iGOT Course</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function LearningPathStep({ step, onToggleStep }) {
  return (
    <div className="relative flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
      <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center shrink-0">
        {step.stepNumber}
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base font-bold text-white">{step.title}</h4>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
            step.completionPercentage === 100
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
              : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20'
          }`}>
            {step.status}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
          <span>Target Competency: <strong className="text-teal-400 font-semibold">{step.competency}</strong></span>
          <span>Duration: <strong className="text-slate-200">{step.estimatedHours} Hours</strong></span>
          <span>Role Alignment: <strong className="text-slate-200">{step.recommendedRole}</strong></span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Step Progress</span>
            <span className="font-semibold text-cyan-400">{step.completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              style={{ width: `${step.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseDetailModal({ course, onClose, onToggleEnroll }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs text-cyan-400 font-semibold">{course.provider} • {course.code}</span>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">{course.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-cyan-400" />{course.duration}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{course.rating} Rating</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4 text-teal-400" />{course.enrolledCount.toLocaleString()} Enrolled Officials</span>
          </div>

          <p className="leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            {course.recommendationRationale}
          </p>

          {/* Skills Tag Cloud */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills & Modules Covered</h4>
            <div className="flex flex-wrap gap-2">
              {course.skillsCovered.map((skill, idx) => (
                <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700/60 font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Syllabus Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curriculum Outline</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">Module 1: Foundations & Official Data Structures</span>
                <span className="text-slate-400">3 Hours</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">Module 2: Statistical Modeling & Data Transformation</span>
                <span className="text-slate-400">5 Hours</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">Module 3: NSSO Survey Audit & Diagnostic Case Study</span>
                <span className="text-slate-400">6 Hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1"
          >
            <span>View on iGOT Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onToggleEnroll && onToggleEnroll(course.id);
                onClose();
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                course.enrolled
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02]'
              }`}
            >
              {course.enrolled ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Enrolled (Resume Course)</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Enroll in iGOT Module</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
