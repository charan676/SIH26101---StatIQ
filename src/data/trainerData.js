export const initialGeneratedQuestions = [
  {
    id: "gen_q1",
    questionText: "In National Accounts CPI calculation, what is the primary purpose of applying geometric mean weighting across regional price indices?",
    options: [
      "To eliminate sample variance across rural areas",
      "To minimize substitution bias in price index aggregation",
      "To convert nominal GDP to real GDP directly",
      "To calculate standard deviation for survey weights"
    ],
    correctAnswerIndex: 1,
    explanation: "Geometric mean weighting accounts for consumer elasticity and substitution behavior across price movements, mitigating index upward bias.",
    competency: "Statistical Methods",
    difficulty: "Intermediate",
    aiConfidence: 96,
    sourceReference: "MoSPI National Accounts Manual 2026 — Chapter 4, Page 112",
    status: "AI Generated"
  },
  {
    id: "gen_q2",
    questionText: "Which spatial autocorrelation measure is most effective for identifying hot-spots in NSSO district-level agricultural yield data?",
    options: [
      "Pearson Correlation Matrix",
      "Anselin Local Moran's I (LISA)",
      "Standard Normal Distribution Score",
      "Euclidean Distance Clustering"
    ],
    correctAnswerIndex: 1,
    explanation: "LISA measures spatial clustering strength at individual district levels, isolating high-high and low-low clusters.",
    competency: "GIS",
    difficulty: "Advanced",
    aiConfidence: 94,
    sourceReference: "ISRO-IIRS Survey GIS Handbook — Section 3.2, Page 45",
    status: "AI Generated"
  },
  {
    id: "gen_q3",
    questionText: "When executing automated data imputation on missing survey income records using Scikit-Learn, which estimator preserves non-linear feature relationships best?",
    options: [
      "SimpleImputer with strategy='mean'",
      "IterativeImputer (MICE) with ExtraTreesRegressor",
      "SimpleImputer with strategy='median'",
      "StandardScaler transformation"
    ],
    correctAnswerIndex: 1,
    explanation: "IterativeImputer with ExtraTrees models feature interactions conditionally, handling non-linear household survey microdata.",
    competency: "AI/ML",
    difficulty: "Intermediate",
    aiConfidence: 91,
    sourceReference: "Advanced Machine Learning for Statistical Audit — Page 88",
    status: "AI Generated"
  }
];
