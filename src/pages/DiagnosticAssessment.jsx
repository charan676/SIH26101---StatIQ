import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { useUser } from '../context/UserContext';
import { getDiagnosticQuestions } from '../data/diagnosticQuestionBank';
import { ProgressRing } from '../components/common/Card';
import { AnswerOption } from '../components/assessment/AssessmentComponents';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  BrainCircuit,
  Trophy,
  TrendingDown,
  BookOpen,
  Award
} from 'lucide-react';

export default function DiagnosticAssessment() {
  const { userState, completeDiagnosticAssessment } = useUser();
  const navigate = useNavigate();

  // Load questions tailored to user's selected role and competency level
  const questions = getDiagnosticQuestions(userState.role, userState.competencyLevel);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  const currentQuestion = questions[currentIndex] || questions[0];

  const handleSelectOption = (optIdx) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    let correctCount = 0;
    const weakAreasSet = new Set();

    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      } else {
        if (q.competency) {
          weakAreasSet.add(q.competency);
        }
      }
    });

    const totalQuestions = questions.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const weakAreas = Array.from(weakAreasSet);

    const result = {
      scorePercent,
      totalQuestions,
      correctCount,
      weakAreas: weakAreas.length > 0 ? weakAreas : ["Advanced Econometric Modeling"]
    };

    setSubmissionData(result);
    setIsSubmitted(true);

    // Save to global user context & persistent local storage
    completeDiagnosticAssessment(result);
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] py-8 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                StatIQ Diagnostic Evaluation
              </span>
              <h1 className="text-lg font-bold text-white leading-tight">
                Role: {userState.role} • {userState.competencyLevel} Level
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Candidate: <strong className="text-white">{userState.name}</strong></span>
          </div>
        </div>

        {!isSubmitted ? (
          /* ACTIVE ASSESSMENT QUESTION RUNNER */
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-6">
            {/* Top Bar Progress */}
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/20">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
                  {currentQuestion.competency || 'General Statistics'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Timer: <strong className="text-white">12:30</strong></span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {currentQuestion.questionText}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => (
                <AnswerOption
                  key={idx}
                  optionText={opt}
                  index={idx}
                  selected={selectedOptions[currentIndex] === idx}
                  onClick={() => handleSelectOption(idx)}
                />
              ))}
            </div>

            {/* Footer Navigation */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-500'
                    : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={selectedOptions[currentIndex] === undefined}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedOptions[currentIndex] === undefined
                      ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:scale-[1.02]'
                  }`}
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitAssessment}
                  disabled={Object.keys(selectedOptions).length < questions.length}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    Object.keys(selectedOptions).length < questions.length
                      ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.02]'
                  }`}
                >
                  <span>Submit Diagnostic Assessment</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* DIAGNOSTIC ASSESSMENT RESULT SCREEN */
          <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider block">
                Diagnostic Assessment Complete
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Initial Competency Profile Baseline Established
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Your performance in this baseline evaluation has calibrated your initial readiness score and identified key skill development focus areas.
              </p>
            </div>

            {/* Score Ring & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-y border-slate-800 py-6">
              <div className="flex flex-col items-center justify-center">
                <ProgressRing score={submissionData.scorePercent} size={110} strokeWidth={8} label="Accuracy" />
              </div>

              <div className="space-y-3 col-span-2 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Score</span>
                    <span className="text-lg font-bold text-white">
                      {submissionData.correctCount} / {submissionData.totalQuestions} ({submissionData.scorePercent}%)
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Cadre Level</span>
                    <span className="text-lg font-bold text-cyan-400">{userState.competencyLevel}</span>
                  </div>
                </div>

                {/* Identified Weak Areas */}
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold">
                    <TrendingDown className="w-4 h-4" />
                    <span>Identified Skill Gaps for Remediation:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {submissionData.weakAreas.map((area, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/30">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Question Review Accordion / List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-cyan-400" />
                <span>Question-by-Question Review & Correct Answers</span>
              </h3>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const userAns = selectedOptions[idx];
                  const isCorrect = userAns === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-3 ${
                        isCorrect
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-rose-500/5 border-rose-500/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold text-white leading-relaxed">
                          Q{idx + 1}. {q.questionText}
                        </span>
                        {isCorrect ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shrink-0 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30 shrink-0 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div className={`p-2 rounded border ${userAns === q.correctAnswerIndex ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
                          <strong>Your Answer:</strong> {q.options[userAns] || 'Not answered'}
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 text-emerald-400">
                          <strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-slate-950/60 text-slate-300 text-[11px] leading-relaxed">
                        <strong className="text-cyan-400">Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue to Dashboard CTA */}
            <div className="pt-4 border-t border-slate-800 flex justify-center">
              <button
                onClick={handleContinueToDashboard}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
