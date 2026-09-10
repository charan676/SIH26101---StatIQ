import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useQuiz } from '../context/QuizContext';
import { useUser } from '../context/UserContext';
import { FileCheck2, Play, CheckCircle2, Clock, Award, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Assessments() {
  const { publishedQuizzes } = useQuiz();
  const { userState } = useUser();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const completedMap = userState.completedQuizzes || {};

  const filteredAssessments = publishedQuizzes.map(asm => {
    const userCompletion = completedMap[asm.id];
    if (userCompletion) {
      return {
        ...asm,
        status: 'Completed',
        scorePercent: userCompletion.scorePercent
      };
    }
    return asm;
  }).filter(a => {
    if (selectedFilter === 'all') return true;
    return a.category === selectedFilter;
  });

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243247] pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <FileCheck2 className="w-6 h-6 text-cyan-400" />
              <span>Official MoSPI Knowledge Assessment Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Diagnostic assessments and domain evaluation quizzes for statistical staff capacity building
            </p>
          </div>

          <Link
            to="/quiz/quiz_stat_101"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all hover:scale-[1.02] shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Quick Assessment</span>
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'Diagnostic', 'AI/ML', 'GIS', 'Python'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedFilter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                  : 'bg-[#111A28] text-slate-400 hover:text-white border border-[#243247]'
              }`}
            >
              {cat === 'all' ? 'All Assessments' : cat}
            </button>
          ))}
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssessments.map((asm) => (
            <div
              key={asm.id}
              className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.08)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                    {asm.category}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    asm.status === 'Completed'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                      : 'bg-blue-500/15 text-blue-400 border-blue-500/20'
                  }`}>
                    {asm.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">{asm.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{asm.description}</p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-[#243247]">
                  <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-cyan-400" />{asm.questionsCount} Questions</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{asm.durationMinutes} Mins</span>
                  <span className="text-slate-300 font-medium">Difficulty: {asm.difficulty}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#243247] flex items-center justify-between">
                {asm.scorePercent !== null ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Score: {asm.scorePercent}% Passed
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Not Taken</span>
                )}

                <Link
                  to={`/quiz/${asm.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 text-xs font-bold border border-cyan-500/30 transition-all"
                >
                  <span>{asm.status === 'Completed' ? 'Retake Quiz' : 'Start Assessment'}</span>
                  <Play className="w-3.5 h-3.5 fill-cyan-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

