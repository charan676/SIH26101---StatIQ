export const orgAnalyticsData = {
  summary: {
    totalOfficials: 14250,
    activeLearners: 11840,
    overallCadreReadiness: 76.4,
    readinessChangeMonth: "+3.2%",
    totalCoursesCompleted: 34290,
    totalAssessmentAttempts: 52100,
    avgQuizScore: 81.5,
    topGapDomain: "AI & Geospatial Analytics"
  },
  departmentGaps: [
    { department: "National Accounts Division", totalOfficers: 210, avgReadiness: 78, criticalGaps: 14 },
    { department: "Field Operations Division (FOD)", totalOfficers: 1450, avgReadiness: 72, criticalGaps: 120 },
    { department: "Economic Statistics Division", totalOfficers: 380, avgReadiness: 81, criticalGaps: 18 },
    { department: "Social Statistics Division", totalOfficers: 290, avgReadiness: 75, criticalGaps: 25 },
    { department: "Computer Centre (IT)", totalOfficers: 160, avgReadiness: 88, criticalGaps: 4 }
  ],
  competencyHealth: [
    { competency: "Data Literacy", currentAvg: 86, requiredAvg: 85, health: "Optimal" },
    { competency: "Statistical Methods", currentAvg: 81, requiredAvg: 80, health: "Optimal" },
    { competency: "Survey Methodology", currentAvg: 83, requiredAvg: 85, health: "Good" },
    { competency: "Data Visualization", currentAvg: 76, requiredAvg: 80, health: "Moderate" },
    { competency: "Statistical Software", currentAvg: 72, requiredAvg: 80, health: "Moderate" },
    { competency: "SQL & Databases", currentAvg: 68, requiredAvg: 80, health: "Attention Needed" },
    { competency: "Python Scripting", currentAvg: 61, requiredAvg: 75, health: "Attention Needed" },
    { competency: "GIS & Spatial Data", currentAvg: 54, requiredAvg: 75, health: "High Gap" },
    { competency: "AI/ML Econometrics", currentAvg: 41, requiredAvg: 75, health: "Critical Gap" }
  ],
  monthlyProgressTrend: [
    { month: "Jan", readiness: 71.2, enrollment: 2400, completion: 1850 },
    { month: "Feb", readiness: 72.5, enrollment: 2800, completion: 2100 },
    { month: "Mar", readiness: 73.8, enrollment: 3100, completion: 2450 },
    { month: "Apr", readiness: 74.1, enrollment: 3400, completion: 2800 },
    { month: "May", readiness: 75.0, enrollment: 3900, completion: 3200 },
    { month: "Jun", readiness: 76.4, enrollment: 4250, completion: 3650 }
  ]
};
