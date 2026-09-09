export const assessments = [
  {
    id: "asm_diag_01",
    title: "MoSPI Official Diagnostic Competency Assessment 2026",
    type: "Diagnostic",
    category: "Full Cadre Diagnostic",
    durationMinutes: 20,
    totalQuestions: 10,
    competenciesCovered: ["Data Literacy", "Statistical Methods", "Python", "SQL", "GIS", "AI/ML"],
    status: "Completed",
    scorePercent: 74,
    passed: true,
    takenAt: "2026-08-15",
    description: "Comprehensive 10-question evaluation mapping to official statistical cadre competencies."
  },
  {
    id: "asm_aiml_02",
    title: "AI/ML Competency Gap Remediation Quiz",
    type: "Gap Remediation",
    category: "Geospatial & Advanced AI",
    durationMinutes: 15,
    totalQuestions: 8,
    competenciesCovered: ["AI/ML", "Python"],
    status: "Available",
    scorePercent: null,
    passed: false,
    takenAt: null,
    description: "Evaluates machine learning concepts, supervised classification, and statistical anomaly detection."
  },
  {
    id: "asm_gis_03",
    title: "Geospatial Sampling & Spatial Grid Audit Quiz",
    type: "Topic Evaluation",
    category: "Field & Spatial Intelligence",
    durationMinutes: 15,
    totalQuestions: 6,
    competenciesCovered: ["GIS", "Survey Methodology"],
    status: "Available",
    scorePercent: null,
    passed: false,
    takenAt: null,
    description: "Assesses knowledge of GIS boundary layers, coordinate systems, and remote sensing imagery integration."
  }
];
