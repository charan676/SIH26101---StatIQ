import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialGeneratedQuestions } from '../data/trainerData';
import { uploadDocumentAndGenerateQuiz, API_BASE_URL } from '../utils/pdfParser';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [generatedQuestions, setGeneratedQuestions] = useState(initialGeneratedQuestions);
  const [publishedQuizzes, setPublishedQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load published quizzes from backend API GET http://127.0.0.1:8000/api/quizzes
  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/quizzes`);
      if (response.ok) {
        const quizzes = await response.json();
        const formatted = quizzes.map(q => ({
          id: `quiz_${q.id}`,
          quizId: q.id,
          title: q.title,
          category: "Official Statistics",
          description: `Generated from source material: ${q.source_material_name || 'MoSPI Manual'}`,
          questionsCount: q.questions_count || 5,
          durationMinutes: 15,
          status: "Available",
          scorePercent: null,
          difficulty: "Intermediate",
          targetCompetency: "Official Statistics"
        }));
        setPublishedQuizzes(formatted);
      }
    } catch (e) {
      console.warn("Failed to fetch live quizzes from backend:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Upload document and generate quiz targeting POST http://127.0.0.1:8000/api/quizzes/generate via native fetch()
  const uploadAndGenerateQuiz = async (fileOrPayload, fileName = "MoSPI_Manual_2026.pdf") => {
    if (fileOrPayload && fileOrPayload.questions && Array.isArray(fileOrPayload.questions)) {
      // Direct API response object passed
      const formatted = fileOrPayload.questions.map((q, idx) => ({
        id: `gen_q_${fileOrPayload.quiz_id || Date.now()}_${idx + 1}`,
        questionText: q.question || q.questionText,
        options: q.options,
        correctAnswerIndex: q.correct_answer !== undefined ? q.correct_answer : q.correctAnswerIndex,
        explanation: q.explanation,
        competency: "Official Statistics",
        difficulty: "Intermediate",
        aiConfidence: 97,
        sourceReference: `${fileOrPayload.title || fileName} — MoSPI Gemini LLM Synthesized`,
        status: "AI Generated"
      }));
      setGeneratedQuestions(prev => [...formatted, ...prev]);
      return formatted;
    }

    let fileToUpload;
    if (fileOrPayload instanceof File) {
      fileToUpload = fileOrPayload;
    } else {
      const text = Array.isArray(fileOrPayload) ? fileOrPayload.map(p => p.text).join('\n') : String(fileOrPayload);
      fileToUpload = new File([text], fileName, { type: 'text/plain' });
    }

    try {
      const res = await uploadDocumentAndGenerateQuiz(fileToUpload, null, fileName, 5, 1);
      setGeneratedQuestions(prev => [...res.questions, ...prev]);
      await fetchQuizzes();
      return res.questions;
    } catch (err) {
      console.error("Native fetch quiz generation error:", err);
      throw err;
    }
  };

  const approveQuestion = (id) => {
    setGeneratedQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Approved' } : q));
  };

  const rejectQuestion = (id) => {
    setGeneratedQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Rejected' } : q));
  };

  const updateQuestion = (id, updatedFields) => {
    setGeneratedQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updatedFields } : q));
  };

  const deleteQuestion = (id) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const publishQuizToLearners = (title, category) => {
    setGeneratedQuestions(prev => prev.map(q => ({ ...q, status: 'Published' })));
    const newQuizId = `quiz_pub_${Date.now()}`;
    const newQuizObj = {
      id: newQuizId,
      title: title || "Newly Published MoSPI AI Assessment Quiz",
      category: category || "Official Statistics",
      description: "Newly generated assessment uploaded from official MoSPI statistical manuals.",
      questionsCount: generatedQuestions.length || 5,
      durationMinutes: 15,
      status: "Available",
      scorePercent: null,
      difficulty: "Intermediate",
      targetCompetency: category || "Official Statistics"
    };

    setPublishedQuizzes(prev => [newQuizObj, ...prev]);
    return newQuizId;
  };

  return (
    <QuizContext.Provider value={{
      generatedQuestions,
      publishedQuizzes,
      loading,
      fetchQuizzes,
      uploadAndGenerateQuiz,
      approveQuestion,
      rejectQuestion,
      updateQuestion,
      deleteQuestion,
      publishQuizToLearners
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
