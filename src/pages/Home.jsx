import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  TrendingDown,
  BookOpen,
  FileCheck2,
  Award,
  ChevronRight,
  User
} from 'lucide-react';

export default function Home() {
  const cycleSteps = [
    {
      step: "01",
      title: "Competency Profile",
      desc: "Understand current capability",
      icon: BrainCircuit,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/30"
    },
    {
      step: "02",
      title: "Skill Gap",
      desc: "Identify priority gaps",
      icon: TrendingDown,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/30"
    },
    {
      step: "03",
      title: "Personalized Learning",
      desc: "Get targeted learning",
      icon: BookOpen,
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/30"
    },
    {
      step: "04",
      title: "Assessment",
      desc: "Validate knowledge",
      icon: FileCheck2,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/30"
    },
    {
      step: "05",
      title: "Improved Competency",
      desc: "Measure progress",
      icon: Award,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30"
    }
  ];

  const journeySteps = [
    {
      number: "01",
      title: "Assess",
      description: "Evaluate official proficiency against position prerequisites.",
      icon: BrainCircuit,
      color: "text-cyan-400"
    },
    {
      number: "02",
      title: "Identify Gaps",
      description: "Quantify critical competency deficits across role domains.",
      icon: TrendingDown,
      color: "text-rose-400"
    },
    {
      number: "03",
      title: "Personalize Learning",
      description: "Connect priority gaps directly to targeted learning pathways.",
      icon: BookOpen,
      color: "text-teal-400"
    },
    {
      number: "04",
      title: "Assess Again",
      description: "Validate acquired knowledge through automated AI assessments.",
      icon: FileCheck2,
      color: "text-blue-400"
    },
    {
      number: "05",
      title: "Measure Improvement",
      description: "Track longitudinal capability growth and cadre readiness.",
      icon: Award,
      color: "text-emerald-400"
    }
  ];

  const capabilities = [
    {
      title: "Competency Intelligence",
      description: "Map current capability against role requirements.",
      icon: BrainCircuit
    },
    {
      title: "Skill Gap Analysis",
      description: "Identify and prioritize critical competency gaps.",
      icon: TrendingDown
    },
    {
      title: "Personalized Learning",
      description: "Connect gaps with targeted learning pathways.",
      icon: BookOpen
    },
    {
      title: "AI Assessment Studio",
      description: "Generate knowledge assessments from learning materials.",
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      {/* 1. COMPACT NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0B0F17] border-2 border-cyan-500/80 shadow-md shadow-cyan-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Stat<span className="text-cyan-400">IQ</span>
          </span>
        </div>

        {/* Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="#product" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
          <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Accounts</span>
          </Link>
        </div>
      </header>

      {/* MAIN COMPACT CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* 2. HERO SECTION */}
        <section id="product" className="relative pt-12 pb-14 space-y-10">
          {/* Background statistical grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Turn Competency Gaps <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                into Capability.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              AI-powered competency intelligence for India's Official Statistical System.
            </p>

            <div className="pt-2 flex flex-row items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
              >
                <span>Explore StatIQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02]"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3. COMPETENCY INTELLIGENCE CYCLE */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 space-y-4 shadow-xl relative">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                STATIQ INTELLIGENCE CYCLE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Closed-Loop Framework</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {cycleSteps.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border ${node.bg} space-y-1.5 transition-all hover:border-cyan-500/50`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-mono text-slate-400">{node.step}</span>
                      <Icon className={`w-4 h-4 ${node.color}`} />
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{node.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">"{node.desc}"</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. SECTION: FROM ASSESSMENT TO IMPROVEMENT (HOW IT WORKS) */}
        <section id="how-it-works" className="py-12 border-t border-slate-800/80 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 font-mono">HOW IT WORKS</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">From Assessment to Improvement</h2>
          </div>

          {/* Horizontal 5 steps row on desktop, stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {journeySteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/90 space-y-2 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold font-mono text-slate-500">{s.number}</span>
                      <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                    </div>
                    <h3 className="text-xs font-bold text-white">{s.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-snug">{s.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. SECTION: CORE CAPABILITIES */}
        <section id="capabilities" className="py-12 border-t border-slate-800/80 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono">CORE CAPABILITIES</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Platform Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-1">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{c.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">"{c.description}"</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 6. COMPACT FOOTER */}
      <footer className="border-t border-slate-800/80 py-6 px-4 lg:px-8 mt-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
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
