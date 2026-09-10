export const diagnosticQuestionBank = {
  "Statistical Officer": {
    "Beginner": [
      {
        id: "so_b_1",
        questionText: "What is the primary objective of a Stratified Random Sampling design in official MoSPI household surveys?",
        options: [
          "To guarantee equal sample sizes across all districts regardless of population",
          "To reduce sampling variance by grouping population units into homogenous strata",
          "To eliminate non-sampling errors completely from microdata collection",
          "To replace field enumerators with automated phone interviews"
        ],
        correctAnswerIndex: 1,
        explanation: "Stratified sampling divides heterogeneous populations into homogeneous sub-groups (strata), significantly lowering standard error and improving estimate accuracy.",
        competency: "Survey Methodology"
      },
      {
        id: "so_b_2",
        questionText: "In official statistics, which central tendency metric is less sensitive to extreme outliers when evaluating household monthly per capita expenditure (MPCE)?",
        options: [
          "Arithmetic Mean",
          "Median",
          "Geometric Mean",
          "Weighted Variance"
        ],
        correctAnswerIndex: 1,
        explanation: "The median represents the 50th percentile and is robust against skewed high-income outliers in household survey distributions.",
        competency: "Data Literacy"
      },
      {
        id: "so_b_3",
        questionText: "What does CPI stand for in National Accounts and economic index calculation?",
        options: [
          "Central Product Indexation",
          "Consumer Price Index",
          "Capital Performance Indicator",
          "Commodity Parity Integration"
        ],
        correctAnswerIndex: 1,
        explanation: "Consumer Price Index (CPI) measures changes over time in the general level of prices of goods and services consumed by households.",
        competency: "Official Statistics"
      },
      {
        id: "so_b_4",
        questionText: "When working with tabular survey datasets in Python Pandas, which function is used to aggregate data by categories?",
        options: [
          "df.sort_values()",
          "df.groupby()",
          "df.head()",
          "df.merge()"
        ],
        correctAnswerIndex: 1,
        explanation: "df.groupby() splits data into groups based on specified criteria, allowing aggregate statistical calculations across sub-categories.",
        competency: "Python"
      },
      {
        id: "so_b_5",
        questionText: "Why is metadata verification essential before publishing public statistical microdata?",
        options: [
          "To prevent unauthorized data alteration and ensure standard variable definitions",
          "To increase file download speed on government web portals",
          "To compress raw CSV files into proprietary binary formats",
          "To automatically translate numerical fields into text strings"
        ],
        correctAnswerIndex: 0,
        explanation: "Standardized metadata ensures data lineage, dictionary accuracy, and consistency across national statistical reporting.",
        competency: "Data Quality"
      }
    ],
    "Intermediate": [
      {
        id: "so_i_1",
        questionText: "In National Accounts CPI aggregation, how does geometric mean weighting address item-substitution bias?",
        options: [
          "It assumes consumers maintain fixed expenditure shares when relative prices change.",
          "It forces arithmetic addition of price relative changes across all urban centres.",
          "It sets all weights equal to 1.0 regardless of base-year consumption expenditure.",
          "It completely ignores non-food items during seasonal spikes."
        ],
        correctAnswerIndex: 0,
        explanation: "Geometric weighting (Jevons formula) implicitly assumes a unitary elasticity of substitution, mitigating Laspeyres upward substitution bias.",
        competency: "Statistical Methods"
      },
      {
        id: "so_i_2",
        questionText: "Which spatial autocorrelation statistic is optimal for detecting local spatial clusters ('hot-spots') in district-level agricultural yield microdata?",
        options: [
          "Pearson's R Coefficient",
          "Anselin Local Moran's I (LISA)",
          "Simple Euclidean Distance",
          "Chi-Square Goodness-of-Fit"
        ],
        correctAnswerIndex: 1,
        explanation: "LISA measures spatial clustering at local unit levels, isolating high-high and low-low Spatial Lag anomalies.",
        competency: "GIS"
      },
      {
        id: "so_i_3",
        questionText: "When performing automated survey data imputation using Scikit-Learn, which estimator preserves complex non-linear relationships best?",
        options: [
          "SimpleImputer(strategy='mean')",
          "IterativeImputer with ExtraTreesRegressor",
          "SimpleImputer(strategy='most_frequent')",
          "StandardScaler()"
        ],
        correctAnswerIndex: 1,
        explanation: "IterativeImputer (MICE) with ExtraTrees models conditional feature distributions iteratively, capturing non-linear interactions.",
        competency: "AI/ML"
      },
      {
        id: "so_i_4",
        questionText: "In Horvitz-Thompson estimation for unequal probability sampling without replacement, what does π_i represent?",
        options: [
          "The mathematical constant 3.14159",
          "The inclusion probability of the i-th sampling unit",
          "The non-response rate of primary sampling units",
          "The standard error of the population total estimate"
        ],
        correctAnswerIndex: 1,
        explanation: "π_i denotes the first-order inclusion probability for unit i, weighting each unit by 1/π_i to yield an unbiased estimate.",
        competency: "Sampling Theory"
      },
      {
        id: "so_i_5",
        questionText: "When modeling macroeconomic time-series with non-stationary seasonal components, which transformation is applied first?",
        options: [
          "Min-Max Normalization",
          "Seasonal Differencing",
          "Principal Component Analysis",
          "One-Hot Encoding"
        ],
        correctAnswerIndex: 1,
        explanation: "Seasonal differencing (Y_t - Y_{t-s}) removes seasonal stochastic trends to achieve stationarity for SARIMA modeling.",
        competency: "Data Interpretation"
      }
    ],
    "Hard": [
      {
        id: "so_h_1",
        questionText: "In SARIMAX (p,d,q)(P,D,Q)_s forecasting for national monthly trade deficits, what does setting d=1, D=1 achieve?",
        options: [
          "Applies first-order non-seasonal and seasonal differencing to remove quadratic non-stationary trends.",
          "Forces all AR and MA coefficients to zero.",
          "Converts time-series data into spatial lattice points.",
          "Increases model variance linearly over multi-year horizons."
        ],
        correctAnswerIndex: 0,
        explanation: "d=1 removes linear trend non-stationarity while D=1 eliminates seasonal unit roots, producing a stationary series for AR/MA fitting.",
        competency: "AI/ML"
      },
      {
        id: "so_h_2",
        questionText: "When training a Gradient Boosted Tree model for NSSO anomaly detection where anomalous reports are < 0.5%, which metric should drive hyperparameter selection?",
        options: [
          "Overall Accuracy",
          "Precision-Recall AUC (PR-AUC)",
          "Mean Squared Error (MSE)",
          "R-Squared"
        ],
        correctAnswerIndex: 1,
        explanation: "PR-AUC evaluates true positive trade-offs specifically in heavily imbalanced distributions where standard accuracy gives misleading 99.5% scores.",
        competency: "AI/ML"
      },
      {
        id: "so_h_3",
        questionText: "Which spatial weight matrix design is most appropriate when modeling spatial contagion across non-contiguous coastal fishing jurisdictions?",
        options: [
          "First-order Queen Contiguity",
          "K-Nearest Neighbors (KNN) based on centroid distance",
          "Rook Contiguity only",
          "Identity Matrix"
        ],
        correctAnswerIndex: 1,
        explanation: "KNN distance-based weighting connects non-contiguous maritime boundaries based on geographical spatial proximity.",
        competency: "GIS"
      },
      {
        id: "so_h_4",
        questionText: "In small area estimation (SAE) for district-level poverty mapping, what is the primary purpose of Fay-Herriot model integration?",
        options: [
          "To combine direct survey estimates with auxiliary administrative data using empirical best linear unbiased prediction (EBLUP).",
          "To eliminate administrative data completely and rely solely on satellite imagery.",
          "To double the sample size of raw field surveys retroactively.",
          "To replace census counts with unweighted telephone surveys."
        ],
        correctAnswerIndex: 0,
        explanation: "The Fay-Herriot area-level model uses EBLUP to pool strength across administrative domains, reducing variance in small sample sizes.",
        competency: "Sampling Theory"
      },
      {
        id: "so_h_5",
        questionText: "When auditing automated synthetic data generation using Generative Adversarial Networks (GANs) for public microdata release, how is differential privacy (ε-privacy) guaranteed?",
        options: [
          "By adding calibrated Laplace noise to discriminator gradients during training.",
          "By deleting row indexes from output CSV files.",
          "By rounding numerical values to nearest integer multiples of 10.",
          "By restricting data access to encrypted USB drives."
        ],
        correctAnswerIndex: 0,
        explanation: "DP-GANs inject bounded Laplace/Gaussian noise into gradient calculations, bounding privacy budget ε against reconstruction attacks.",
        competency: "Data Quality"
      }
    ]
  },
  "Trainer / Training & Assessment Officer": {
    "Beginner": [
      {
        id: "tr_b_1",
        questionText: "When designing assessment items for statistical cadres, what defines effective distractor options in Multiple Choice Questions?",
        options: [
          "Distractors should be obviously absurd to save student test time.",
          "Distractors should reflect common conceptual misconceptions held by learners.",
          "Distractors must all contain exact numerical figures from official reports.",
          "Distractors should be grammatically incomplete sentences."
        ],
        correctAnswerIndex: 1,
        explanation: "Plausible distractors targeting common misinterpretations diagnose specific learning gaps accurately.",
        competency: "Assessment Design"
      },
      {
        id: "tr_b_2",
        questionText: "In iGOT Karmayogi curriculum design, what is the purpose of mapping courses to specific National Competencies?",
        options: [
          "To standardize skill credentials and enable targeted competency-gap remediation.",
          "To increase the total page count of training manuals.",
          "To limit course access to senior ministry directors only.",
          "To eliminate post-course practical evaluations."
        ],
        correctAnswerIndex: 0,
        explanation: "Competency mapping aligns learning modules with official job role prerequisites for measurable capacity building.",
        competency: "Curriculum Planning"
      },
      {
        id: "tr_b_3",
        questionText: "Which Bloom's Taxonomy cognitive level is evaluated when trainees interpret real survey tables to identify economic trends?",
        options: [
          "Remembering",
          "Analyzing",
          "Creating",
          "Copying"
        ],
        correctAnswerIndex: 1,
        explanation: "Analyzing involves breaking information into component parts and identifying patterns, relationships, or trends.",
        competency: "Pedagogical Design"
      },
      {
        id: "tr_b_4",
        questionText: "How should a Training Officer utilize pre-training diagnostic assessment results?",
        options: [
          "To fail low-scoring candidates before training begins",
          "To baseline initial competency and customize module difficulty according to gap areas",
          "To archive results without reviewing sub-domain scores",
          "To issue completion certificates immediately"
        ],
        correctAnswerIndex: 1,
        explanation: "Diagnostic baseline data enables adaptive learning paths tailored to identified weak areas.",
        competency: "Learning Analytics"
      },
      {
        id: "tr_b_5",
        questionText: "What is the recommended maximum duration for asynchronous micro-learning video modules?",
        options: [
          "60 to 90 minutes",
          "5 to 12 minutes",
          "4 hours continuous",
          "30 seconds"
        ],
        correctAnswerIndex: 1,
        explanation: "Micro-learning modules (5-12 minutes) optimize cognitive retention and reduce learner fatigue.",
        competency: "Pedagogical Design"
      }
    ],
    "Intermediate": [
      {
        id: "tr_i_1",
        questionText: "In Item Response Theory (IRT), what does the 'p-value' (item difficulty index) indicate?",
        options: [
          "The proportion of test-takers who answered the item correctly.",
          "The statistical p-value from a hypothesis t-test.",
          "The speed in seconds required to answer the question.",
          "The percentage of questions generated by AI."
        ],
        correctAnswerIndex: 0,
        explanation: "Item difficulty (p-value) is the fraction of total test-takers answering correctly; higher values indicate easier items.",
        competency: "Psychometrics"
      },
      {
        id: "tr_i_2",
        questionText: "When reviewing AI-generated MCQs extracted from statistical manuals, what validation step is mandatory before publishing?",
        options: [
          "Verifying factual correctness against official manual citations and checking rationale logic.",
          "Automatically approving all items with >90% AI confidence.",
          "Removing option explanations to shorten quiz length.",
          "Converting all MCQs into true/false statements."
        ],
        correctAnswerIndex: 0,
        explanation: "Human-in-the-loop expert review guarantees source alignment and eliminates AI hallucinated premises.",
        competency: "Quality Assurance"
      },
      {
        id: "tr_i_3",
        questionText: "What is Point-Biserial Correlation used for in item analysis of statistical assessments?",
        options: [
          "To measure how well an individual item discriminates high-performing learners from low-performing learners.",
          "To calculate total course completion rate across ministries.",
          "To estimate the server load during online examinations.",
          "To convert raw scores into letter grades."
        ],
        correctAnswerIndex: 0,
        explanation: "Point-biserial correlation correlates performance on a single item with overall test score to assess item discrimination power.",
        competency: "Psychometrics"
      },
      {
        id: "tr_i_4",
        questionText: "In statistical capacity building, how does formative evaluation differ from summative evaluation?",
        options: [
          "Formative happens during the learning process to guide improvement; summative evaluates final outcome mastery.",
          "Formative is used only for online tests; summative is paper-based.",
          "Formative awards official government promotions; summative is un-graded.",
          "There is no difference."
        ],
        correctAnswerIndex: 0,
        explanation: "Formative assessment provides ongoing feedback to adjust learning, while summative measures overall achievement at module end.",
        competency: "Evaluation Frameworks"
      },
      {
        id: "tr_i_5",
        questionText: "Which instructional strategy best reinforces Python data analysis skills for statistical officers?",
        options: [
          "Reading slide decks without execution",
          "Hands-on practical notebook labs using real MoSPI sample datasets",
          "Memorizing syntax definitions verbatim",
          "Watching multiple-choice answer reveals"
        ],
        correctAnswerIndex: 1,
        explanation: "Active lab practice using authentic domain data builds procedural memory and practical application capability.",
        competency: "Pedagogical Design"
      }
    ],
    "Hard": [
      {
        id: "tr_h_1",
        questionText: "In 3-Parameter Logistic (3PL) IRT modeling for national cadre certification exams, what parameter does 'c' represent?",
        options: [
          "Item Discrimination (slope)",
          "Item Difficulty (threshold)",
          "Pseudo-guessing parameter (lower asymptote)",
          "Test Duration Factor"
        ],
        correctAnswerIndex: 2,
        explanation: "In 3PL models, 'c' accounts for the probability of low-ability examinees answering correctly purely by guessing.",
        competency: "Psychometrics"
      },
      {
        id: "tr_h_2",
        questionText: "When establishing automated competency gap detection thresholds, how should standard setting (e.g. Angoff or Modified Angoff method) be applied?",
        options: [
          "Subject Matter Experts estimate the probability that a minimally competent candidate will answer each item correctly.",
          "Setting an arbitrary 50% cutoff mark for all subjects.",
          "Grading on a strict bell curve where top 10% pass regardless of score.",
          "Letting test-takers vote on passing criteria after the exam."
        ],
        correctAnswerIndex: 0,
        explanation: "Modified Angoff utilizes expert judgment on borderline candidate expectations to set criterion-referenced passing standards.",
        competency: "Assessment Design"
      },
      {
        id: "tr_h_3",
        questionText: "In AI-assisted assessment synthesis, how is RAG (Retrieval-Augmented Generation) constrained to prevent out-of-domain hallucinations?",
        options: [
          "By employing dense vector embeddings for chunk retrieval and strict prompt grounding with source citation requirements.",
          "By using open-ended creative writing prompts without context boundaries.",
          "By disabling temperature controls in the LLM sampling parameter.",
          "By increasing maximum output token limits to 8000."
        ],
        correctAnswerIndex: 0,
        explanation: "RAG restricts LLM generation to verified retrieved document chunks, enforcing source attribution and factual grounding.",
        competency: "Quality Assurance"
      },
      {
        id: "tr_h_4",
        questionText: "Which metric measures internal consistency reliability across multi-item competency evaluations?",
        options: [
          "Cronbach's Alpha (α)",
          "Root Mean Square Error (RMSE)",
          "Chi-Square Statistic",
          "Shannon Entropy"
        ],
        correctAnswerIndex: 0,
        explanation: "Cronbach's alpha measures inter-item correlation consistency; values ≥0.8 indicate strong scale reliability.",
        competency: "Learning Analytics"
      },
      {
        id: "tr_h_5",
        questionText: "How can longitudinal skill decay be mitigated in statistical cadre continuous learning programs?",
        options: [
          "By scheduling spaced-repetition micro-assessments and automated refresher triggers at 30-60-90 day intervals.",
          "By requiring officers to repeat full 40-hour introductory courses annually.",
          "By removing past assessment history from user profiles.",
          "By lowering passing thresholds every quarter."
        ],
        correctAnswerIndex: 0,
        explanation: "Spaced retrieval practice combats Ebbinghaus forgetting curves, maintaining operational readiness over time.",
        competency: "Curriculum Planning"
      }
    ]
  },
  "Administrator": {
    "Beginner": [
      {
        id: "ad_b_1",
        questionText: "What is the primary role of the Administrator in the StatIQ Intelligence System?",
        options: [
          "To manually write all course code line-by-line",
          "To oversee organization-wide competency analytics, workforce readiness, and strategic skill-gap visibility",
          "To conduct door-to-door survey data collection",
          "To manage physical office hardware inventory"
        ],
        correctAnswerIndex: 1,
        explanation: "Administrators utilize organizational intelligence dashboards to track ministry-wide skill distribution and direct training investments.",
        competency: "Workforce Governance"
      },
      {
        id: "ad_b_2",
        questionText: "In MoSPI cadre management, what does an 'Organizational Skill Gap' indicate?",
        options: [
          "The difference between required competency levels for cadre targets and current verified officer proficiencies",
          "The budget surplus remaining at fiscal year end",
          "The total number of unassigned office computers",
          "The length of time required to commute to headquarters"
        ],
        correctAnswerIndex: 0,
        explanation: "Skill gaps represent variance between required institutional competencies and actual officer readiness scores.",
        competency: "Cadre Planning"
      },
      {
        id: "ad_b_3",
        questionText: "Why is role-based access control (RBAC) enforced in the national statistical platform?",
        options: [
          "To ensure officers, trainers, and administrators access features appropriate to their administrative responsibilities",
          "To restrict internet access to government portals only",
          "To limit platform usage to 2 hours per day",
          "To prevent non-English users from logging in"
        ],
        correctAnswerIndex: 0,
        explanation: "RBAC ensures data security and presents tailored interfaces based on verified user roles.",
        competency: "Data Security"
      },
      {
        id: "ad_b_4",
        questionText: "Which dashboard view allows Administrators to identify high-priority training needs across regional offices?",
        options: [
          "Personal User Profile Page",
          "Organization Intelligence & Competency Audit Analytics",
          "Public News Feed",
          "Local Browser Storage Log"
        ],
        correctAnswerIndex: 1,
        explanation: "Organization Intelligence aggregates departmental competency distributions to highlight regional training priorities.",
        competency: "Analytics"
      },
      {
        id: "ad_b_5",
        questionText: "What is the goal of integrating iGOT Karmayogi with MoSPI statistical training frameworks?",
        options: [
          "To modernize civil service capacity building through standardized digital learning pathways",
          "To replace all human statistical officers with automated scripts",
          "To eliminate national census operations",
          "To standardize office email signatures"
        ],
        correctAnswerIndex: 0,
        explanation: "iGOT Karmayogi aligns national civil service continuous learning with official competency frameworks.",
        competency: "Policy Alignment"
      }
    ],
    "Intermediate": [
      {
        id: "ad_i_1",
        questionText: "When reviewing aggregate workforce readiness analytics (e.g. 74% readiness index), how should strategic intervention be prioritized?",
        options: [
          "Focus immediate training investments on critical single-point failure gaps in high-impact domains like AI/ML and GIS.",
          "Distribute training budgets equally across all domains regardless of gap severity.",
          "Mandate retaking basic literacy modules for senior directors only.",
          "Freeze all training programs until readiness reaches 100%."
        ],
        correctAnswerIndex: 0,
        explanation: "Data-driven governance targets critical vulnerabilities with high operational impact first.",
        competency: "Resource Allocation"
      },
      {
        id: "ad_i_2",
        questionText: "How does automated SSO (Single Sign-On) verification enhance statistical platform security?",
        options: [
          "It validates user identity against centralized government domain directories (@gov.in / @nic.in) preventing unauthorized access.",
          "It forces users to change passwords every 10 minutes.",
          "It disables data download functionality for all users.",
          "It encrypts internal office monitor screens."
        ],
        correctAnswerIndex: 0,
        explanation: "Centralized SSO integration verifies official credentials against government domain registries.",
        competency: "Data Security"
      },
      {
        id: "ad_i_3",
        questionText: "In institutional competency audits, what does 'Cadre Readiness Index' measure?",
        options: [
          "A weighted composite index aggregating officer skill proficiency scores against active role target benchmarks.",
          "The percentage of employees attending daily physical office roll call.",
          "The average speed of internet connections across state headquarters.",
          "The ratio of desktop computers to laptops in the ministry."
        ],
        correctAnswerIndex: 0,
        explanation: "The Readiness Index quantifies organizational capability relative to defined institutional benchmarks.",
        competency: "Analytics"
      },
      {
        id: "ad_i_4",
        questionText: "Which governance metric tracks the effectiveness of published training modules over time?",
        options: [
          "Pre-to-post assessment score gain and verified competency level progression",
          "Total number of file downloads per hour",
          "Color contrast ratio of module thumbnails",
          "Number of social media shares"
        ],
        correctAnswerIndex: 0,
        explanation: "Competency gain tracking measures actual learning efficacy and skill gap remediation.",
        competency: "Workforce Governance"
      },
      {
        id: "ad_i_5",
        questionText: "What protocol ensures compliance with National Data Sharing and Accessibility Policy (NDSAP)?",
        options: [
          "Anonymizing microdata, attaching standardized metadata, and implementing open API access controls for public statistics",
          "Restricting all statistical data to paper archives",
          "Deleting historical census records after 5 years",
          "Charging subscription fees for public data access"
        ],
        correctAnswerIndex: 0,
        explanation: "NDSAP promotes proactive release of non-sensitive government data with robust anonymization and metadata standards.",
        competency: "Policy Alignment"
      }
    ],
    "Hard": [
      {
        id: "ad_h_1",
        questionText: "When designing multi-year capacity building roadmaps for MoSPI, how should predictive analytics be utilized in cadre planning?",
        options: [
          "By forecasting upcoming technology transitions (e.g. Big Data, AI, Geospatial) and modeling projected competency gaps against retirement/recruitment pipelines.",
          "By assuming skill requirements will remain unchanged for 20 years.",
          "By replacing strategic planning with annual random course assignments.",
          "By budgeting solely based on previous year historical expenditure without gap analysis."
        ],
        correctAnswerIndex: 0,
        explanation: "Predictive skill modeling aligns future cadre capabilities with emerging statistical methodologies and technological demands.",
        competency: "Cadre Planning"
      },
      {
        id: "ad_h_2",
        questionText: "In enterprise statistical infrastructure, how is Zero Trust Architecture (ZTA) applied to sensitive microdata repos?",
        options: [
          "By enforcing explicit continuous authentication, least-privilege micro-segmentation, and end-to-end data encryption regardless of network location.",
          "By trusting all requests originating inside internal office Wi-Fi networks unconditionally.",
          "By storing sensitive microdata on public unencrypted cloud storage buckets.",
          "By using shared administrator passwords across departments."
        ],
        correctAnswerIndex: 0,
        explanation: "Zero Trust assumes no implicit trust, verifying identity, context, and permissions continuously for every data request.",
        competency: "Data Security"
      },
      {
        id: "ad_h_3",
        questionText: "What mechanism measures the ROI (Return on Investment) of digital learning initiatives in government statistical bodies?",
        options: [
          "Tracking reduction in survey data error rates, acceleration of national account publication timelines, and measurable officer proficiency gains.",
          "Calculating total hours spent logged into the portal regardless of activity.",
          "Counting total course enrollment clicks without completion tracking.",
          "Comparing software license costs against printing paper manuals."
        ],
        correctAnswerIndex: 0,
        explanation: "Impact evaluation links learning outcomes to tangible operational improvements in data quality and publishing efficiency.",
        competency: "Resource Allocation"
      },
      {
        id: "ad_h_4",
        questionText: "How should an Administrator handle cross-departmental competency disparities (e.g., National Accounts at 85% vs Field Operations at 55%)?",
        options: [
          "Deploy targeted mobile training units, specialized field micro-modules, and peer mentorship programs between high and low proficiency divisions.",
          "Ignore field operations and allocate all resources to National Accounts.",
          "Re-assign low-proficiency officers to administrative filing duties.",
          "Lower competency target benchmarks for Field Operations to artificially boost metrics."
        ],
        correctAnswerIndex: 0,
        explanation: "Targeted cross-functional intervention balances institutional capability across operational units without compromising standards.",
        competency: "Workforce Governance"
      },
      {
        id: "ad_h_5",
        questionText: "Which governance framework ensures ethical usage of AI/ML models in official national statistics production?",
        options: [
          "Enforcing model explainability (XAI), algorithmic bias auditing, human-in-the-loop validation, and transparent methodology documentation.",
          "Allowing black-box proprietary algorithms to produce official GDP figures without audit trails.",
          "Outsourcing all national statistical modeling to external unverified vendors.",
          "Banning AI models completely from official statistics."
        ],
        correctAnswerIndex: 0,
        explanation: "Ethical AI governance guarantees transparency, auditability, and trust in AI-derived official statistical outputs.",
        competency: "Policy Alignment"
      }
    ]
  }
};

export function getDiagnosticQuestions(role, level) {
  let roleKey = "Statistical Officer";
  if (role === "Training Officers" || role === "Trainer / Training & Assessment Officer") {
    roleKey = "Trainer / Training & Assessment Officer";
  } else if (role === "Department Administrators / HR Officers" || role === "Administrator") {
    roleKey = "Administrator";
  } else if (role === "Monitoring & Evaluation (M&E) Officers") {
    roleKey = "Trainer / Training & Assessment Officer";
  }
  
  const roleBank = diagnosticQuestionBank[roleKey] || diagnosticQuestionBank["Statistical Officer"];
  const questions = roleBank[level] || roleBank["Intermediate"] || roleBank["Beginner"];
  return questions;
}
