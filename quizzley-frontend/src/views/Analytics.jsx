import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, CheckCircle2, BarChart2, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

const STATUS_STYLES = {
  Live: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Scheduled: 'bg-amber-100 text-amber-700',
  Draft: 'bg-slate-100 text-slate-600',
};

function ScoreBar({ value }) {
  const num = parseFloat(value) || 0;
  const color = num >= 75 ? 'bg-green-500' : num >= 60 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5 max-w-24">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${num}%` }} />
      </div>
      <span className="text-slate-700 font-medium text-sm w-10">{value}</span>
    </div>
  );
}

export default function Analytics() {
  const [metrics, setMetrics] = useState([]);
  const [quizPerformance, setQuizPerformance] = useState([]);
  const [moduleStats, setModuleStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [analyticsRes, moduleRes] = await Promise.all([
          api.get('/api/admin/analytics'),
          api.get('/api/admin/analytics/module-stats'),
        ]);

        const data = analyticsRes.data;
        const mappedMetrics = [
          {
            label: 'Total Attempts',
            value: data.totalAttempts || '0',
            sub: 'Based on database submissions',
            icon: TrendingUp,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            subColor: 'text-blue-500',
          },
          {
            label: 'Average Score',
            value: data.averageScore || '0.0%',
            sub: 'Across all graded attempts',
            icon: BarChart2,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
            subColor: 'text-violet-500',
          },
          {
            label: 'Pass Rate',
            value: data.passRate || '0%',
            sub: 'Min 60% score to pass',
            icon: Award,
            color: 'text-green-600',
            bg: 'bg-green-50',
            subColor: 'text-green-500',
          },
          {
            label: 'Completion Rate',
            value: data.completionRate || '0%',
            sub: 'Submitted vs In-Progress',
            icon: CheckCircle2,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            subColor: 'text-amber-500',
          },
        ];

        setMetrics(mappedMetrics);
        setQuizPerformance(data.quizPerformance || []);
        setModuleStats(moduleRes.data || []);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Failed to load live analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem="analytics" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-500 text-sm mt-0.5">Performance insights across all quizzes</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-3" />
            <p className="text-sm font-medium">Loading live analytics data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-red-500 max-w-md mx-auto text-center">
            <AlertCircle size={32} className="mb-3 text-red-500" />
            <p className="font-semibold">{error}</p>
            <p className="text-xs text-slate-400 mt-1">Please ensure the backend server and database are running.</p>
          </div>
        ) : (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {metrics.map(({ label, value, sub, icon: Icon, color, bg, subColor }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`${bg} rounded-xl p-3 shrink-0`}>
                    <Icon size={22} className={color} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{label}</p>
                    <p className="text-3xl font-bold text-slate-800 leading-tight mt-0.5">{value}</p>
                    <p className={`text-xs mt-1 font-medium ${subColor}`}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quiz Performance Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-800">Quiz Performance</h2>
                <p className="text-slate-400 text-xs mt-0.5">Breakdown by individual quiz</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quiz Title</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Score</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pass Rate</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {quizPerformance.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">
                          No quiz attempts recorded in database.
                        </td>
                      </tr>
                    ) : (
                      quizPerformance.map((row) => (
                        <tr key={row.title} className="hover:bg-slate-50/70 transition-colors duration-100">
                          <td className="px-6 py-4 font-medium text-slate-800">{row.title}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Users size={13} className="text-slate-400" />
                              {row.students > 0 ? row.students : '0'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {row.avgScore !== '—' ? <ScoreBar value={row.avgScore} /> : <span className="text-slate-400">—</span>}
                          </td>
                          <td className="px-6 py-4">
                            {row.passRate !== '—' ? <ScoreBar value={row.passRate} /> : <span className="text-slate-400">—</span>}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[row.status]}`}>
                              {row.status === 'Live' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                              )}
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Module Statistics Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                <BookOpen size={18} className="text-violet-500" />
                <div>
                  <h2 className="text-base font-semibold text-slate-800">Module Statistics</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Quizzes and questions per academic module</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Module Code</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Module Name</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Quizzes</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Questions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {moduleStats.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">
                          No modules found in database.
                        </td>
                      </tr>
                    ) : (
                      moduleStats.map((m) => (
                        <tr key={m.moduleCode} className="hover:bg-slate-50/70 transition-colors duration-100">
                          <td className="px-6 py-4">
                            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                              {m.moduleCode}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-800">{m.moduleName}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                {m.quizCount}
                              </span>
                              {m.quizCount === 1 ? 'quiz' : 'quizzes'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
                              <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">
                                {m.questionCount}
                              </span>
                              {m.questionCount === 1 ? 'question' : 'questions'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
