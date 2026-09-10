import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  LayoutDashboard,
  Award,
  TrendingDown,
  Route,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Sparkles,
  CheckSquare,
  BarChart3,
  User,
  ShieldCheck,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userState, logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navigation = [
    {
      group: 'LEARN',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Competencies', path: '/competencies', icon: Award },
        { name: 'Skill Gaps', path: '/skill-gaps', icon: TrendingDown, badge: '1 Critical' },
        { name: 'Learning Path', path: '/learning-path', icon: Route },
        { name: 'Courses', path: '/courses', icon: BookOpen },
        { name: 'My Learning & Progress', path: '/my-learning', icon: GraduationCap },
      ],
    },
    {
      group: 'ASSESS',
      items: [
        { name: 'Assessments', path: '/assessments', icon: FileCheck2 },
      ],
    },
    {
      group: 'TRAINER',
      items: [
        { name: 'AI Assessment Studio', path: '/ai-assessment', icon: Sparkles },
        { name: 'Quiz Validation Studio', path: '/quiz-review', icon: CheckSquare },
      ],
    },
    {
      group: 'ADMIN',
      items: [
        { name: 'Organization Intelligence', path: '/admin', icon: BarChart3 },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0B1220] border-r border-[#243247] text-slate-200 transition-all duration-300 relative select-none">
      {/* Brand Header */}
      <div className={`flex items-center h-16 border-b border-[#243247] bg-[#070A0F]/60 ${
        collapsed ? 'justify-center px-0' : 'justify-between px-4'
      }`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#111A28] border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)] flex items-center justify-center shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                  Stat<span className="text-cyan-400">IQ</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  MoSPI
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        {!collapsed && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#111A28]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className={`flex-1 overflow-y-auto ${collapsed ? 'px-2 py-4 space-y-3' : 'px-3 py-4 space-y-5'}`}>
        {navigation.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-1.5 font-sans">
                {group.group}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    collapsed
                      ? `w-10 h-10 mx-auto flex items-center justify-center rounded-xl transition-all duration-150 relative ${
                          isActive
                            ? 'bg-[#172235] text-cyan-400 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                            : 'text-slate-400 hover:text-white hover:bg-[#111A28]'
                        }`
                      : `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group relative ${
                          isActive
                            ? 'bg-[#172235] text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-[#111A28] border border-transparent'
                        }`
                  }
                >
                  <Icon
                    className={`w-4.5 h-4.5 shrink-0 transition-colors duration-150 ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex items-center justify-between flex-1 truncate">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 text-[10px] font-sans font-bold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Official SSO Verification Footer */}
      {!collapsed && (
        <div className="p-3 m-3 mb-1 rounded-xl bg-[#111A28] border border-[#243247] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate">{userState.name}</span>
            <span className="text-[10px] text-slate-400 font-mono truncate">{userState.role}</span>
          </div>
        </div>
      )}

      {/* Red Logout Symbol Box at Bottom */}
      <div className="p-3 border-t border-[#243247] bg-[#070A0F]/60">
        <button
          onClick={handleLogout}
          title={collapsed ? "Log Out" : undefined}
          className={
            collapsed
              ? "w-10 h-10 mx-auto flex items-center justify-center rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition-all shadow-md shadow-rose-500/10 cursor-pointer"
              : "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition-all text-xs font-bold shadow-md shadow-rose-500/10 cursor-pointer"
          }
        >
          <LogOut className="w-4.5 h-4.5 text-rose-400 shrink-0" />
          {!collapsed && <span className="truncate">Log Out ({userState.name.split(' ')[0]})</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar with Hover Expand / Collapse */}
      <aside
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className={`hidden lg:block h-screen sticky top-0 z-30 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
