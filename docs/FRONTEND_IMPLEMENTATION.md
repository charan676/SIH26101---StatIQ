# StatIQ Frontend Implementation & Architecture Document

## Overview

**StatIQ** (Problem Statement SIH26101) is a specialized AI-enabled skill intelligence and capacity-building platform tailored for the **Ministry of Statistics & Programme Implementation (MoSPI)** and India's Official Statistical System.

This document serves as the visual source of truth, design system baseline, and component roadmap for the Phase 1 frontend implementation.

---

## 1. Existing Frontend Structure & Context

- **Prototype Context**: Fresh, standalone frontend prototype built with React 18, Vite, Tailwind CSS, Lucide React, and Recharts.
- **Design Philosophy**: Government-grade statistical trust combined with modern neural AI aesthetics—avoiding generic SaaS admin templates or ordinary LMS layouts.
- **Root Directory**: `C:\Users\user\.gemini\antigravity-ide\scratch\sih26101-prototype`

---

## 2. StatIQ Design System Baseline

### Visual Tokens

| Token Category | TailWind Class / Value | Purpose / Usage |
| :--- | :--- | :--- |
| **Primary Background** | `bg-stat-bg-primary` (`#07090E`) | Base background for entire app canvas |
| **Elevated Surface** | `bg-stat-bg-elevated` (`#12182B`) | Sidebars, modals, hover elevated states |
| **Card Surface** | `bg-stat-bg-card` (`#0F172A`) | Primary card containers with subtle border |
| **Secondary Surface** | `bg-stat-bg-secondary` (`#1A233A`) | Table headers, muted panels, sub-cards |
| **Cyan Accent** | `text-stat-cyan` (`#06B6D4` / `#22D3EE`) | Intelligence status, AI indicators, active states |
| **Blue Accent** | `text-stat-blue` (`#3B82F6` / `#60A5FA`) | Primary action buttons, user metrics |
| **Teal Accent** | `text-stat-teal` (`#14B8A6` / `#2DD4BF`) | Skill gap progress, recommendation paths |

### Competency & Priority Tokens

- **Strong**: `#10B981` (Emerald) - Score ≥ 80 or Gap 0-9
- **Moderate**: `#F59E0B` (Amber) - Score 60-79 or Gap 10-24
- **High Target**: `#6366F1` (Indigo) - Targeted mastery level
- **Critical**: `#EF4444` (Red) - Score < 60 or Gap ≥ 25 (High Priority)

### Grid & Atmospheric Glow Effects
- **Statistical Grid Overlay**: `bg-stat-grid-pattern` (1px radial grid)
- **Glassmorphic Borders**: `border border-stat-border-subtle` (`rgba(255,255,255,0.08)`)
- **Glow Shadow**: `shadow-stat-glow-cyan` (`0 0 20px -3px rgba(6, 182, 212, 0.35)`)

---

## 3. Component Architecture & Reusability Taxonomy

The component library is organized into 5 primary domains:

```
src/components/
├── common/             # Atomic & Layout Utilities
├── competency/         # Radar, Score, Skill Gap, Readiness Indicators
├── learning/           # Course Cards, iGOT Pathways, Recommendations
├── assessment/         # MCQ Cards, Quiz Runner, Upload Zone, AI Pipeline
├── analytics/          # MoSPI Organizational Metrics, Gap Heatmaps
└── layout/             # Sidebar, Header, AppShell, PageContainer
```

### Components Summary

#### Layout
- `AppShell`: Main application container with mobile menu drawer state.
- `Sidebar`: Sectional navigation (`LEARN`, `ASSESS`, `TRAINER`, `ADMIN`).
- `Header`: System status indicator, active route breadcrumb, profile avatar.
- `PageContainer`: Consistent padding and header spacing.

#### Common
- `Button`, `IconButton`, `Card`, `Badge`, `StatusBadge`, `ProgressBar`, `ProgressRing`, `Tabs`, `Dropdown`, `Modal`, `Tooltip`, `EmptyState`, `LoadingState`, `Toast`.

#### Competency
- `CompetencyScore`, `CompetencyCard`, `CompetencyDomain`, `CompetencyMap`, `CompetencyRadar`, `SkillGapIndicator`, `CurrentVsRequired`, `ReadinessScore`.

#### Learning
- `CourseCard`, `CourseGrid`, `RecommendationCard`, `LearningPath`, `LearningPathStep`, `LearningProgress`.

#### Assessment
- `AssessmentCard`, `QuestionCard`, `AnswerOption`, `QuizProgress`, `QuizResult`, `UploadZone`, `AIProcessingPipeline`, `GeneratedQuestionCard`.

#### Analytics
- `MetricCard`, `GapChart`, `CompetencyChart`, `ProgressChart`, `Heatmap`.

---

## 4. Routing Structure & View Definitions

| Route Path | View Component | Role / Purpose |
| :--- | :--- | :--- |
| `/login` | `Login.jsx` | Government SSO Login simulation (`*.gov.in`, `*.nic.in`) |
| `/profile` | `Profile.jsx` | MoSPI Official profile & competency overview |
| `/dashboard` | `Dashboard.jsx` | Learner Statistical Intelligence Dashboard |
| `/assessment` | `Assessment.jsx` | Initial Diagnostic Assessment runner |
| `/competencies` | `Competencies.jsx` | Complete MoSPI statistical competency framework |
| `/skill-gaps` | `SkillGaps.jsx` | Deterministic gap calculation breakdown |
| `/learning-path` | `LearningPathPage.jsx` | Personalized iGOT Karmayogi learning sequence |
| `/courses` | `Courses.jsx` | iGOT Karmayogi course catalog |
| `/my-learning` | `MyLearning.jsx` | Enrolled courses & progress tracker |
| `/assessments` | `Assessments.jsx` | Diagnostic & topic quiz hub |
| `/ai-assessment` | `AIAssessment.jsx` | Trainer PDF/TXT upload & AI question generator |
| `/quiz-review` | `QuizReview.jsx` | Trainer MCQ validation & publish workflow |
| `/quiz/:id` | `QuizRunner.jsx` | Interactive quiz completion engine |
| `/quiz/:id/result` | `QuizResultPage.jsx` | Score breakdown & feedback |
| `/admin` | `AdminDashboard.jsx` | MoSPI Organizational Intelligence & gap metrics |

---

## 5. Implementation Roadmap (Phase 1)

1. **Tokens & Base Styles**: Complete Tailwind config and `src/styles/index.css`.
2. **Mock Data Layer**: Realistic MoSPI competency data (`src/data/*.js`).
3. **Application Shell**: Header, Sidebar, AppShell, PageContainer.
4. **Reusable UI Library**: 35+ components across common, competency, learning, assessment, analytics.
5. **Route Registration**: Router configuration in `src/App.jsx`.
6. **Acceptance Verification**: Clean build, clean console, responsive layouts across screens.
