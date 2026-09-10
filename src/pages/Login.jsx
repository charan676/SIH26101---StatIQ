import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ShieldCheck, User, Mail, ArrowRight, AlertCircle, Award, Search, ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const OFFICIAL_ROLES = [
  "Statistical Officer",
  "Assistant Statistical Officer (ASO)",
  "Junior Statistical Officer (JSO)",
  "Senior Statistical Officer",
  "Statistical Investigator",
  "Research Officer",
  "Economic Investigator",
  "Data Analyst / Data Processing Officer",
  "Research Assistant",
  "Statistical Assistant",
  "Data Entry Operator",
  "Survey/Field Investigator",
  "Assistant Director (Statistics)",
  "Deputy Director (Statistics)",
  "Joint Director / Director (Statistics)",
  "Training Officers",
  "Department Administrators / HR Officers",
  "Monitoring & Evaluation (M&E) Officers"
];

export default function Login() {
  const [name, setName] = useState('Ravi Kumar');
  const [email, setEmail] = useState('ravi.kumar@department.gov.in');
  const [role, setRole] = useState('Senior Statistical Officer');
  const [competencyLevel, setCompetencyLevel] = useState('Intermediate');
  
  const [roleSearch, setRoleSearch] = useState('');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const roleDropdownRef = useRef(null);

  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  
  const { loginUser } = useUser();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateEmail = (val) => {
    const trimmed = val.trim().toLowerCase();
    // Enforce official email ending with @gov.in, @nic.in, or subdomains like @department.gov.in, @organisation.nic.in
    const officialEmailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*(gov\.in|nic\.in)$/i;
    return officialEmailRegex.test(trimmed);
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val && !validateEmail(val)) {
      setEmailError('Please enter a valid official email address ending with .gov.in or .nic.in');
    } else {
      setEmailError('');
    }
  };

  const filteredRoles = OFFICIAL_ROLES.filter(r =>
    r.toLowerCase().includes(roleSearch.toLowerCase())
  );

  const handleLogin = (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!name.trim()) {
      setGeneralError('Full Name is required.');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Please enter a valid official email address ending with .gov.in or .nic.in');
      return;
    }

    if (!role) {
      setGeneralError('Please select your official role.');
      return;
    }

    if (!competencyLevel) {
      setGeneralError('Please select your competency level.');
      return;
    }

    // Login user into global session state
    loginUser({ name, email, role, competencyLevel });

    // Redirect to Diagnostic Assessment instead of Dashboard
    navigate('/diagnostic-assessment');
  };

  return (
    <div className="min-h-screen bg-[#070A0F] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-[#111A28] border border-[#243247] space-y-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl">
        {/* Top Back to Home Nav */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#070A0F] hover:bg-[#172235] text-slate-400 hover:text-white border border-[#243247] text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Home</span>
          </Link>
          <span className="text-[10px] text-slate-500 font-mono">StatIQ Portal</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-teal-400 p-0.5 shadow-lg shadow-cyan-500/20 mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">StatIQ Gateway</h1>
            <p className="text-xs text-slate-400 mt-1">Official Government Single Sign-On (SSO) & Assessment Entry</p>
          </div>
        </div>

        {generalError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#070A0F] border border-[#243247] rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="e.g. Ravi Kumar"
              />
            </div>
          </div>

          {/* 2. Official Email ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Official Email Address (*.gov.in / *.nic.in) <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`w-full bg-[#070A0F] border rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-white focus:outline-none transition-colors ${
                  emailError ? 'border-rose-500 focus:border-rose-500' : 'border-[#243247] focus:border-cyan-500'
                }`}
                placeholder="ravi.kumar@department.gov.in"
              />
            </div>
            {emailError && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* 3. Official Role — Functional Searchable/Selectable Dropdown */}
          <div className="space-y-1.5 relative" ref={roleDropdownRef}>
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Official Role <span className="text-cyan-400">*</span></span>
              <span className="text-[10px] text-slate-400">Searchable dropdown ({OFFICIAL_ROLES.length} official roles)</span>
            </label>

            {/* Select Trigger Box */}
            <div
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="w-full bg-[#070A0F] border border-[#243247] hover:border-cyan-500/40 rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer flex items-center justify-between relative"
            >
              <Award className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
              <span className="truncate pr-2">{role || "Select Official Role..."}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isRoleOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </div>

            {/* Dropdown Menu Overlay */}
            {isRoleOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#111A28] border border-[#243247] rounded-xl shadow-2xl z-50 p-2 space-y-2 max-h-64 flex flex-col backdrop-blur-xl">
                {/* Search Input Filter */}
                <div className="relative shrink-0">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={roleSearch}
                    onChange={(e) => setRoleSearch(e.target.value)}
                    placeholder="Search 18 official roles..."
                    className="w-full bg-[#070A0F] border border-[#243247] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                </div>

                {/* Scrollable Role List */}
                <div className="overflow-y-auto flex-1 space-y-0.5 pr-1">
                  {filteredRoles.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-500">No roles matching "{roleSearch}"</div>
                  ) : (
                    filteredRoles.map((r) => {
                      const isSelected = role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => {
                            setRole(r);
                            setIsRoleOpen(false);
                            setRoleSearch('');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30'
                              : 'text-slate-300 hover:text-white hover:bg-[#172235]'
                          }`}
                        >
                          <span className="truncate">{r}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. Competency Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Competency Level <span className="text-cyan-400">*</span></span>
              <span className="text-[10px] text-slate-400">Determines diagnostic question difficulty</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Hard'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setCompetencyLevel(lvl)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    competencyLevel === lvl
                      ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm'
                      : 'bg-[#070A0F] border-[#243247] text-slate-400 hover:text-white hover:bg-[#172235]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* SSO Status Banner */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Govt SSO Verified for Official MoSPI Cadres</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={!!emailError}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 ${
              emailError ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>Proceed to Diagnostic Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-3 border-t border-[#243247]">
          <span className="text-[11px] text-slate-500">
            Ministry of Statistics & Programme Implementation • StatIQ Portal v2.4
          </span>
        </div>
      </div>
    </div>
  );
}
