import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  TrendingDown,
  BookOpen,
  FileCheck2,
  Award,
  User,
  ShieldCheck,
  CheckCircle2,
  LineChart,
  Activity,
  Layers,
  Cpu,
  RefreshCw,
  Target,
  GraduationCap,
  ChevronRight,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const [activeCycleStep, setActiveCycleStep] = useState(0);

  const closedLoopNodes = [
    {
      id: '01',
      title: 'Competency Profile',
      subtitle: 'Official Capability Baseline',
      desc: 'Establishes initial cadre proficiency baseline across 9 statistical domains.',
      metric: '9 Domains Tracked',
      icon: BrainCircuit,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
    },
    {
      id: '02',
      title: 'Skill Gap Analysis',
      subtitle: 'Deterministic Evaluation',
      desc: 'Computes exact points deficit between current ability and position prerequisites.',
      metric: '-33 pts Max Gap',
      icon: TrendingDown,
      color: 'from-rose-500 to-amber-600',
      badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
    },
    {
      id: '03',
      title: 'Personalized Learning',
      subtitle: 'iGOT Karmayogi Pathways',
      desc: 'Connects priority gaps directly to targeted capacity-building modules.',
      metric: 'Auto-Matched Courses',
      icon: BookOpen,
      color: 'from-teal-500 to-emerald-600',
      badgeColor: 'bg-teal-500/15 text-teal-400 border-teal-500/30'
    },
    {
      id: '04',
      title: 'AI Assessment Studio',
      subtitle: 'Grounded MCQ Synthesis',
      desc: 'Generates validated knowledge quizzes directly from official MoSPI manuals.',
      metric: '94% AI Confidence',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    },
    {
      id: '05',
      title: 'Measure Improvement',
      subtitle: 'Longitudinal Score Recalibration',
      desc: 'Recalculates officer readiness index after completed evaluations.',
      metric: '+16 pts Gain',
      icon: Award,
      color: 'from-emerald-500 to-cyan-500',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    }
  ];

  const journeySteps = [
    {
      num: '01',
      title: 'Assess',
      desc: 'Evaluate official proficiency against position prerequisites via initial diagnostic evaluation.',
      icon: BrainCircuit,
      tag: 'Baseline Evaluation'
    },
    {
      num: '02',
      title: 'Identify Gaps',
      desc: 'Quantify critical competency deficits across role domains using mathematical gap algorithms.',
      icon: TrendingDown,
      tag: 'Deterministic Math'
    },
    {
      num: '03',
      title: 'Personalize Learning',
      desc: 'Connect priority gaps to targeted iGOT Karmayogi learning pathways for structured capacity building.',
      icon: BookOpen,
      tag: 'Pathway Routing'
    },
    {
      num: '04',
      title: 'Assess Again',
      desc: 'Validate acquired knowledge through automated AI-synthesized assessments with document groundings.',
      icon: FileCheck2,
      tag: 'Knowledge Validation'
    },
    {
      num: '05',
      title: 'Measure Improvement',
      desc: 'Track longitudinal capability growth, updated readiness indices, and official cadre readiness.',
      icon: Award,
      tag: 'Readiness Gain'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans overflow-x-hidden relative">
      {/* GLOBAL BACKGROUND STATISTICAL GRID & CONSTELATION NODES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-[#070A0F] to-[#070A0F]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#06B6D4" strokeDasharray="4 8" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#06B6D4" strokeDasharray="4 8" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#1E293B" strokeDasharray="2 6" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#1E293B" strokeDasharray="2 6" />
        </svg>
      </div>

      {/* 1. ELEVATED TRANSLUCENT NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#070A0F]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-teal-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070A0F] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-white font-sans">
              Stat<span className="text-cyan-400">IQ</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              MoSPI Intelligence
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400 font-sans">
          <a href="#product" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
          <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
          <a href="#igot-alignment" className="hover:text-cyan-400 transition-colors">iGOT Alignment</a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Accounts</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all hover:scale-[1.02]"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 space-y-24 pt-8 pb-16">
        
        {/* 2. HERO SECTION — VISUAL SPLIT LAYOUT */}
        <section id="product" className="pt-6 pb-4 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT COLUMN: CONFIDENT HEADLINE & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-400 font-mono shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-semibold">MoSPI Cadre Evaluation Infrastructure</span>
              </div>

              {/* Confident Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Turn Competency Gaps <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  into Capability.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                AI-powered competency intelligence platform engineered for India's Official Statistical System to map, evaluate, and elevate officer capability across 18 official roles.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-transform"
                >
                  <span>Explore StatIQ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-sm font-semibold transition-all hover:scale-[1.02]"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Small Context Metrics */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Roles</span>
                  <span className="text-white font-bold text-sm">18 Cadres</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Domain Framework</span>
                  <span className="text-cyan-400 font-bold text-sm">9 Domains</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Closed Loop</span>
                  <span className="text-teal-400 font-bold text-sm">100% Recalibrated</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ORIGINAL COMPETENCY INTELLIGENCE VISUALIZATION */}
            <div className="lg:col-span-6 relative">
              <div className="p-6 md:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-2xl relative space-y-6 overflow-hidden backdrop-blur-xl">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      StatIQ Competency Engine Matrix
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/15 px-2.5 py-0.5 rounded border border-cyan-500/30 font-mono">
                    LIVE MODEL
                  </span>
                </div>

                {/* INTERACTIVE VISUAL NODE CONNECTIVITY METAPHOR */}
                <div className="relative py-4 space-y-4">
                  {/* SVG Connected Flow Paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 60 40 L 180 80 L 300 40 L 220 160 L 60 160"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-40"
                    />
                  </svg>

                  {/* Flow Nodes Diagram */}
                  <div className="grid grid-cols-2 gap-3 relative z-10 text-xs">
                    {/* Node 1 */}
                    <div className="p-3.5 rounded-xl bg-[#070A0F] border border-cyan-500/40 space-y-1 shadow-md">
                      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                        <span>OFFICER PROFILE</span>
                        <User className="w-3 h-3 text-cyan-400" />
                      </div>
                      <p className="font-bold text-white text-xs">Senior Statistical Officer</p>
                      <span className="text-[10px] text-slate-400 block">Baseline Readiness: 74%</span>
                    </div>

                    {/* Node 2 */}
                    <div className="p-3.5 rounded-xl bg-[#070A0F] border border-rose-500/40 space-y-1 shadow-md">
                      <div className="flex items-center justify-between text-[10px] font-mono text-rose-400">
                        <span>CRITICAL SKILL GAP</span>
                        <TrendingDown className="w-3 h-3 text-rose-400" />
                      </div>
                      <p className="font-bold text-white text-xs">GIS & Spatial Sampling</p>
                      <span className="text-[10px] text-rose-300 block">Deficit: -33 points below target</span>
                    </div>

                    {/* Node 3 */}
                    <div className="p-3.5 rounded-xl bg-[#070A0F] border border-teal-500/40 space-y-1 shadow-md">
                      <div className="flex items-center justify-between text-[10px] font-mono text-teal-400">
                        <span>iGOT LEARNING PATH</span>
                        <BookOpen className="w-3 h-3 text-teal-400" />
                      </div>
                      <p className="font-bold text-white text-xs">ISRO Spatial Data Module</p>
                      <span className="text-[10px] text-slate-400 block">Auto-Matched iGOT Pathway</span>
                    </div>

                    {/* Node 4 */}
                    <div className="p-3.5 rounded-xl bg-[#070A0F] border border-emerald-500/40 space-y-1 shadow-md">
                      <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                        <span>RECALIBRATED PROFICIENCY</span>
                        <Award className="w-3 h-3 text-emerald-400" />
                      </div>
                      <p className="font-bold text-white text-xs">82% Verified Readiness</p>
                      <span className="text-[10px] text-emerald-300 block">+16 pts Longitudinal Gain</span>
                    </div>
                  </div>

                  {/* Competency Radar Visual Overlay Strip */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <BrainCircuit className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">Closed-Loop Competency Feedback</span>
                        <span className="text-[10px] text-slate-400 font-mono">Dynamic AI Assessment & Score Recalibration</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                      ✓ Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CLOSED-LOOP STATIQ INTELLIGENCE ENGINE SECTION */}
        <section className="space-y-8 py-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest">
              CLOSED-LOOP ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The StatIQ Intelligence Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A continuous, automated evaluation loop that connects baseline profiles to targeted learning and verified capability gain.
            </p>
          </div>

          {/* Interactive Step Switcher Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {closedLoopNodes.map((node, idx) => {
              const Icon = node.icon;
              const isActive = activeCycleStep === idx;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveCycleStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold font-mono text-slate-500">{node.id}</span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{node.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded border inline-block font-mono ${node.badgeColor}`}>
                    {node.metric}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Stage Detailed Spotlight */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    Stage {closedLoopNodes[activeCycleStep].id} Highlight
                  </span>
                  <h3 className="text-lg font-bold text-white">{closedLoopNodes[activeCycleStep].title}</h3>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {closedLoopNodes[activeCycleStep].subtitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{closedLoopNodes[activeCycleStep].desc}"
            </p>
          </div>
        </section>

        {/* 4. "HOW IT WORKS" SECTION — CONNECTED PATHWAY FLOW */}
        <section id="how-it-works" className="space-y-8 py-6 border-t border-slate-800/80">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-400 font-mono uppercase tracking-widest">
              HOW IT WORKS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              From Assessment to Improvement
            </h2>
            <p className="text-xs text-slate-400">
              Sequential 5-stage official capacity building workflow for Indian Statistical cadres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-extrabold text-slate-500">{step.num}</span>
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-xs font-bold text-white">{step.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {step.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. CORE CAPABILITIES SECTION — 4 VISUALLY DISTINCT MODULES */}
        <section id="capabilities" className="space-y-8 py-6 border-t border-slate-800/80">
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest">
              PLATFORM CAPABILITIES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Core Intelligence Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Capability 1: Competency Intelligence */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-4.5 h-4.5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Competency Intelligence</h3>
                    <span className="text-xs text-slate-400">Map current capability against role requirements</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070A0F] border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Statistical Domain Coverage</span>
                  <span className="text-cyan-400 font-bold">9 Official Domains</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>

            {/* Capability 2: Skill Gap Analysis */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-rose-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-4.5 h-4.5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Deterministic Skill Gap Engine</h3>
                    <span className="text-xs text-slate-400">Identify and prioritize critical competency gaps</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070A0F] border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">GIS & Spatial Sampling</span>
                  <span className="text-rose-400 font-bold">-33 pts Critical</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>

            {/* Capability 3: Personalized Learning */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-teal-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4.5 h-4.5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Personalized Learning Pathways</h3>
                    <span className="text-xs text-slate-400">Connect gaps with targeted learning pathways</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070A0F] border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>iGOT Karmayogi Module Matching</span>
                  <span className="text-teal-400 font-bold">Auto-Routed</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            {/* Capability 4: AI Assessment Studio */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4.5 h-4.5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI Assessment Studio</h3>
                    <span className="text-xs text-slate-400">Generate knowledge assessments from learning materials</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070A0F] border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Document Source Grounding</span>
                  <span className="text-blue-400 font-bold">94% Confidence</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. iGOT KARMAYOGI ECOSYSTEM ALIGNMENT SECTION */}
        <section id="igot-alignment" className="p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-teal-950/30 border border-teal-500/30 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-400 text-xs font-bold border border-teal-500/30">
                <GraduationCap className="w-4 h-4 text-teal-400" />
                <span>iGOT Karmayogi Alignment Layer</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Integration-Ready Competency Intelligence
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                StatIQ serves as the intelligence layer that evaluates MoSPI statistical officer capability and maps priority skill gaps directly to relevant iGOT Karmayogi capacity-building pathways.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="p-4 rounded-xl bg-[#070A0F] border border-slate-800 text-center min-w-[120px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">StatIQ Layer</span>
                <span className="text-sm font-bold text-cyan-400">Competency AI</span>
              </div>
              <ArrowRight className="w-5 h-5 text-teal-400" />
              <div className="p-4 rounded-xl bg-[#070A0F] border border-slate-800 text-center min-w-[120px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">iGOT Ecosystem</span>
                <span className="text-sm font-bold text-teal-400">E-Learning Modules</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. COMPACT INSTITUTIONAL FOOTER */}
      <footer className="border-t border-slate-800/80 py-6 px-4 lg:px-8 mt-12 bg-[#070A0F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">StatIQ</span>
            <span>•</span>
            <span className="text-slate-400 font-normal">AI-Powered Competency Intelligence Platform</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Ministry of Statistics & Programme Implementation
          </div>
        </div>
      </footer>
    </div>
  );
}
