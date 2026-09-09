import React, { useState } from 'react';
import { Card, Badge, StatusBadge, ProgressBar } from '../common/Card';
import { Button } from '../common/Button';
import { FileText, Upload, Sparkles, CheckCircle2, AlertCircle, Clock, CheckSquare, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';

export function AnswerOption({ optionText, index, selected, onClick, disabled = false, isCorrect, isWrong }) {
  const letters = ['A', 'B', 'C', 'D'];

  let borderStyle = 'border-slate-800 hover:border-cyan-500/50 bg-slate-900/60 text-slate-200';
  let badgeStyle = 'bg-slate-800 text-slate-400 font-sans';

  if (selected) {
    borderStyle = 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-sm';
    badgeStyle = 'bg-cyan-500 text-slate-950 font-bold';
  }

  if (isCorrect) {
    borderStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-300';
    badgeStyle = 'bg-emerald-500 text-slate-950 font-bold';
  } else if (isWrong) {
    borderStyle = 'border-rose-500 bg-rose-500/15 text-rose-300';
    badgeStyle = 'bg-rose-500 text-white font-bold';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${borderStyle}`}
    >
      <span className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center shrink-0 ${badgeStyle}`}>
        {letters[index]}
      </span>
      <span className="text-sm font-medium pt-0.5 leading-relaxed">{optionText}</span>
    </button>
  );
}

export function QuestionCard({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onPrev,
  isLast,
  timeRemaining = "14:45"
}) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
            {question.competency || 'AI/ML'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Timer: <strong className="text-white">{timeRemaining}</strong></span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-lg md:text-xl font-bold text-white leading-snug tracking-tight">
        {question.questionText}
      </h3>

      {/* Options list */}
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <AnswerOption
            key={idx}
            optionText={option}
            index={idx}
            selected={selectedOption === idx}
            onClick={() => onSelectOption(idx)}
          />
        ))}
      </div>

      {/* Footer controls */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            currentQuestionIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={onNext}
          disabled={selectedOption === null || selectedOption === undefined}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            selectedOption === null || selectedOption === undefined
              ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:scale-[1.02]'
          }`}
        >
          <span>{isLast ? 'Submit Assessment' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function UploadZone({ onFileUpload, isProcessing = false }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-8 lg:p-12 text-center transition-all duration-300 ${
        dragActive
          ? 'border-cyan-500 bg-cyan-500/10'
          : 'border-slate-800 hover:border-cyan-500/50 bg-slate-900/60'
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
          <Upload className="w-8 h-8 animate-bounce" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white">
            Upload Learning Material (PDF or TXT)
          </h4>
          <p className="text-xs text-slate-400">
            Drag & drop statistical manuals, NSSO survey guidelines, or econometric study material.
          </p>
        </div>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs cursor-pointer shadow-md hover:scale-[1.02] transition-transform">
          <FileText className="w-4 h-4" />
          <span>Select Document</span>
          <input
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFileUpload(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}

export function AIProcessingPipeline({ status = 'idle', fileName = '' }) {
  const steps = [
    { label: 'PDF Text Extraction (pdf-parse)', state: 'done' },
    { label: 'Chunking & Context Structuring', state: 'done' },
    { label: 'Gemini LLM MCQ Synthesis', state: 'active' },
    { label: 'JSON Schema Validation & Repair', state: 'pending' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
        <div>
          <h4 className="text-base font-bold text-white">StatIQ AI MCQ Extraction Pipeline</h4>
          <p className="text-xs text-slate-400">Processing: {fileName || 'MoSPI_Manual_2026.pdf'}</p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs">
            {step.state === 'done' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : step.state === 'active' ? (
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
            )}
            <span className={step.state === 'active' ? 'text-cyan-400 font-bold' : step.state === 'done' ? 'text-white' : 'text-slate-400'}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
