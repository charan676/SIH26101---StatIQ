export const competencyDomains = [
  { id: "dom_1", name: "Core Statistical Methods", icon: "Calculator" },
  { id: "dom_2", name: "Data Science & Computing", icon: "Code" },
  { id: "dom_3", name: "Field & Survey Engineering", icon: "ClipboardCheck" },
  { id: "dom_4", name: "Geospatial & Advanced AI", icon: "Cpu" },
];

export const competencies = [
  {
    id: "comp_1",
    name: "Data Literacy",
    domain: "Core Statistical Methods",
    current: 88,
    required: 85,
    gap: 0,
    priority: "Strong",
    status: "Proficient",
    description: "Ability to read, analyze, interpret, and communicate data as contextual information.",
    lastAssessed: "2026-08-15"
  },
  {
    id: "comp_2",
    name: "Statistical Methods",
    domain: "Core Statistical Methods",
    current: 82,
    required: 80,
    gap: 0,
    priority: "Strong",
    status: "Proficient",
    description: "Sampling design, hypothesis testing, variance estimation, and econometric modeling.",
    lastAssessed: "2026-08-10"
  },
  {
    id: "comp_3",
    name: "Data Visualization",
    domain: "Core Statistical Methods",
    current: 78,
    required: 85,
    gap: 7,
    priority: "Moderate",
    status: "Developing",
    description: "Creating insightful official dashboards, charts, and public statistical publications.",
    lastAssessed: "2026-08-20"
  },
  {
    id: "comp_4",
    name: "Survey Methodology",
    domain: "Field & Survey Engineering",
    current: 85,
    required: 90,
    gap: 5,
    priority: "Moderate",
    status: "Proficient",
    description: "Designing NSSO sample frames, questionnaire design, field auditing, and non-response adjustment.",
    lastAssessed: "2026-07-28"
  },
  {
    id: "comp_5",
    name: "Statistical Software",
    domain: "Data Science & Computing",
    current: 74,
    required: 80,
    gap: 6,
    priority: "Moderate",
    status: "Developing",
    description: "Proficiency in R, SPSS, STATA, and official MoSPI computation tools.",
    lastAssessed: "2026-08-01"
  },
  {
    id: "comp_6",
    name: "Python",
    domain: "Data Science & Computing",
    current: 62,
    required: 80,
    gap: 18,
    priority: "High",
    status: "Developing",
    description: "Pandas, NumPy, automated ETL data processing, and statistical scripting.",
    lastAssessed: "2026-08-25"
  },
  {
    id: "comp_7",
    name: "SQL",
    domain: "Data Science & Computing",
    current: 70,
    required: 85,
    gap: 15,
    priority: "High",
    status: "Developing",
    description: "Relational database querying, aggregation, join optimization, and data warehousing.",
    lastAssessed: "2026-08-18"
  },
  {
    id: "comp_8",
    name: "GIS",
    domain: "Geospatial & Advanced AI",
    current: 55,
    required: 75,
    gap: 20,
    priority: "High",
    status: "Needs Action",
    description: "Geographic Information Systems, spatial data analysis, and census mapping.",
    lastAssessed: "2026-08-12"
  },
  {
    id: "comp_9",
    name: "AI/ML",
    domain: "Geospatial & Advanced AI",
    current: 42,
    required: 75,
    gap: 33,
    priority: "Critical",
    status: "Critical Gap",
    description: "Machine Learning models, predictive forecasting, automated anomaly detection in national data.",
    lastAssessed: "2026-09-01"
  }
];

export const overallReadinessScore = {
  score: 74,
  targetScore: 82,
  readinessPercentage: 90.2,
  strongCount: 2,
  moderateCount: 3,
  highCount: 3,
  criticalCount: 1,
};
