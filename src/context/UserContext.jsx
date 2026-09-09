import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_USER_STATE = {
  name: "Arjun Sharma",
  email: "arjun.sharma@mospi.gov.in",
  role: "Statistical Officer / Employee",
  competencyLevel: "Intermediate",
  department: "National Accounts Division",
  ministry: "Ministry of Statistics & Programme Implementation",
  location: "New Delhi Headquarters",
  ssoId: "GOV-SSO-991823",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  isLoggedIn: true,
  hasCompletedDiagnostic: true,
  diagnosticResult: {
    scorePercent: 74,
    totalQuestions: 5,
    correctCount: 4,
    weakAreas: ["GIS & Spatial Sampling"],
    completedAt: new Date().toISOString()
  },
  overallReadiness: 74,
  streak: {
    currentStreak: 7,
    bestStreak: 14,
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyActivity: [true, true, true, true, true, false, true] // Mon-Sun
  },
  learningStats: {
    overallProgress: 68,
    coursesEnrolled: 3,
    coursesCompleted: 4,
    assessmentsCompleted: 5,
    avgAssessmentScore: 82,
    timeSpentHours: 34.5
  }
};

export function UserProvider({ children }) {
  const [userState, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem('statiq_user_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load user state from localStorage:", e);
    }
    return DEFAULT_USER_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('statiq_user_session', JSON.stringify(userState));
    } catch (e) {
      console.error("Failed to save user state to localStorage:", e);
    }
  }, [userState]);

  const loginUser = ({ name, email, role, competencyLevel }) => {
    setUserState(prev => ({
      ...prev,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      competencyLevel,
      isLoggedIn: true,
      hasCompletedDiagnostic: false, // Force diagnostic assessment after login
      diagnosticResult: null,
      // Default readiness initialized based on level
      overallReadiness: competencyLevel === 'Beginner' ? 45 : competencyLevel === 'Intermediate' ? 65 : 80
    }));
  };

  const completeDiagnosticAssessment = ({ scorePercent, totalQuestions, correctCount, weakAreas }) => {
    const readinessDelta = Math.round((scorePercent - 50) / 5);
    setUserState(prev => {
      const updatedReadiness = Math.min(98, Math.max(30, (prev.overallReadiness || 65) + readinessDelta));
      const today = new Date().toISOString().split('T')[0];
      const isAlreadyActiveToday = prev.streak.lastActiveDate === today;
      const newStreakCount = isAlreadyActiveToday ? prev.streak.currentStreak : prev.streak.currentStreak + 1;

      return {
        ...prev,
        hasCompletedDiagnostic: true,
        overallReadiness: updatedReadiness,
        diagnosticResult: {
          scorePercent,
          totalQuestions,
          correctCount,
          weakAreas,
          completedAt: new Date().toISOString()
        },
        streak: {
          ...prev.streak,
          currentStreak: newStreakCount,
          bestStreak: Math.max(prev.streak.bestStreak, newStreakCount),
          lastActiveDate: today,
          weeklyActivity: prev.streak.weeklyActivity.map((val, idx) => (idx === new Date().getDay() - 1 ? true : val))
        },
        learningStats: {
          ...prev.learningStats,
          assessmentsCompleted: prev.learningStats.assessmentsCompleted + 1,
          avgAssessmentScore: Math.round((prev.learningStats.avgAssessmentScore + scorePercent) / 2)
        }
      };
    });
  };

  const recordLearningActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    setUserState(prev => {
      if (prev.streak.lastActiveDate === today) return prev;
      const newStreakCount = prev.streak.currentStreak + 1;
      return {
        ...prev,
        streak: {
          ...prev.streak,
          currentStreak: newStreakCount,
          bestStreak: Math.max(prev.streak.bestStreak, newStreakCount),
          lastActiveDate: today
        }
      };
    });
  };

  const logoutUser = () => {
    setUserState(DEFAULT_USER_STATE);
    localStorage.removeItem('statiq_user_session');
  };

  return (
    <UserContext.Provider value={{
      userState,
      setUserState,
      loginUser,
      completeDiagnosticAssessment,
      recordLearningActivity,
      logoutUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
