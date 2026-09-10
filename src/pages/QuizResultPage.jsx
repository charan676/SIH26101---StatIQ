import React, { useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { ProgressRing } from '../components/common/Card';
import { sampleQuiz } from '../data/quizData';
import { useUser } from '../context/UserContext';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy, ShieldCheck, BookOpen, Award, LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function QuizResultPage() {
  const location = useLocation();
  const { userState, recordQuizCompletion } = useUser();

  const userAnswers = location.state?.answers || { 0: 1, 1: 1, 2: 1, 3: 1 };
  const quizId = location.state?.quizId || 'quiz_stat_101';
  const quizTitle = location.state?.quizTitle || 'AI/ML & Econometric Statistical Intelligence Quiz';
  const competencyDomain = location.state?.competencyDomain || 'AI/ML';
  const questionsList = location.state?.questions || sampleQuiz.questions;

  let correctCount = 0;
  questionsList.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswerIndex) {
      correctCount += 1;
    }
  });

  const totalCount = questionsList.length;
  const percentage = Math.round((correctCount / totalCount) * 100);
  const pointsGained = percentage >= 75 ? 16 : percentage >= 50 ? 10 : 5;

  // Persist result in global user state upon page load
  useEffect(() => {
    recordQuizCompletion({
      quizId,
      title: quizTitle,
      competency: competencyDomain,
      scorePercent: percentage
    });
  }, [quizId, percentage]);

  // Find baseline competency score from user state or defaults
  const compMatch = (userState.competencyProfile || []).find(c =>
    c.name.toLowerCase().includes(competencyDomain.toLowerCase()) ||
    competencyDomain.toLowerCase().includes(c.name.toLowerCase())
  );

  const currentScore = compMatch ? compMatch.current : 65;
  const beforeScore = Math.max(30, currentScore - pointsGained);
  const afterScore = currentScore;
  const targetScore = compMatch ? compMatch.required : 80;
  const remainingGap = Math.max(0, targetScore - afterScore);

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        {/* Main Result Card */}
        <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">MoSPI Assessment Execution Report</span>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {percentage >= 75 ? 'Assessment Passed with Distinction!' : 'Assessment Complete'}
              </h1>
              <p className="text-xs text-slate-400">
                {quizTitle} • Target Competency: <strong className="text-white">{competencyDomain}</strong>
              </p>
            </div>
          </div>

          <div className="py-2 flex flex-col items-center justify-center">
            <ProgressRing score={percentage} size={120} strokeWidth={9} label="Accuracy" />
          </div>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-slate-400 text-xs font-sans">Total Questions</span>
              <p className="text-lg font-bold text-white mt-0.5">{totalCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-slate-400 text-xs font-sans">Correct Answers</span>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">{correctCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-slate-400 text-xs font-sans">Accuracy</span>
              <p className="text-lg font-bold text-cyan-400 mt-0.5">{percentage}%</p>
            </div>
          </div>

          {/* COMPETENCY IMPACT COMPARISON BLOCK */}
          <div className="p-6 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Competency Score Recalculation</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                +{pointsGained} pts Gain Recalculated
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Domain: <strong className="text-white">{competencyDomain}</strong></span>
                <span className="text-slate-400">Position Target: <strong className="text-blue-400">{targetScore}/100</strong></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Before Quiz</span>
                  <p className="text-lg font-bold text-slate-300">{beforeScore}/100</p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-[11px] text-cyan-400">After Assessment</span>
                  <p className="text-xl font-bold text-cyan-400">{afterScore}/100</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Remaining Gap</span>
                  <p className="text-lg font-bold text-rose-400">-{remainingGap} pts</p>
                </div>
              </div>

              <div className="relative w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                  style={{ width: `${afterScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* QUESTION BY QUESTION REVIEW */}
          <div className="space-y-4 text-left border-t border-slate-800 pt-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Detailed Question Review</span>
            </h3>

            <div className="space-y-3">
              {questionsList.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.correctAnswerIndex;
                return (
                  <div key={q.id || idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-xs font-bold text-white leading-relaxed">
                        Q{idx + 1}. {q.questionText}
                      </h4>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shrink-0">
                          Correct
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 text-[10px] font-bold border border-rose-500/20 shrink-0">
                          Incorrect
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Correct Answer: <strong className="text-emerald-400">{q.options[q.correctAnswerIndex]}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800">
            <Link
              to="/assessments"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors text-center"
            >
              Back to Assessment Hub
            </Link>
            <Link
              to="/learning-path"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue Learning Path</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
