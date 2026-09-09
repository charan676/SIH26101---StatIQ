import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useUser } from '../context/UserContext';
import { User, ShieldCheck, Mail, Building, MapPin, Award, CheckCircle2, Flame, Layers } from 'lucide-react';

export default function Profile() {
  const { userState } = useUser();

  return (
    <PageContainer>
      <div className="space-y-8 pb-12 max-w-4xl mx-auto">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <User className="w-6 h-6 text-cyan-400" />
              <span>MoSPI Official Cadre Profile</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Official Cadre Credentials Verification & Government Single Sign-On (SSO) Status
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Govt SSO Verified Official</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
            <img
              src={userState.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
              alt={userState.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-500/40 shadow-lg shadow-cyan-500/20"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
                <h2 className="text-2xl font-bold text-white">{userState.name}</h2>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                  {userState.competencyLevel} Level
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{userState.streak?.currentStreak || 7} Day Streak</span>
                </span>
              </div>
              <p className="text-xs font-bold text-cyan-400">{userState.role}</p>
              <p className="text-xs text-slate-400">{userState.department || 'National Accounts Division'}</p>
            </div>
          </div>

          {/* Grid Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Email</span>
                <span className="text-slate-200 font-semibold">{userState.email}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
              <Building className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Ministry</span>
                <span className="text-slate-200 font-semibold">{userState.ministry || "Ministry of Statistics & Programme Implementation"}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Posting Location</span>
                <span className="text-slate-200 font-semibold">{userState.location || "New Delhi Headquarters"}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Gov SSO Identifier</span>
                <span className="text-slate-200 font-semibold">{userState.ssoId || "GOV-SSO-991823"}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
              <Award className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Verified Readiness Index</span>
                <span className="text-slate-200 font-semibold">{userState.overallReadiness || 74} / 100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
              <Layers className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Diagnostic Status</span>
                <span className="text-emerald-400 font-semibold">
                  {userState.hasCompletedDiagnostic ? `Completed (${userState.diagnosticResult?.scorePercent}% score)` : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
