import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../utils/api';

const UserContext = createContext();

const DEFAULT_USER_STATE = {
  id: 1,
  name: "Test User",
  email: "testuser@mospi.gov.in",
  role: "Senior Statistical Officer (SSO)",
  competencyLevel: "Intermediate",
  department: "NSSO Field Operations Division",
  ministry: "Ministry of Statistics & Programme Implementation",
  location: "New Delhi Headquarters",
  ssoId: "GOV-SSO-991823",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  isLoggedIn: true,
  hasCompletedDiagnostic: false,
  diagnosticResult: null,
  overallReadiness: 74,
  streak: {
    currentStreak: 3,
    bestStreak: 14,
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyActivity: [true, true, true, true, true, false, true]
  },
  learningStats: {
    overallProgress: 68,
    coursesEnrolled: 3,
    coursesCompleted: 4,
    assessmentsCompleted: 5,
    avgAssessmentScore: 82,
    timeSpentHours: 12.5
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

  const [loading, setLoading] = useState(false);

  // Live profile fetch operation targeting GET http://127.0.0.1:8000/api/profiles/${userId}
  const fetchLiveProfile = useCallback(async (userId = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/profiles/${userId}`);
      if (response.ok) {
        const profile = await response.json();
        setUserState(prev => ({
          ...prev,
          id: profile.user_id,
          name: profile.display_name || prev.name,
          email: profile.email || prev.email,
          role: profile.designation || prev.role,
          department: profile.department || prev.department,
          seniorityLevel: profile.seniority_level || 2,
          yearsOfExperience: profile.years_of_experience || 4,
          overallReadiness: profile.overall_readiness || prev.overallReadiness || 74,
          competencyProfile: (profile.competency_profile && profile.competency_profile.length > 0)
            ? profile.competency_profile
            : prev.competencyProfile,
          igotRecommendations: (profile.igot_recommendations && profile.igot_recommendations.length > 0)
            ? profile.igot_recommendations
            : prev.igotRecommendations,
        }));
      }
    } catch (error) {
      console.warn("Live profile fetch failed, using stored context state:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveProfile(userState.id || 1);
  }, [fetchLiveProfile, userState.id]);

  useEffect(() => {
    try {
      localStorage.setItem('statiq_user_session', JSON.stringify(userState));
    } catch (e) {
      console.error("Failed to save user state to localStorage:", e);
    }
  }, [userState]);

  const loginUser = async ({ name, email, role, competencyLevel }) => {
    const formattedEmail = email.trim().toLowerCase();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formattedEmail, role }),
      });
      if (response.ok) {
        const authData = await response.json();
        setUserState(prev => ({
          ...prev,
          id: authData.user_id,
          name: authData.display_name || name.trim(),
          email: authData.email,
          role: authData.role,
          department: authData.department || prev.department,
          competencyLevel: competencyLevel || "Intermediate",
          isLoggedIn: true,
          streak: {
            ...(prev.streak || {}),
            currentStreak: authData.streak_count || prev.streak?.currentStreak || 3,
          },
          learningStats: {
            ...(prev.learningStats || {}),
            timeSpentHours: authData.total_learning_hours || 12.5,
          }
        }));
        return authData;
      }
    } catch (e) {
      console.warn("Native auth fetch failed, continuing with client state:", e);
    }

    setUserState(prev => ({
      ...prev,
      name: name.trim(),
      email: formattedEmail,
      role: role || prev.role,
      competencyLevel: competencyLevel || prev.competencyLevel,
      isLoggedIn: true,
    }));
  };

  const completeDiagnosticAssessment = ({ scorePercent, totalQuestions, correctCount, weakAreas }) => {
    const readinessDelta = Math.round((scorePercent - 50) / 5);

    const ALL_COMPETENCIES = [
      { id: "comp_data_literacy",     name: "Data Literacy",         domain: "Core Statistical Methods",  required: 80 },
      { id: "comp_stat_methods",      name: "Statistical Methods",   domain: "Core Statistical Methods",  required: 80 },
      { id: "comp_survey_method",     name: "Survey Methodology",    domain: "Field & Survey Engineering", required: 80 },
      { id: "comp_data_viz",          name: "Data Visualization",    domain: "Core Statistical Methods",  required: 75 },
      { id: "comp_stat_software",     name: "Statistical Software",  domain: "Data Science & Computing",  required: 75 },
      { id: "comp_python",            name: "Python",                domain: "Data Science & Computing",  required: 75 },
      { id: "comp_sql",               name: "SQL",                   domain: "Data Science & Computing",  required: 75 },
      { id: "comp_gis",               name: "GIS & Spatial Sampling",domain: "Geospatial & Advanced AI",  required: 70 },
      { id: "comp_aiml",              name: "AI/ML",                 domain: "Geospatial & Advanced AI",  required: 70 },
      { id: "comp_official_stats",    name: "Official Statistics",   domain: "Core Statistical Methods",  required: 80 },
    ];

    const weakAreaNames = weakAreas.map(w => w.toLowerCase());
    const generatedProfile = ALL_COMPETENCIES.map(comp => {
      const isWeak = weakAreaNames.some(w =>
        comp.name.toLowerCase().includes(w) ||
        w.includes(comp.name.toLowerCase().split(' ')[0]) ||
        comp.id.toLowerCase().includes(w.replace(/[^a-z]/g, ''))
      );
      const current = isWeak
        ? Math.max(20, Math.round(comp.required * 0.45))
        : Math.min(comp.required + 10, Math.round(comp.required * 0.85));
      const gap = Math.max(0, comp.required - current);
      const priority = gap >= 25 ? 'Critical' : gap >= 15 ? 'High' : gap >= 5 ? 'Moderate' : 'Strong';
      return { ...comp, current, gap, priority, status: gap === 0 ? 'Proficient' : 'Needs Action', lastAssessed: new Date().toISOString().split('T')[0] };
    });

    setUserState(prev => {
      const updatedReadiness = Math.min(98, Math.max(30, (prev.overallReadiness || 65) + readinessDelta));
      const today = new Date().toISOString().split('T')[0];
      const isAlreadyActiveToday = prev.streak?.lastActiveDate === today;
      const currentStreak = prev.streak?.currentStreak || 0;
      const newStreakCount = isAlreadyActiveToday ? currentStreak : currentStreak + 1;

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
        competencyProfile: generatedProfile,
        streak: {
          ...(prev.streak || {}),
          currentStreak: newStreakCount,
          bestStreak: Math.max(prev.streak?.bestStreak || 0, newStreakCount),
          lastActiveDate: today,
        }
      };
    });
  };

  const recordQuizCompletion = ({ quizId, title, competency = "AI/ML", scorePercent = 80 }) => {
    setUserState(prev => {
      const pointsGained = scorePercent >= 75 ? 16 : scorePercent >= 50 ? 10 : 5;
      const compProfile = prev.competencyProfile || [];

      const updatedProfile = compProfile.map(comp => {
        const matchesComp = comp.name.toLowerCase().includes(competency.toLowerCase()) ||
                            competency.toLowerCase().includes(comp.name.toLowerCase());
        if (matchesComp) {
          const newCurrent = Math.min(100, comp.current + pointsGained);
          const newGap = Math.max(0, comp.required - newCurrent);
          return { ...comp, current: newCurrent, gap: newGap };
        }
        return comp;
      });

      return {
        ...prev,
        competencyProfile: updatedProfile,
        learningStats: {
          ...(prev.learningStats || {}),
          assessmentsCompleted: (prev.learningStats?.assessmentsCompleted || 0) + 1,
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
      loading,
      fetchLiveProfile,
      loginUser,
      completeDiagnosticAssessment,
      recordQuizCompletion,
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
