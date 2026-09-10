# StatIQ Hackathon Pitch Deck, Presentation Script & Demo Guide (SIH26101)

## Executive Summary
**StatIQ** is a specialized AI-enabled Skill Intelligence & Capacity-Building Platform tailored for the **Ministry of Statistics & Programme Implementation (MoSPI)** and India's Official Statistical System.

---

## 1. Hackathon Pitch Deck Outline (Slide-by-Slide)

### Slide 1: Title & Vision
- **Title**: StatIQ — Next-Gen AI Skill Intelligence & Capacity-Building Platform for MoSPI
- **Problem Statement**: SIH26101 (MoSPI)
- **Tagline**: Bridge Statistical Skill Gaps • Personalize iGOT Pathways • Audit Cadre Readiness in Real Time

### Slide 2: The Core Challenge
- Heterogeneous workforce spanning 18 distinct official job roles (Statistical Officers, Field Investigators, Data Analysts, M&E Officers).
- Lack of deterministic, real-time skill gap measurement between current proficiency and target cadre requirements.
- Manual question creation for e-learning assessments takes weeks and lacks source traceability.

### Slide 3: The StatIQ Solution
- **Deterministic Gap Engine**: Mathematically computes max(0, required - current) across 9 statistical domains.
- **Diagnostic Baseline**: Tailors diagnostic evaluations by job role and competency level (Beginner/Intermediate/Hard).
- **Trainer AI Studio**: Drag-and-drop PDF/TXT parsing with 6-stage Gemini LLM MCQ synthesis & page section citations.
- **iGOT Integration**: Dynamic personalized learning pathway matching official MoSPI capacity targets.

### Slide 4: End-to-End User Experience Architecture
1. **Gov SSO Gateway**: Validates @gov.in and @nic.in credentials.
2. **Diagnostic Evaluation**: Establishes initial competency baseline score.
3. **Personalized iGOT Pathway**: Recommends targeted capacity-building modules.
4. **Knowledge Assessment Hub**: Recalculates competency proficiency in real time (+points gained).
5. **Trainer Quality Control**: Inline MCQ editing, approval, and 1-click publishing.
6. **MoSPI Admin Dashboard**: Departmental gap heatmaps and PDF executive report exports.

### Slide 5: Tech Stack & Reliability
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: FastAPI, SQLAlchemy, SQLite Database, Pydantic Schemas.
- **AI/ML Engine**: Gemini LLM API, pdfjs-dist text extraction.

---

## 2. 3-Minute Hackathon Pitch Script (Word-for-Word)

> **[0:00 - 0:30] Introduction & Problem**  
> "Good morning Judges. India's Ministry of Statistics & Programme Implementation relies on thousands of statistical officers across 18 distinct cadres. However, identifying exactly where an official has a skill gap—whether in AI modeling, spatial GIS, or NSSO survey methodology—has historically been static and unquantified. Today, we present **StatIQ**."

> **[0:30 - 1:15] Learner Journey & Diagnostic Engine**  
> "When an official logs in through our Government SSO gateway with their official `@gov.in` email, StatIQ dynamically loads their cadre profile. The officer undergoes a role-tailored Diagnostic Evaluation. In real time, our deterministic engine calculates their readiness index and maps their baseline scores across 9 core statistical competencies. If a gap is identified in GIS or AI/ML, StatIQ automatically constructs a personalized iGOT Karmayogi learning path with direct module enrollment."

> **[1:15 - 2:00] Trainer AI Studio & Publishing**  
> "For MoSPI trainers, creating high-quality assessments used to take weeks. With our **StatIQ AI Assessment Studio**, trainers simply drag and drop official MoSPI statistical manuals in PDF or TXT format. Our 6-stage pipeline extracts key statistical concepts, synthesizes grounded MCQs with exact page citations, and rates AI confidence. Trainers can edit options, approve questions, and publish quizzes directly into the Learner Assessment Hub with a single click."

> **[2:00 - 2:45] Knowledge Assessment & Admin Intelligence**  
> "As learners complete domain quizzes, StatIQ automatically recalculates their competency scores in real time—adding proficiency points and shrinking skill gaps. On the MoSPI Admin Intelligence Dashboard, leadership gets a bird's-eye view of division-wide gap heatmaps across National Accounts, FOD, and Economic Statistics, with one-click PDF report generation."

> **[2:45 - 3:00] Conclusion**  
> "StatIQ transforms capacity building from static training into a dynamic, data-driven intelligence loop for India's statistical infrastructure. Thank you!"

---

## 3. Demo Flow Checklist & Backup Recording Guide

- **Step 1**: Open `/login` → Select *Senior Statistical Officer*, *Intermediate Level*, enter `arjun.sharma@mospi.gov.in`.
- **Step 2**: Take Diagnostic Assessment (`/assessment`) → Submit and review score accuracy & identified weak areas.
- **Step 3**: Click *Continue to Dashboard* → Inspect Readiness Ring and Critical Skill Gaps.
- **Step 4**: Open *Personalized Learning Path* (`/learning-path`) → Click *Enroll Course* on matched milestone.
- **Step 5**: Launch *Knowledge Assessment Hub* (`/assessments`) → Complete GIS (`/quiz/quiz_gis_202`) or Python quiz → View *Competency Score Recalculation* (+16 pts).
- **Step 6**: Open *AI Assessment Studio* (`/ai-assessment`) → Click *Demo Quick Upload PDF* → Watch 6-stage AI pipeline complete → Review page citations (`Page 14, Section 2.3`).
- **Step 7**: Open *Trainer Validation Studio* (`/quiz-review`) → Click *Publish Quiz to Learners*.
- **Step 8**: Open *MoSPI Admin Dashboard* (`/admin`) → Filter divisions (*National Accounts*, *FOD*) → Click *Export Cadre Report (PDF)*.
