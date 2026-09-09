import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  Menu,
  Bell,
  Sparkles,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';

const routeTitles = {
  '/dashboard': 'Statistical Intelligence Dashboard',
  '/competencies': 'Official Competency Framework',
  '/skill-gaps': 'Deterministic Skill Gap Engine',
  '/learning-path': 'iGOT Personalized Learning Pathway',
  '/courses': 'iGOT Karmayogi Course Catalog',
  '/my-learning': 'My Learning & Enrollments',
  '/assessments': 'Diagnostic & Topic Assessments',
  '/ai-assessment': 'AI Assessment Studio (Trainer Upload)',
  '/quiz-review': 'Trainer Quiz Validation Studio',
  '/admin': 'MoSPI Organization Intelligence',
  '/profile': 'Officer Competency Profile',
  '/login': 'Government SSO Access Gateway',
  '/diagnostic-assessment': 'Initial Cadre Diagnostic Evaluation'
};

export default function Header({ setMobileOpen }) {
  const location = useLocation();
  const { userState } = useUser();
  const currentTitle = routeTitles[location.pathname] || 'StatIQ Intelligence';

  return (
    <header className="h-16 sticky top-0 z-20 bg-[#0B0F17]/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4 border-b border-slate-800/80">
      {/* Left: Mobile Toggle & Page Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans truncate">
            <span>MoSPI</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span>Statistical Intelligence</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-cyan-400 font-medium truncate">{currentTitle}</span>
          </div>
        </div>
      </div>

      {/* Right: AI Status, Search, Notifications, Profile */}
      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        {/* System & AI Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs text-cyan-400 font-mono shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">StatIQ Core</span>
          <span className="text-[10px] text-slate-400">• Operational</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
        </button>

        {/* Dynamic Profile Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-800"
        >
          <div className="relative">
            <img
              src={userState.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
              alt={userState.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">
              {userState.name}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[140px]">
              {userState.role}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
