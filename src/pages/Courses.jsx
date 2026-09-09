import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { CourseGrid, CourseDetailModal } from '../components/learning/LearningComponents';
import { courses as initialCourses } from '../data/courseData';
import { BookOpen, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Courses() {
  const [coursesList, setCoursesList] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const competencyOptions = ['all', 'AI/ML', 'GIS', 'Python', 'SQL', 'Data Visualization'];
  const providerOptions = ['all', 'iGOT Karmayogi / NSSTA', 'iGOT Karmayogi / ISRO-IIRS', 'iGOT Karmayogi / NIC Academy', 'iGOT Karmayogi / MeitY'];

  const filteredCourses = coursesList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.skillsCovered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCompetency = selectedCompetency === 'all' || c.competency === selectedCompetency;
    const matchesProvider = selectedProvider === 'all' || c.provider === selectedProvider;

    return matchesSearch && matchesCompetency && matchesProvider;
  });

  const handleToggleEnroll = (courseId) => {
    setCoursesList(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: !c.enrolled, progress: c.enrolled ? 0 : 10 };
      }
      return c;
    }));
  };

  return (
    <PageContainer>
      <div className="space-y-8 pb-12">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <span>iGOT Karmayogi Official Course Catalog</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Curated government capacity-building e-learning modules aligned with MoSPI statistical competencies
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>AI Competency-Matched Courses</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by course title, code, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Competency:</span>
              <select
                value={selectedCompetency}
                onChange={(e) => setSelectedCompetency(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {competencyOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt === 'all' ? 'All Competencies' : opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Provider:</span>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {providerOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt === 'all' ? 'All Providers' : opt.replace('iGOT Karmayogi / ', '')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Available iGOT Modules</h3>
            <span className="text-xs text-slate-400">Showing {filteredCourses.length} Courses</span>
          </div>

          <CourseGrid
            courses={filteredCourses}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onToggleEnroll={handleToggleEnroll}
        />
      )}
    </PageContainer>
  );
}
