import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { CompetencyCard } from '../components/competency/CompetencyComponents';
import { CompetencyRadar } from '../components/competency/CompetencyRadar';
import { competencies, competencyDomains } from '../data/competencyData';
import { Tabs } from '../components/common/UIFeedback';
import { Award, Search, X, CheckCircle2, ArrowRight, BrainCircuit, ShieldCheck, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Competencies() {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Domains', count: competencies.length },
    ...competencyDomains.map(d => ({
      id: d.name,
      label: d.name,
      count: competencies.filter(c => c.domain === d.name).length
    }))
  ];

  const filteredCompetencies = competencies.filter(c => {
    const matchesDomain = selectedDomain === 'all' || c.domain === selectedDomain;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <Award className="w-6 h-6 text-cyan-400" />
              <span>Official MoSPI Competency Architecture</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Ministry of Statistics & Programme Implementation official 9-domain statistical competency framework
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search competencies or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Competency Radar Visual Center */}
        <div className="p-6 rounded-2xl bg-[#111A28] border border-[#243247] space-y-4 shadow-[0_10px_30px_rgba(7,10,15,0.6)]">
          <div className="flex items-center justify-between border-b border-[#243247] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                <span>Competency Radar Profile Map</span>
              </h3>
              <p className="text-xs text-slate-400">Current Officer Scores vs Senior Statistical Officer Target Requirements</p>
            </div>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
              9 Tracked Domains
            </span>
          </div>

          <CompetencyRadar data={competencies} />
        </div>

        {/* Domain Filter Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Competency Domain Matrix</h3>
            <span className="text-xs text-slate-400">Showing {filteredCompetencies.length} Competencies</span>
          </div>

          <Tabs tabs={tabs} activeTab={selectedDomain} onChange={setSelectedDomain} />

          {/* Competency Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetencies.map((comp) => (
              <CompetencyCard
                key={comp.id}
                competency={comp}
                onSelect={(competency) => setSelectedCompetency(competency)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selected Competency Detail Modal */}
      {selectedCompetency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-cyan-400 font-medium">{selectedCompetency.domain}</span>
                <h3 className="text-xl font-bold text-white">{selectedCompetency.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCompetency(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed">{selectedCompetency.description}</p>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Current Proficiency: <strong className="text-cyan-400 text-sm">{selectedCompetency.current}/100</strong></span>
                  <span>Required Target: <strong className="text-blue-400 text-sm">{selectedCompetency.required}/100</strong></span>
                </div>
                <div className="relative w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${selectedCompetency.current}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white"
                    style={{ left: `${selectedCompetency.required}%` }}
                  />
                </div>
                {selectedCompetency.gap > 0 ? (
                  <div className="flex justify-between items-center text-xs text-rose-400 pt-1">
                    <span>Gap to bridge: -{selectedCompetency.gap} points</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/20 font-semibold">
                      {selectedCompetency.priority} Priority
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-xs text-emerald-400 pt-1">
                    <span>✓ Prerequisites Met</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/20 font-semibold">
                      Strong Competency
                    </span>
                  </div>
                )}
              </div>

              {/* Evidence & Assessment Information */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verification & Evidence</h4>
                <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="text-slate-200 font-medium">MoSPI Cadre Assessment Audit</p>
                    <p className="text-slate-400">Verified via National Accounts Diagnostic Assessment • Last Assessed: {selectedCompetency.lastAssessed}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCompetency(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
              <Link
                to="/learning-path"
                onClick={() => setSelectedCompetency(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Learning Path</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
