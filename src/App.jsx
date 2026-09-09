import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// Page Views
import Dashboard from './pages/Dashboard';
import Competencies from './pages/Competencies';
import SkillGaps from './pages/SkillGaps';
import LearningPathPage from './pages/LearningPathPage';
import Courses from './pages/Courses';
import MyLearning from './pages/MyLearning';
import Assessments from './pages/Assessments';
import AIAssessment from './pages/AIAssessment';
import QuizReview from './pages/QuizReview';
import QuizRunner from './pages/QuizRunner';
import QuizResultPage from './pages/QuizResultPage';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import DiagnosticAssessment from './pages/DiagnosticAssessment';
import Home from './pages/Home';

import { QuizProvider } from './context/QuizContext';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Full-screen landing & auth routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diagnostic-assessment" element={<DiagnosticAssessment />} />

            {/* Main Application Shell Layout Routes */}
            <Route
              path="*"
              element={
                <AppShell>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/competencies" element={<Competencies />} />
                    <Route path="/skill-gaps" element={<SkillGaps />} />
                    <Route path="/learning-path" element={<LearningPathPage />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/my-learning" element={<MyLearning />} />
                    <Route path="/assessments" element={<Assessments />} />
                    <Route path="/assessment" element={<Assessments />} />
                    <Route path="/ai-assessment" element={<AIAssessment />} />
                    <Route path="/quiz-review" element={<QuizReview />} />
                    <Route path="/quiz/:id" element={<QuizRunner />} />
                    <Route path="/quiz/:id/result" element={<QuizResultPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Default redirect to /dashboard for unknown inner paths */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </AppShell>
              }
            />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </UserProvider>
  );
}
