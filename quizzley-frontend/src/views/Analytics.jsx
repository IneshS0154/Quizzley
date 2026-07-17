import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Award, CheckCircle2, BarChart2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const METRICS = [
  {
    label: 'Total Attempts',
    value: '286',
    sub: '+12% vs last month',
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    subColor: 'text-blue-500',
  },
  {
    label: 'Average Score',
    value: '73.4%',
    sub: '+2.1% vs last month',
    icon: BarChart2,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    subColor: 'text-violet-500',
  },
  {
    label: 'Pass Rate',
    value: '68%',
    sub: 'Min 60% to pass',
    icon: Award,
    color: 'text-green-600',
    bg: 'bg-green-50',
    subColor: 'text-green-500',
  },
  {
    label: 'Completion Rate',
    value: '91%',
    sub: '9% abandoned mid-quiz',
    icon: CheckCircle2,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    subColor: 'text-amber-500',
  },
];

const QUIZ_DATA = [
  {
    title: 'Data Structures Mid-Term',
    students: 34,
    avgScore: '78%',
    passRate: '82%',
    status: 'Completed',
  },
  {
    title: 'Algorithms Practice Set 3',
    students: 19,
    avgScore: '64%',
    passRate: '58%',
    status: 'Live',
  },
  {
    title: 'Database Normalization Quiz',
    students: 0,
    avgScore: '—',
    passRate: '—',
    status: 'Scheduled',
  },
  {
    title: 'Computer Networks Basics',
    students: 42,
    avgScore: '71%',
    passRate: '76%',
    status: 'Completed',
  },
];

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
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem="analytics" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-500 text-sm mt-0.5">Performance insights across all quizzes</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {METRICS.map(({ label, value, sub, icon: Icon, color, bg, subColor }) => (
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
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-800">Quiz Performance</h2>
            <p className="text-slate-400 text-xs mt-0.5">Breakdown by individual quiz</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quiz Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Score</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pass Rate</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {QUIZ_DATA.map((row) => (
                  <tr key={row.title} className="hover:bg-slate-50/70 transition-colors duration-100">
                    <td className="px-6 py-4 font-medium text-slate-800">{row.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Users size={13} className="text-slate-400" />
                        {row.students > 0 ? row.students : '—'}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
