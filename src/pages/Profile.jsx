import React, { useEffect, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useUser } from '../context/UserContext';
import { getProfileData } from '../utils/api';
import { User, ShieldCheck, Mail, Building, MapPin, Award, CheckCircle2, Flame, Layers } from 'lucide-react';

export default function Profile() {
  const { userState } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const userId = userState.id || 1;

    // Native fetch() API operation targeting GET http://127.0.0.1:8000/api/profiles/${userId}
    getProfileData(userId)
      .then((data) => {
        if (active && data) {
          setProfileData(data);
        }
      })
      .catch((err) => {
        console.warn("Live profile fetch error:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [userState.id]);

  const displayName = profileData?.display_name || userState.name;
  const email = profileData?.email || userState.email;
  const role = profileData?.designation || userState.role;
  const department = profileData?.department || userState.department || 'NSSO Field Operations Division';
  const seniorityLevel = profileData?.seniority_level || userState.seniorityLevel || 2;
  const yearsExperience = profileData?.years_of_experience || userState.yearsOfExperience || 4;

  return (
    <PageContainer>
      <div className="space-y-8 pb-12 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243247] pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <User className="w-6 h-6 text-cyan-400" />
              <span>MoSPI Official Cadre Profile</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live Profile State Synced via GET /api/profiles
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Govt SSO Verified Official</span>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#111A28] border border-[#243247] space-y-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#243247]">
            <img
              src={userState.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
              alt={displayName}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-500/40 shadow-lg shadow-cyan-500/20"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
                <h2 className="text-2xl font-bold text-white">{displayName}</h2>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                  Level {seniorityLevel} Cadre
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{userState.streak?.currentStreak || 3} Day Streak</span>
                </span>
              </div>
              <p className="text-xs font-bold text-cyan-400">{role}</p>
              <p className="text-xs text-slate-400">{department}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Email</span>
                <span className="text-slate-200 font-semibold">{email}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] flex items-center gap-3">
              <Building className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Department / Division</span>
                <span className="text-slate-200 font-semibold">{department}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] flex items-center gap-3">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Experience</span>
                <span className="text-slate-200 font-semibold">{yearsExperience} Years Service</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">User ID</span>
                <span className="text-slate-200 font-semibold">User #{userState.id || 1}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] flex items-center gap-3">
              <Award className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Verified Readiness Index</span>
                <span className="text-slate-200 font-semibold">{userState.overallReadiness || 74} / 100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070A0F] border border-[#243247] flex items-center gap-3">
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
