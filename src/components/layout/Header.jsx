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
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(3);

  const notifications = [
    { id: 1, title: 'Competency Readiness Recalculated', time: '10m ago', text: 'Baseline diagnostic updated your overall readiness to 74%.', unread: true },
    { id: 2, title: 'iGOT Course Recommendation', time: '1h ago', text: 'New module available: Advanced Statistical Methods & GIS.', unread: true },
    { id: 3, title: 'AI Assessment Published', time: '3h ago', text: 'Trainer published "Official MoSPI Synthesized Assessment 2026".', unread: true },
  ];

  const currentTitle = routeTitles[location.pathname] || 'StatIQ Intelligence';

  return (
    <header className="h-16 sticky top-0 z-20 bg-[#070A0F]/85 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4 border-b border-[#243247]">
      {/* Left: Mobile Toggle & Page Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#111A28]"
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
            <span className="text-cyan-400 font-bold truncate">{currentTitle}</span>
          </div>
        </div>
      </div>

      {/* Right: AI Status, Search, Notifications, Profile */}
      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        {/* System & AI Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111A28] border border-cyan-500/30 text-xs text-cyan-400 font-mono shadow-[0_0_12px_rgba(6,182,212,0.12)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline font-bold">StatIQ Core</span>
          <span className="text-[10px] text-slate-400">• Operational</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) setUnreadCount(0);
            }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#111A28] transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#070A0F] animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Popup */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#111A28] border border-[#243247] shadow-[0_10px_30px_rgba(7,10,15,0.8)] p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-[#243247] pb-2.5">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span>StatIQ System Notifications</span>
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-cyan-400 hover:underline font-bold"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#070A0F]/80 border border-[#243247] space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Profile Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#111A28] transition-colors border border-transparent hover:border-[#243247]"
        >
          <div className="relative">
            <img
              src={userState.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
              alt={userState.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070A0F]" />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">
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
