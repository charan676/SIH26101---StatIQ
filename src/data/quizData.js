export const sampleQuiz = {
  id: "quiz_aiml_2026",
  title: "AI/ML & Econometric Statistical Intelligence Quiz",
  description: "Assessment on Machine Learning models for official statistical forecasting and anomaly detection.",
  durationMinutes: 15,
  competencyDomain: "AI/ML",
  questions: [
    {
      id: "q1",
      questionText: "In time-series econometric modeling of National Accounts CPI data, which algorithm is best suited for non-linear trend forecasting when seasonal variance is non-stationary?",
      options: [
        "Simple Ordinary Least Squares (OLS) Regression",
        "SARIMAX with exogenous macroeconomic indicators",
        "K-Means Unsupervised Clustering",
        "Single Exponential Smoothing without trend adjustment"
      ],
      correctAnswerIndex: 1,
      explanation: "SARIMAX allows seasonal autoregressive integrated moving averages while incorporating exogenous variables like inflation indexes and commodity price fluctuations.",
      competency: "AI/ML",
      difficulty: "Intermediate"
    },
    {
      id: "q2",
      questionText: "When addressing missing values in large-scale sample survey microdata (NSSO), what is the key advantage of KNN Imputation over simple Mean Imputation?",
      options: [
        "KNN reduces computational execution time to zero.",
        "KNN preserves spatial and demographic correlation structures across correlated attributes.",
        "KNN guarantees mean invariance across unequal sample weights.",
        "KNN converts categorical variables into numerical floats automatically."
      ],
      correctAnswerIndex: 1,
      explanation: "K-Nearest Neighbors imputation estimates missing values based on feature proximity, preserving multi-attribute correlation structures without distorting regional variances.",
      competency: "AI/ML",
      difficulty: "Advanced"
    },
    {
      id: "q3",
      questionText: "Which statistical metric should be prioritized over Accuracy when auditing an AI model designed to detect fraudulent census reporting anomalies where positive cases represent < 1% of total data?",
      options: [
        "R-Squared (R²)",
        "Precision-Recall AUC (PR-AUC) or F1-Score",
        "Mean Absolute Error (MAE)",
        "Pearson Correlation Coefficient"
      ],
      correctAnswerIndex: 1,
      explanation: "In highly imbalanced datasets (<1% positive class), standard accuracy gives misleading high scores (99% baseline). PR-AUC or F1-Score correctly measures minority anomaly detection.",
      competency: "AI/ML",
      difficulty: "Advanced"
    },
    {
      id: "q4",
      questionText: "In Python data science workflows for MoSPI, which Pandas operation efficiently performs grouped variance aggregation on multi-gigabyte survey datasets?",
      options: [
        "Looping over rows using iterrows()",
        "df.groupby('district_code')['income'].agg(['mean', 'var', 'std']) using vectorized operations",
        "Exporting to CSV and reading line-by-line",
        "Applying a custom Python lambda function row by row"
      ],
      correctAnswerIndex: 1,
      explanation: "Vectorized groupby.agg() executes in compiled C C-extensions, executing several orders of magnitude faster than Python row iteration.",
      competency: "Python",
      difficulty: "Intermediate"
    }
  ]
};
