import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useQuiz } from '../context/QuizContext';
import { CheckSquare, Edit3, Trash2, Plus, Send, Check, X, ShieldCheck, Sparkles, BookOpen, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizReview() {
  const {
    generatedQuestions,
    approveQuestion,
    rejectQuestion,
    updateQuestion,
    deleteQuestion,
    regenerateQuestion,
    publishQuizToLearners
  } = useQuiz();

  const [activeTab, setActiveTab] = useState('all');
  const [published, setPublished] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const tabs = [
    { id: 'all', label: 'All MCQs', count: generatedQuestions.length },
    { id: 'AI Generated', label: 'AI Generated', count: generatedQuestions.filter(q => q.status === 'AI Generated').length },
    { id: 'Approved', label: 'Approved', count: generatedQuestions.filter(q => q.status === 'Approved').length },
    { id: 'Published', label: 'Published', count: generatedQuestions.filter(q => q.status === 'Published').length },
  ];

  const filteredQuestions = generatedQuestions.filter(q => {
    if (activeTab === 'all') return true;
    return q.status === activeTab;
  });

  const handleApprove = (id) => {
    approveQuestion(id);
  };

  const handlePublishAll = () => {
    publishQuizToLearners("Official MoSPI Synthesized Assessment 2026", "AI/ML");
    setPublished(true);
    setTimeout(() => setPublished(false), 5000);
  };

  const startEdit = (q) => {
    setEditingId(q.id);
    setEditForm({
      questionText: q.questionText,
      options: [...q.options],
      correctAnswerIndex: q.correctAnswerIndex,
      explanation: q.explanation,
      difficulty: q.difficulty,
      sourceReference: q.sourceReference
    });
  };

  const saveEdit = (id) => {
    updateQuestion(id, editForm);
    setEditingId(null);
  };

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <CheckSquare className="w-6 h-6 text-teal-400" />
              <span>Trainer Quiz Validation & Quality Control Studio</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Review, edit options, modify difficulty, validate explanations, and publish AI-synthesized MCQs into learner assessments
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublishAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Publish Quiz to Learners</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Banner when published */}
        {published && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 font-semibold">
              <Check className="w-4 h-4" />
              <span>Quiz successfully published to official MoSPI Assessment Hub!</span>
            </div>
            <Link to="/assessments" className="underline font-bold">
              View In Assessment Hub →
            </Link>
          </div>
        )}

        {/* Workflow Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">MoSPI Quality Standard v2.4</span>
        </div>

        {/* Generated Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">No MCQs found under tab "{activeTab}"</h4>
            <p className="text-xs text-slate-500">Switch tabs or upload a new manual in AI Assessment Studio to synthesize questions.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                      MCQ #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-400 text-xs font-medium border border-teal-500/20">
                      {q.competency}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                      Difficulty: {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium">
                      AI Confidence: <strong className="text-cyan-400">{q.aiConfidence}%</strong>
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      q.status === 'Published'
                        ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20'
                        : q.status === 'Approved'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/20'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                </div>

                {editingId === q.id ? (
                  /* EDITING MODE FORM */
                  <div className="space-y-4 p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-cyan-400 uppercase text-[10px]">Question Text</label>
                      <textarea
                        value={editForm.questionText}
                        onChange={(e) => setEditForm({ ...editForm, questionText: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-bold text-cyan-400 uppercase text-[10px]">Options & Correct Answer Selection</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {editForm.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800">
                            <input
                              type="radio"
                              name={`correct_review_${q.id}`}
                              checked={editForm.correctAnswerIndex === oIdx}
                              onChange={() => setEditForm({ ...editForm, correctAnswerIndex: oIdx })}
                              className="accent-cyan-500"
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...editForm.options];
                                newOpts[oIdx] = e.target.value;
                                setEditForm({ ...editForm, options: newOpts });
                              }}
                              className="flex-1 bg-transparent text-white border-none focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-cyan-400 uppercase text-[10px]">Difficulty Level</label>
                        <select
                          value={editForm.difficulty}
                          onChange={(e) => setEditForm({ ...editForm, difficulty: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold text-cyan-400 uppercase text-[10px]">Source Reference</label>
                        <input
                          type="text"
                          value={editForm.sourceReference}
                          onChange={(e) => setEditForm({ ...editForm, sourceReference: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-cyan-400 uppercase text-[10px]">AI Rationale / Explanation</label>
                      <input
                        type="text"
                        value={editForm.explanation}
                        onChange={(e) => setEditForm({ ...editForm, explanation: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(q.id)}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                      >
                        Save Question Edits
                      </button>
                    </div>
                  </div>
                ) : (
                  /* VIEW DISPLAY MODE */
                  <>
                    <h3 className="text-base font-bold text-white leading-snug">{q.questionText}</h3>

                    {/* Options Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                            oIdx === q.correctAnswerIndex
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold'
                              : 'bg-slate-950/40 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          {oIdx === q.correctAnswerIndex && (
                            <span className="text-[10px] uppercase font-bold text-emerald-400">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* AI Explanation & Citation */}
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs space-y-1">
                      <p className="text-slate-300">
                        <strong className="text-cyan-400">AI Rationale:</strong> {q.explanation}
                      </p>
                      <p className="text-slate-400">
                        Source Reference: <strong className="text-slate-300">{q.sourceReference}</strong>
                      </p>
                    </div>
                  </>
                )}

                {/* Action Buttons Toolbar */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(q)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Question</span>
                    </button>
                    <button
                      onClick={() => regenerateQuestion(q.id)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 font-semibold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => rejectQuestion(q.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 font-semibold flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(q.id)}
                      disabled={q.status === 'Approved' || q.status === 'Published'}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        q.status === 'Approved' || q.status === 'Published'
                          ? 'opacity-50 cursor-not-allowed bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{q.status === 'Approved' || q.status === 'Published' ? 'Approved' : 'Approve MCQ'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
