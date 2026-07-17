import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FileQuestion,
  Users,
  Zap,
  CheckCircle2,
  Plus,
  BarChart3,
  Clock,
  ChevronRight,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const stats = [
  {
    label: 'Total Quizzes',
    value: '12',
    icon: FileQuestion,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    change: '+2 this week',
    changeColor: 'text-blue-500',
  },

  {
    label: 'Live Now',
    value: '2',
    icon: Zap,
    color: 'text-green-600',
    bg: 'bg-green-50',
    change: 'Active sessions',
    changeColor: 'text-green-500',
  },
  {
    label: 'Completed Today',
    value: '5',
    icon: CheckCircle2,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    change: '3 pending review',
    changeColor: 'text-amber-500',
  },
];

const recentActivity = [
  {
    id: 1,
    title: 'Data Structures Mid-Term',
    module: 'CS301',
    status: 'Live',
    submissions: 24,
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'Algorithms Practice Set 3',
    module: 'CS302',
    status: 'Completed',
    submissions: 38,
    time: '5 hours ago',
  },
  {
    id: 3,
    title: 'Database Normalization Quiz',
    module: 'CS401',
    status: 'Scheduled',
    submissions: 0,
    time: 'Tomorrow 9:00 AM',
  },
  {
    id: 4,
    title: 'OS Concepts — Chapter 4',
    module: 'CS403',
    status: 'Draft',
    submissions: 0,
    time: 'Just now',
  },
];

const statusStyles = {
  Live: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Scheduled: 'bg-amber-100 text-amber-700',
  Draft: 'bg-slate-100 text-slate-600',
};

export default function DashboardHome() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem="dashboard" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Good morning{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Here&apos;s what&apos;s happening with your quizzes today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg, change, changeColor }) => (
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
                <p className={`text-xs mt-1 font-medium ${changeColor}`}>{change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-800">Recent Quizzes</h2>
              <button
                onClick={() => navigate('/admin/quizzes')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <FileQuestion size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.module}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-500">{item.submissions} submissions</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center justify-end gap-1">
                        <Clock size={10} /> {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-5">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/create-quiz')}
                className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 px-4 rounded-xl transition-colors duration-150 cursor-pointer"
              >
                <Plus size={18} />
                Create New Quiz
              </button>
              <button
                onClick={() => navigate('/admin/analytics')}
                className="w-full flex items-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm py-3 px-4 rounded-xl transition-colors duration-150 cursor-pointer border border-slate-200"
              >
                <BarChart3 size={18} className="text-slate-500" />
                View Analytics
              </button>

            </div>

            {/* Tip card */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-blue-700 mb-1">💡 Pro Tip</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enable Focus Mode on your quizzes to prevent students from switching tabs during a session.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
