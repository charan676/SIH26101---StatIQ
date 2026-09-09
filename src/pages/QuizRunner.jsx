import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { QuestionCard } from '../components/assessment/AssessmentComponents';
import { sampleQuiz } from '../data/quizData';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, ShieldCheck } from 'lucide-react';

export default function QuizRunner() {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60);
  const navigate = useNavigate();

  const currentQuestion = sampleQuiz.questions[currentIndex] || sampleQuiz.questions[0];

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
    if (currentIndex < sampleQuiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate(`/quiz/${id || 'quiz_stat_101'}/result`, { state: { answers: selectedOptions } });
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
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">MoSPI Official Quiz Runner</span>
            <h1 className="text-lg md:text-xl font-bold text-white">{sampleQuiz.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Deterministic Scoring Active</span>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentIndex}
          totalQuestions={sampleQuiz.questions.length}
          selectedOption={selectedOptions[currentIndex]}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
          onPrev={handlePrev}
          isLast={currentIndex === sampleQuiz.questions.length - 1}
          timeRemaining={formatTime(timeLeftSeconds)}
        />
      </div>
    </PageContainer>
  );
}
