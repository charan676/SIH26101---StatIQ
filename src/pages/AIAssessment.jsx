import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { UploadZone } from '../components/assessment/AssessmentComponents';
import { useQuiz } from '../context/QuizContext';
import { extractTextFromPDF } from '../utils/pdfParser';
import { Sparkles, FileText, CheckCircle2, ArrowRight, RefreshCw, Check, X, ShieldCheck, FileCode, Edit3, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function AIAssessment() {
  const { generatedQuestions, uploadAndGenerateQuiz, approveQuestion, rejectQuestion, updateQuestion, deleteQuestion } = useQuiz();
  const [file, setFile] = useState(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const pipelineSteps = [
    "Step 1: Document Uploaded & Scanned",
    "Step 2: PDF Text & Structure Extracted (pdf-parse / pdfjs-dist)",
    "Step 3: Statistical Concepts & Equations Identified",
    "Step 4: MoSPI Competency Framework Mapped",
    "Step 5: Gemini LLM Structured MCQ Synthesis",
    "Step 6: JSON Schema Validation & Source Citation Calibration"
  ];

  const handleFileUpload = async (uploadedFile) => {
    const fileName = uploadedFile?.name || "MoSPI_National_Accounts_Manual_2026.pdf";
    setFile({ name: fileName });
    setProcessingStage(1);

    let extractedPages = [];
    if (uploadedFile) {
      extractedPages = await extractTextFromPDF(uploadedFile);
    }

    // Call context to generate new MCQs from this uploaded document text
    uploadAndGenerateQuiz(extractedPages.length > 0 ? extractedPages : fileName, fileName);

    // Step-by-step pipeline animation
    const interval = setInterval(() => {
      setProcessingStage(prev => {
        if (prev < 6) return prev + 1;
        clearInterval(interval);
        return 6;
      });
    }, 450);
  };

  const handleDemoUpload = () => {
    handleFileUpload({ name: "MoSPI_National_Accounts_Manual_2026.pdf" });
  };

  const startEditing = (q) => {
    setEditingQuestionId(q.id);
    setEditFormData({
      questionText: q.questionText,
      options: [...q.options],
      correctAnswerIndex: q.correctAnswerIndex,
      explanation: q.explanation,
      difficulty: q.difficulty
    });
  };

  const saveEditing = (id) => {
    updateQuestion(id, editFormData);
    setEditingQuestionId(null);
  };

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span>StatIQ AI Assessment Studio</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Upload official MoSPI manuals, NSSO guidelines, or study materials to auto-synthesize validated MCQ assessments
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDemoUpload}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs font-semibold border border-cyan-500/30 transition-all"
            >
              <FileCode className="w-4 h-4" />
              <span>Demo Quick Upload PDF</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3.5 py-2 rounded-full border border-cyan-500/20">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Gemini LLM MCQ Engine Active</span>
            </div>
          </div>
        </div>

        {/* Upload Zone & Interactive 6-Stage Pipeline */}
        {!file ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            <UploadZone onFileUpload={handleFileUpload} />
            <div className="text-center">
              <button
                onClick={handleDemoUpload}
                className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                <span>Or click here to load sample MoSPI_National_Accounts_Manual_2026.pdf</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pipeline Stepper animation */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">Document Processing: {file.name}</h3>
                    <p className="text-xs text-slate-400">Automated 6-stage AI extraction and competency synthesis</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/20">
                  {processingStage < 6 ? `Processing (${processingStage}/6)` : '✓ Pipeline Complete'}
                </span>
              </div>

              {/* Steps Progress Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pipelineSteps.map((stepText, idx) => {
                  const stepNum = idx + 1;
                  const isDone = processingStage > stepNum || processingStage === 6;
                  const isActive = processingStage === stepNum && processingStage < 6;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs flex items-center gap-3 transition-colors ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-200'
                          : isActive
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 font-semibold'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isActive ? (
                        <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span>{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generated Questions List (when stage complete) */}
            {processingStage === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      <span>Synthesized Assessment MCQs</span>
                    </h3>
                    <p className="text-xs text-slate-400">Generated from {file.name} • Grounded in document text • Source citations provided</p>
                  </div>

                  <Link
                    to="/quiz-review"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition-all shrink-0"
                  >
                    <span>Go to Trainer Validation Studio ({generatedQuestions.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {generatedQuestions.map((q, idx) => (
                    <div key={q.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                      {/* Question Metadata Bar */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                            MCQ #{idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-400 text-xs font-medium border border-teal-500/20">
                            {q.competency}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">
                            {q.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                            {q.aiConfidence}% AI Confidence
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                            q.status === 'Approved'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                              : q.status === 'Rejected'
                              ? 'bg-rose-500/15 text-rose-400 border-rose-500/20'
                              : q.status === 'Published'
                              ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/20'
                          }`}>
                            {q.status}
                          </span>
                        </div>
                      </div>

                      {/* Question Edit Form OR View mode */}
                      {editingQuestionId === q.id ? (
                        <div className="space-y-4 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/40">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-cyan-400 uppercase">Edit Question Text</label>
                            <textarea
                              value={editFormData.questionText}
                              onChange={(e) => setEditFormData({ ...editFormData, questionText: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                              rows={2}
                            />
                          </div>

                          {/* Options edit */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-cyan-400 uppercase">Edit Multiple Choice Options</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {editFormData.options.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`correct_${q.id}`}
                                    checked={editFormData.correctAnswerIndex === oIdx}
                                    onChange={() => setEditFormData({ ...editFormData, correctAnswerIndex: oIdx })}
                                    className="accent-cyan-500"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const newOpts = [...editFormData.options];
                                      newOpts[oIdx] = e.target.value;
                                      setEditFormData({ ...editFormData, options: newOpts });
                                    }}
                                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-cyan-400 uppercase">Edit Rationale / Explanation</label>
                            <input
                              type="text"
                              value={editFormData.explanation}
                              onChange={(e) => setEditFormData({ ...editFormData, explanation: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              onClick={() => setEditingQuestionId(null)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveEditing(q.id)}
                              className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-base font-bold text-white leading-snug">{q.questionText}</h4>

                          {/* Options Grid */}
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
                                {oIdx === q.correctAnswerIndex && <span className="text-[10px] uppercase font-bold text-emerald-400">✓ Correct Answer</span>}
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Source Reference & Action Footer */}
                      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <span className="text-slate-400">
                          Source Reference: <strong className="text-cyan-400">{q.sourceReference}</strong>
                        </span>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startEditing(q)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold border border-rose-500/20 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() => approveQuestion(q.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
