# StatIQ Google Stitch Implementation Map

This document establishes the authoritative mapping between the **Google Stitch UI/UX Design Reference** and the **StatIQ React Frontend Prototype**.

---

## Screen to Route & Component Mapping Matrix

| Stage | Screen Name | Route Path | Primary Component File | Primary Mock Data | Key Interactions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage A** | **Employee Dashboard** | `/dashboard` | [Dashboard.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Dashboard.jsx) | `userData.js`, `competencyData.js`, `courseData.js` | Readiness Score ring, Competency Radar hover, Skill Gap range comparison, Course navigation |
| **Stage B** | **My Competencies** | `/competencies` | [Competencies.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Competencies.jsx) | `competencyData.js` | Domain filter, competency card selection, detail modal view |
| **Stage B** | **Skill Gap Analysis** | `/skill-gaps` | [SkillGaps.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/SkillGaps.jsx) | `competencyData.js` | Priority filter (All, Critical, High, Moderate), gap detail drawer, link to learning path |
| **Stage C** | **Personalized Learning Path** | `/learning-path` | [LearningPathPage.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/LearningPathPage.jsx) | `courseData.js` | Sequential step timeline (Gap → Course → Assessment → Improvement), step completion toggle |
| **Stage C** | **iGOT Course Catalog** | `/courses` | [Courses.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Courses.jsx) | `courseData.js` | Category/Competency filter, search bar, enrollment trigger |
| **Stage C** | **My Learning Enrolled** | `/my-learning` | [MyLearning.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/MyLearning.jsx) | `courseData.js`, `userData.js` | Active vs completed tabs, progress resume, assessment trigger |
| **Stage D** | **Diagnostic Assessment** | `/assessment` | [Assessments.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Assessments.jsx) | `quizData.js` | Interactive 4-option MCQ runner, state preservation, submit score calculation |
| **Stage D** | **Knowledge Assessment Hub** | `/assessments` | [Assessments.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Assessments.jsx) | `quizData.js` | Assessment card grid, difficulty filter, launch quiz runner |
| **Stage D** | **Interactive Quiz Engine** | `/quiz/:id` | [QuizRunner.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/QuizRunner.jsx) | `quizData.js` | Question pagination, option selection state, timer, deterministic result calculation |
| **Stage D** | **Quiz Result Breakdown** | `/quiz/:id/result` | [QuizResultPage.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/QuizResultPage.jsx) | Local quiz execution state | Before vs After competency score comparison, reduced gap index calculation, CTA to Learning Path |
| **Stage E** | **AI Assessment Studio** | `/ai-assessment` | [AIAssessment.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/AIAssessment.jsx) | `trainerData.js` | Document Drag & Drop (PDF/TXT), 6-stage AI pipeline animation, generated MCQ review |
| **Stage E** | **Trainer Quiz Review** | `/quiz-review` | [QuizReview.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/QuizReview.jsx) | `trainerData.js` | Inline question edit, option editor, AI confidence view, approve/reject/publish actions |
| **Stage F** | **Organization Intelligence** | `/admin` | [AdminDashboard.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/AdminDashboard.jsx) | `adminData.js` | Workforce readiness metrics, MoSPI department gap heatmap, training completion chart |
| **Stage F** | **MoSPI Official Profile** | `/profile` | [Profile.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Profile.jsx) | `userData.js` | Designation details, qualifications, active role target selector, history timeline |
| **Stage F** | **Government SSO Gateway** | `/login` | [Login.jsx](file:///c:/Users/user/.gemini/antigravity-ide/scratch/sih26101-prototype/src/pages/Login.jsx) | Local state | SSO authentication simulation, email validation (`*.gov.in`), redirect to `/dashboard` |

---

## Consistent Mock User Identity (Arjun Sharma)

- **Name**: Arjun Sharma
- **Designation**: Senior Statistical Officer
- **Department**: National Accounts Division, Ministry of Statistics & Programme Implementation
- **Current Readiness Index**: 74%
- **Required Position Target**: 82%
- **Gap Index**: -8.0%
- **Competency Baseline Scores**:
  - Data Literacy: 78 / 80
  - Statistical Methods: 72 / 85
  - Data Visualization: 70 / 75
  - Survey Methodology: 68 / 80
  - Statistical Software: 65 / 75
  - Python: 62 / 80
  - SQL: 70 / 85
  - GIS: 55 / 75 (High Gap: -20 pts)
  - AI / ML: 42 / 75 (Critical Gap: -33 pts)
