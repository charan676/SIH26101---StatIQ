import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { UploadZone } from '../components/assessment/AssessmentComponents';
import { useQuiz } from '../context/QuizContext';
import { Sparkles, FileText, CheckCircle2, ArrowRight, RefreshCw, Check, X, ShieldCheck, FileCode, Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIAssessment() {
  const { generatedQuestions, uploadAndGenerateQuiz, approveQuestion, deleteQuestion, updateQuestion } = useQuiz();
  const [file, setFile] = useState(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [uploadError, setUploadError] = useState(null);

  const pipelineSteps = [
    "Step 1: Document Uploaded & Received",
    "Step 2: PDF Text & Structure Extracted (pypdf)",
    "Step 3: Statistical Concepts & MoSPI Taxonomy Mapped",
    "Step 4: Prompt Construction with Framework Bounds",
    "Step 5: Gemini Chat Model MCQ Generation (POST http://127.0.0.1:8000/api/quizzes/generate)",
    "Step 6: Pydantic Structured Output Validation Complete"
  ];

  const handleFileUpload = async (uploadedFile) => {
    setUploadError(null);
    let fileObj;
    if (uploadedFile && uploadedFile.name) {
      fileObj = uploadedFile;
    } else {
      fileObj = new File([
        "MoSPI Official Statistical System: Survey design, sampling frames, national accounts (GDP/GVA), price index calculation, and SDG monitoring methodology."
      ], "MoSPI_National_Accounts_Manual_2026.pdf", { type: 'application/pdf' });
    }

    setFile({ name: fileObj.name });
    setProcessingStage(1);

    try {
      await uploadAndGenerateQuiz(fileObj, fileObj.name);
    } catch (err) {
      console.error("Live fetch document upload error:", err);
      setUploadError(err.message || "Failed to generate quiz from document");
    }

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243247] pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span>StatIQ AI Assessment Studio</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Upload official MoSPI manuals to generate structured MCQ assessments via Gemini API
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDemoUpload}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs font-semibold border border-cyan-500/30 transition-all shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <FileCode className="w-4 h-4" />
              <span>Demo Upload PDF</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3.5 py-2 rounded-full border border-cyan-500/20">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>POST /api/quizzes/generate Active</span>
            </div>
          </div>
        </div>

        {uploadError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <span><strong>Upload Error:</strong> {uploadError}</span>
            <button onClick={() => setUploadError(null)} className="text-rose-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Upload Zone & Stepper */}
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
            <div className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-6 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <div className="flex items-center justify-between border-b border-[#243247] pb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">Live Document Processing: {file.name}</h3>
                    <p className="text-xs text-slate-400">Native fetch() targeting http://127.0.0.1:8000/api/quizzes/generate</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/20">
                  {processingStage < 6 ? `Processing (${processingStage}/6)` : '✓ Complete'}
                </span>
              </div>

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
                          : 'bg-[#070A0F]/60 border-[#243247] text-slate-500'
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

            {/* Generated Questions List */}
            {processingStage === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#243247] pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      <span>Synthesized Assessment MCQs</span>
                    </h3>
                    <p className="text-xs text-slate-400">Generated from {file.name} • Grounded via MoSPI Gemini LLM</p>
                  </div>

                  <Link
                    to="/quiz-review"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:scale-[1.02] transition-all shrink-0"
                  >
                    <span>Go to Trainer Studio ({generatedQuestions.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {generatedQuestions.map((q, idx) => (
                    <div key={q.id} className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
                      <div className="flex items-center justify-between border-b border-[#243247] pb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                            MCQ #{idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-400 text-xs font-medium border border-teal-500/20">
                            {q.competency}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          {q.aiConfidence}% AI Confidence
                        </span>
                      </div>

                      {editingQuestionId === q.id ? (
                        <div className="space-y-4 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/40">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-cyan-400 uppercase">Question Text</label>
                            <textarea
                              value={editFormData.questionText}
                              onChange={(e) => setEditFormData({ ...editFormData, questionText: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                              rows={2}
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button onClick={() => setEditingQuestionId(null)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs">Cancel</button>
                            <button onClick={() => saveEditing(q.id)} className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs">Save</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-base font-bold text-white leading-snug">{q.questionText}</h4>
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
                                {oIdx === q.correctAnswerIndex && <span className="text-[10px] uppercase font-bold text-emerald-400">✓ Correct</span>}
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Source: <strong className="text-cyan-400">{q.sourceReference}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => startEditing(q)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1"><Edit3 className="w-3.5 h-3.5" />Edit</button>
                          <button onClick={() => deleteQuestion(q.id)} className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-semibold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                          <button onClick={() => approveQuestion(q.id)} className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" />Approve</button>
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
