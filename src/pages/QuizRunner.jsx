import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { QuestionCard } from '../components/assessment/AssessmentComponents';
import { getQuizById, sampleQuiz } from '../data/quizData';
import { useQuiz } from '../context/QuizContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function QuizRunner() {
  const { id } = useParams();
  const { publishedQuizzes } = useQuiz();
  const navigate = useNavigate();

  const activeQuiz = getQuizById(id, publishedQuizzes) || sampleQuiz;
  const questions = activeQuiz.questions || sampleQuiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState((activeQuiz.durationMinutes || 15) * 60);

  const currentQuestion = questions[currentIndex] || questions[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate(`/quiz/${id || 'quiz_stat_101'}/result`, {
        state: {
          answers: selectedOptions,
          quizId: id || 'quiz_stat_101',
          quizTitle: activeQuiz.title,
          competencyDomain: activeQuiz.competencyDomain || 'AI/ML',
          questions: questions
        }
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">MoSPI Official Quiz Engine</span>
            <h1 className="text-lg md:text-xl font-bold text-white">{activeQuiz.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Domain: <strong className="text-white">{activeQuiz.competencyDomain || 'AI/ML'}</strong></span>
            </div>
          </div>
        </div>

        {/* Question Pagination Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {questions.map((q, idx) => {
            const isAnswered = selectedOptions[idx] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center justify-center ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400/50'
                    : isAnswered
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentIndex}
          totalQuestions={questions.length}
          selectedOption={selectedOptions[currentIndex]}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
          onPrev={handlePrev}
          isLast={currentIndex === questions.length - 1}
          timeRemaining={formatTime(timeLeftSeconds)}
        />
      </div>
    </PageContainer>
  );
}
