export const sampleQuiz = {
  id: "quiz_stat_101",
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

export const gisQuiz = {
  id: "quiz_gis_202",
  title: "Geospatial Data & GIS Sample Framing Assessment",
  description: "Spatial autocorrelation, boundary digitization, QGIS, and census sampling frame verification.",
  durationMinutes: 20,
  competencyDomain: "GIS",
  questions: [
    {
      id: "gis_q1",
      questionText: "In GIS census mapping, what does Moran's I metric measure when analyzing regional agricultural yield distribution across district boundaries?",
      options: [
        "Linear regression slope between crop yield and fertilizer usage",
        "Spatial autocorrelation indicating spatial clustering or dispersion",
        "Database query execution latency",
        "Total perimeter length of administrative shapefiles"
      ],
      correctAnswerIndex: 1,
      explanation: "Moran's I quantifies spatial autocorrelation: positive values indicate spatial clustering of similar values, while negative values indicate spatial dispersion.",
      competency: "GIS & Spatial Sampling",
      difficulty: "Intermediate"
    },
    {
      id: "gis_q2",
      questionText: "Which Coordinate Reference System (CRS) is standard for calculating accurate geodesic area measurements across India in QGIS?",
      options: [
        "WGS 84 / UTM Zone 43N (EPSG:32643)",
        "Web Mercator (EPSG:3857)",
        "Unprojected Lat/Long degrees",
        "Polar Stereographic"
      ],
      correctAnswerIndex: 0,
      explanation: "UTM projection (EPSG:32643) provides conformality and minimal area distortion for distance and polygon area calculations in official Indian surveys.",
      competency: "GIS & Spatial Sampling",
      difficulty: "Intermediate"
    },
    {
      id: "gis_q3",
      questionText: "When digitizing rural enumeration blocks in GeoPandas, which spatial join operation correctly overlays village household points onto electoral boundary polygons?",
      options: [
        "gpd.sjoin(households_gdf, boundaries_gdf, how='inner', predicate='intersects')",
        "boundaries_gdf.merge(households_gdf, on='id')",
        "households_gdf.dropna()",
        "gpd.overlay(households_gdf, boundaries_gdf, how='difference')"
      ],
      correctAnswerIndex: 0,
      explanation: "Spatial join using `predicate='intersects'` evaluates geometric spatial point-in-polygon inclusion.",
      competency: "GIS & Spatial Sampling",
      difficulty: "Advanced"
    },
    {
      id: "gis_q4",
      questionText: "Why is stratified spatial sampling preferred over simple random sampling when building NSSO urban frame survey clusters?",
      options: [
        "It eliminates the need for field survey enumerators.",
        "It ensures representation across diverse socio-economic spatial strata and reduces sampling error.",
        "It guarantees 100% census enumeration.",
        "It reduces database memory usage."
      ],
      correctAnswerIndex: 1,
      explanation: "Stratified spatial sampling guarantees that heterogeneous geographic zones are proportionally sampled, lowering design effect and variance.",
      competency: "GIS & Spatial Sampling",
      difficulty: "Intermediate"
    }
  ]
};

export const pythonQuiz = {
  id: "quiz_py_305",
  title: "Python Data Pipelines & NSSO Microdata Scripting",
  description: "Pandas DataFrame operations, automated ETL processing, and survey data aggregation audit.",
  durationMinutes: 15,
  competencyDomain: "Python",
  questions: [
    {
      id: "py_q1",
      questionText: "Which Pandas method is recommended for merging two multi-million row survey datasets on composite keys ('state_code', 'district_code', 'block_id')?",
      options: [
        "df1.append(df2)",
        "pd.merge(df1, df2, on=['state_code', 'district_code', 'block_id'], how='inner')",
        "df1.to_csv('temp.csv')",
        "df1.concat([df2], axis=1)"
      ],
      correctAnswerIndex: 1,
      explanation: "pd.merge on composite key arrays performs hash-join lookups optimized in memory.",
      competency: "Python",
      difficulty: "Intermediate"
    },
    {
      id: "py_q2",
      questionText: "In Python ETL data pipelines, what is the advantage of saving processed NSSO survey microdata in Apache Parquet format over standard CSV files?",
      options: [
        "Parquet files can be read using Microsoft Notepad.",
        "Parquet provides columnar storage, binary compression, and fast partial column reading.",
        "Parquet removes all numerical floating point precision.",
        "Parquet files automatically fix missing survey responses."
      ],
      correctAnswerIndex: 1,
      explanation: "Columnar Parquet storage dramatically speeds up aggregations by loading only requested columns into RAM with up to 80% compression.",
      competency: "Python",
      difficulty: "Intermediate"
    },
    {
      id: "py_q3",
      questionText: "When validating survey data ranges (e.g. age between 0 and 120), which vectorized Pandas boolean mask expression correctly filters invalid records?",
      options: [
        "invalid = df[(df['age'] < 0) | (df['age'] > 120)]",
        "invalid = df[df['age'] < 0 and df['age'] > 120]",
        "invalid = df['age'].filter(0, 120)",
        "invalid = df.sort_values('age')"
      ],
      correctAnswerIndex: 0,
      explanation: "Bitwise OR `|` evaluates element-wise boolean masks across Pandas Series vectors.",
      competency: "Python",
      difficulty: "Foundational"
    },
    {
      id: "py_q4",
      questionText: "In PySpark distributed data processing for national economic census data, what is a key reason to execute .cache() on a filtered DataFrame?",
      options: [
        "To save the DataFrame to a local text file.",
        "To persist intermediate transformation results in memory across multiple downstream analytical queries.",
        "To terminate the Spark cluster connection.",
        "To convert PySpark data into Python dictionary objects."
      ],
      correctAnswerIndex: 1,
      explanation: "Caching stores evaluated RDD partitions in cluster memory, avoiding recomputation during subsequent aggregation steps.",
      competency: "Python",
      difficulty: "Advanced"
    }
  ]
};

export function getQuizById(quizId, publishedQuizzes = []) {
  if (quizId === "quiz_gis_202") return gisQuiz;
  if (quizId === "quiz_py_305") return pythonQuiz;

  // Check published quizzes from trainer context
  const foundPublished = publishedQuizzes.find(q => q.id === quizId);
  if (foundPublished) {
    return {
      id: foundPublished.id,
      title: foundPublished.title,
      description: foundPublished.description,
      durationMinutes: foundPublished.durationMinutes || 15,
      competencyDomain: foundPublished.category || "AI/ML",
      questions: sampleQuiz.questions
    };
  }

  return sampleQuiz;
}

