import React, { createContext, useContext, useState } from 'react';
import { initialGeneratedQuestions } from '../data/trainerData';
import { synthesizeMCQsFromExtractedText } from '../utils/pdfParser';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [generatedQuestions, setGeneratedQuestions] = useState(initialGeneratedQuestions);
  const [publishedQuizzes, setPublishedQuizzes] = useState([
    {
      id: "quiz_stat_101",
      title: "AI/ML & Econometric Statistical Intelligence Quiz",
      category: "AI/ML",
      description: "Official evaluation of Machine Learning models for national statistical forecasting, time-series analysis, and anomaly detection.",
      questionsCount: 4,
      durationMinutes: 15,
      status: "Completed",
      scorePercent: 85,
      difficulty: "Intermediate",
      targetCompetency: "AI/ML"
    },
    {
      id: "quiz_gis_202",
      title: "Geospatial Data & GIS Sample Framing Assessment",
      category: "GIS",
      description: "Spatial autocorrelation, boundary digitization, QGIS, and census sampling frame verification.",
      questionsCount: 10,
      durationMinutes: 20,
      status: "Available",
      scorePercent: null,
      difficulty: "Intermediate",
      targetCompetency: "GIS"
    },
    {
      id: "quiz_py_305",
      title: "Python Data Pipelines & NSSO Microdata Scripting",
      category: "Python",
      description: "Pandas DataFrame operations, automated ETL processing, and survey data aggregation audit.",
      questionsCount: 8,
      durationMinutes: 15,
      status: "Available",
      scorePercent: null,
      difficulty: "Intermediate",
      targetCompetency: "Python"
    },
    {
      id: "quiz_diag_001",
      title: "MoSPI Official Cadre Diagnostic Assessment 2026",
      category: "Diagnostic",
      description: "Comprehensive 9-domain diagnostic assessment evaluating overall readiness for Senior Statistical Officer position.",
      questionsCount: 25,
      durationMinutes: 45,
      status: "Completed",
      scorePercent: 74,
      difficulty: "Comprehensive",
      targetCompetency: "Cross-Domain"
    }
  ]);

  // Generate MCQs from parsed document pages or default fallback
  const uploadAndGenerateQuiz = (pagesDataOrFileName, fileName = "MoSPI_Manual_2026.pdf") => {
    let newQuestions = [];

    if (Array.isArray(pagesDataOrFileName)) {
      newQuestions = synthesizeMCQsFromExtractedText(pagesDataOrFileName, fileName);
    } else {
      const fName = typeof pagesDataOrFileName === 'string' ? pagesDataOrFileName : fileName;
      const timestamp = Date.now();
      newQuestions = [
        {
          id: `gen_q_${timestamp}_1`,
          questionText: `[Extracted from ${fName}] In National Accounts sampling design, which ratio estimator minimizes variance across unequal stratifications?`,
          options: [
            "Horvitz-Thompson unbiased linear estimator",
            "Simple Random Sampling without replacement",
            "Unweighted arithmetic mean",
            "Fixed interval systematic selection"
          ],
          correctAnswerIndex: 0,
          explanation: "Horvitz-Thompson estimator calculates inclusion probabilities for each primary sampling unit (PSU).",
          competency: "Statistical Methods",
          difficulty: "Intermediate",
          aiConfidence: 97,
          sourceReference: `${fName} — Page 14, Section 2.3`,
          status: "AI Generated"
        },
        {
          id: `gen_q_${timestamp}_2`,
          questionText: `[Extracted from ${fName}] When applying Gradient Boosted Trees for automated NSSO anomaly detection, what is the impact of setting learning_rate=0.01?`,
          options: [
            "Increases model generalization while requiring more boosting iterations",
            "Causes instant model overfitting on training microdata",
            "Disables feature importance calculation",
            "Forces equal weighting for all decision nodes"
          ],
          correctAnswerIndex: 0,
          explanation: "Lower shrinkage rates (learning_rate=0.01) require more trees but significantly improve model generalization on noisy survey data.",
          competency: "AI/ML",
          difficulty: "Advanced",
          aiConfidence: 95,
          sourceReference: `${fName} — Page 28, Section 4.1`,
          status: "AI Generated"
        }
      ];
    }

    setGeneratedQuestions(prev => [...newQuestions, ...prev]);
    return newQuestions;
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

  const regenerateQuestion = (id) => {
    setGeneratedQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return {
          ...q,
          questionText: q.questionText + " (Regenerated for Calibration)",
          aiConfidence: Math.min(99, q.aiConfidence + 2),
          status: 'AI Generated'
        };
      }
      return q;
    }));
  };

  const publishQuizToLearners = (title, category) => {
    setGeneratedQuestions(prev => prev.map(q => ({ ...q, status: 'Published' })));

    const newQuizId = `quiz_pub_${Date.now()}`;
    const activeQuestions = generatedQuestions.filter(q => q.status !== 'Rejected');
    const newQuizObj = {
      id: newQuizId,
      title: title || "Newly Published MoSPI AI Assessment Quiz",
      category: category || "AI/ML",
      description: "Newly generated and trainer-validated quiz uploaded from official MoSPI statistical manuals.",
      questionsCount: activeQuestions.length || generatedQuestions.length,
      durationMinutes: 15,
      status: "Available",
      scorePercent: null,
      difficulty: "Intermediate",
      targetCompetency: category || "AI/ML"
    };

    setPublishedQuizzes(prev => [newQuizObj, ...prev]);
    return newQuizId;
  };

  return (
    <QuizContext.Provider value={{
      generatedQuestions,
      publishedQuizzes,
      uploadAndGenerateQuiz,
      approveQuestion,
      rejectQuestion,
      updateQuestion,
      deleteQuestion,
      regenerateQuestion,
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
