export const courses = [
  {
    id: "crs_igot_101",
    title: "Applied Machine Learning for National Econometrics & MoSPI Statistics",
    provider: "iGOT Karmayogi / NSSTA",
    code: "NSSTA-ML-401",
    competency: "AI/ML",
    targetGap: 33,
    priority: "Critical",
    duration: "18 Hours • 6 Modules",
    level: "Intermediate to Advanced",
    enrolled: false,
    progress: 0,
    rating: 4.9,
    enrolledCount: 1420,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    recommendationRationale: "Directly addresses your Critical Gap of 33 points in AI/ML required for Senior Statistical Officer role.",
    skillsCovered: ["Scikit-Learn", "Time Series Forecasting", "Anomaly Detection", "Automated Imputation"],
    url: "https://igotkarmayogi.gov.in/course/nssta-ml-401"
  },
  {
    id: "crs_igot_102",
    title: "Advanced Geospatial Analysis & GIS for Official Census & Sample Surveys",
    provider: "iGOT Karmayogi / ISRO-IIRS",
    code: "ISRO-GIS-202",
    competency: "GIS",
    targetGap: 20,
    priority: "High",
    duration: "14 Hours • 5 Modules",
    level: "Intermediate",
    enrolled: true,
    progress: 65,
    rating: 4.8,
    enrolledCount: 980,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600",
    recommendationRationale: "Recommended to bridge high gap (20 pts) in spatial grid sampling and survey mapping.",
    skillsCovered: ["QGIS", "GeoPandas", "Spatial Autocorrelation", "Boundary Digitization"],
    url: "https://igotkarmayogi.gov.in/course/isro-gis-202"
  },
  {
    id: "crs_igot_103",
    title: "Python for Large-Scale Data Pipeline & NSSO Microdata Analysis",
    provider: "iGOT Karmayogi / NIC Academy",
    code: "NIC-PY-305",
    competency: "Python",
    targetGap: 18,
    priority: "High",
    duration: "16 Hours • 6 Modules",
    level: "Intermediate",
    enrolled: true,
    progress: 30,
    rating: 4.7,
    enrolledCount: 2310,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    recommendationRationale: "Bridges Python scripting gap (18 pts) for automated ETL validation.",
    skillsCovered: ["Pandas DataFrames", "Data Wrangling", "Multiprocessing", "API Consumption"],
    url: "https://igotkarmayogi.gov.in/course/nic-py-305"
  },
  {
    id: "crs_igot_104",
    title: "Enterprise SQL & Data Warehousing for Government Databases",
    provider: "iGOT Karmayogi / MeitY",
    code: "MEITY-DB-104",
    competency: "SQL",
    targetGap: 15,
    priority: "High",
    duration: "12 Hours • 4 Modules",
    level: "Foundational to Intermediate",
    enrolled: false,
    progress: 0,
    rating: 4.8,
    enrolledCount: 3100,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600",
    recommendationRationale: "Recommended for data warehousing & query optimization gap.",
    skillsCovered: ["PostgreSQL", "Window Functions", "Index Optimization", "Complex Joins"],
    url: "https://igotkarmayogi.gov.in/course/meity-db-104"
  },
  {
    id: "crs_igot_105",
    title: "Official Data Visualization Standards & Interactive Dashboards",
    provider: "iGOT Karmayogi / MoSPI NSSTA",
    code: "NSSTA-DV-101",
    competency: "Data Visualization",
    targetGap: 7,
    priority: "Moderate",
    duration: "10 Hours • 4 Modules",
    level: "Intermediate",
    enrolled: true,
    progress: 100,
    rating: 4.9,
    enrolledCount: 4120,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
    recommendationRationale: "Polishes dashboard publishing and official reporting techniques.",
    skillsCovered: ["Chart Hierarchy", "Color Accessibility", "Tableau/PowerBI", "Export Formats"],
    url: "https://igotkarmayogi.gov.in/course/nssta-dv-101"
  }
];

export const learningPathSteps = [
  {
    stepNumber: 1,
    title: "AI/ML Foundational & Econometric Models",
    competency: "AI/ML",
    status: "In Progress",
    estimatedHours: 18,
    coursesCount: 2,
    completionPercentage: 25,
    recommendedRole: "Lead Data Analyst"
  },
  {
    stepNumber: 2,
    title: "Spatial Intelligence & GIS Mapping",
    competency: "GIS",
    status: "In Progress",
    estimatedHours: 14,
    coursesCount: 1,
    completionPercentage: 65,
    recommendedRole: "Lead Data Analyst"
  },
  {
    stepNumber: 3,
    title: "Automated Data Processing with Python & SQL",
    competency: "Python & SQL",
    status: "Upcoming",
    estimatedHours: 28,
    coursesCount: 2,
    completionPercentage: 15,
    recommendedRole: "Lead Data Analyst"
  },
  {
    stepNumber: 4,
    title: "Official Capstone Assessment & Verification",
    competency: "Cross-Domain",
    status: "Locked",
    estimatedHours: 4,
    coursesCount: 1,
    completionPercentage: 0,
    recommendedRole: "Lead Data Analyst"
  }
];

export function getDynamicLearningPath(weakAreas = [], role = "Senior Statistical Officer", competencyProfile = null) {
  if (!weakAreas || weakAreas.length === 0) {
    weakAreas = ["GIS & Spatial Sampling", "AI/ML", "Python & SQL"];
  }

  const steps = weakAreas.map((area, idx) => {
    const matchedCourse = courses.find(c =>
      c.competency.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(c.competency.toLowerCase()) ||
      c.title.toLowerCase().includes(area.toLowerCase().split(' ')[0])
    ) || courses[idx % courses.length];

    return {
      stepNumber: idx + 1,
      title: `${area} Mastery & Application`,
      competency: area,
      courseId: matchedCourse.id,
      courseCode: matchedCourse.code,
      courseTitle: matchedCourse.title,
      status: idx === 0 ? "In Progress" : idx === 1 ? "Up Next" : "Upcoming",
      estimatedHours: parseInt(matchedCourse.duration) || 12,
      coursesCount: 1,
      completionPercentage: idx === 0 ? 35 : 0,
      recommendedRole: role
    };
  });

  // Always append Capstone verification step
  steps.push({
    stepNumber: steps.length + 1,
    title: "Official Capstone Evaluation & Competency Re-indexing",
    competency: "Cross-Domain Verification",
    courseId: "capstone_eval",
    courseCode: "MOSPI-EVAL-501",
    courseTitle: "Cadre Capacity Verification Assessment",
    status: "Locked",
    estimatedHours: 4,
    coursesCount: 1,
    completionPercentage: 0,
    recommendedRole: role
  });

  return steps;
}

