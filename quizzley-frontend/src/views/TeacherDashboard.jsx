import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreVertical,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { setQuizzes, setLoading, setError } from '../store/quizSlice';
import api from '../api/axios';

const HARDCODED_QUIZZES = [
  {
    id: 1,
    title: 'Data Structures Mid-Term',
    module: 'CS301 — Data Structures',
    startTime: 'Jun 18, 2026 09:00 AM',
    endTime: 'Jun 18, 2026 10:30 AM',
    status: 'Completed',
    submissions: 34,
  },
  {
    id: 2,
    title: 'Algorithms Practice Set 3',
    module: 'CS302 — Algorithms',
    startTime: 'Jun 20, 2026 02:00 PM',
    endTime: 'Jun 20, 2026 03:00 PM',
    status: 'Live',
    submissions: 19,
  },
  {
    id: 3,
    title: 'Database Normalization Quiz',
    module: 'CS401 — Database Systems',
    startTime: 'Jun 22, 2026 09:00 AM',
    endTime: 'Jun 22, 2026 10:00 AM',
    status: 'Scheduled',
    submissions: 0,
  },
  {
    id: 4,
    title: 'OS Concepts — Chapter 4',
    module: 'CS403 — Operating Systems',
    startTime: '—',
    endTime: '—',
    status: 'Draft',
    submissions: 0,
  },
  {
    id: 5,
    title: 'Computer Networks Basics',
    module: 'CS404 — Computer Networks',
    startTime: 'Jun 25, 2026 11:00 AM',
    endTime: 'Jun 25, 2026 12:00 PM',
    status: 'Scheduled',
    submissions: 0,
  },
];

const STATUS_STYLES = {
  Live: 'bg-green-100 text-green-700 border border-green-200',
  Draft: 'bg-slate-100 text-slate-600 border border-slate-200',
  Completed: 'bg-blue-100 text-blue-700 border border-blue-200',
  Scheduled: 'bg-amber-100 text-amber-700 border border-amber-200',
};

const TABS = ['All Quizzes', 'Drafts', 'Live', 'Completed', 'Scheduled'];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxQuizzes = useSelector((state) => state.quiz.quizzes);
  const loading = useSelector((state) => state.quiz.loading);
  const [hasFetched, setHasFetched] = useState(false);
  const quizzes = hasFetched ? reduxQuizzes : HARDCODED_QUIZZES;

  useEffect(() => {
    const fetchQuizzes = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await api.get('/api/admin/quizzes');
        const mapped = data.map((q) => {
          let status = 'Live';
          if (!q.isActive) {
            status = 'Draft';
          } else if (q.availableFrom && q.availableUntil) {
            const now = new Date();
            const from = new Date(q.availableFrom);
            const until = new Date(q.availableUntil);
            if (now < from) {
              status = 'Scheduled';
            } else if (now > until) {
              status = 'Completed';
            } else {
              status = 'Live';
            }
          }
          return {
            id: q.quizId,
            title: q.title,
            module: q.module ? `${q.module.moduleCode} — ${q.module.moduleName}` : 'General',
            startTime: q.availableFrom ? new Date(q.availableFrom).toLocaleString() : '—',
            endTime: q.availableUntil ? new Date(q.availableUntil).toLocaleString() : '—',
            status: status,
            submissions: q.submissions || 0,
          };
        });
        dispatch(setQuizzes(mapped));
        setHasFetched(true);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchQuizzes();
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState('All Quizzes');
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState(null);

  const handleDeleteQuiz = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await api.delete(`/api/admin/quizzes/${id}`);
        const updatedQuizzes = reduxQuizzes.filter((q) => q.id !== id);
        dispatch(setQuizzes(updatedQuizzes));
      } catch (err) {
        console.error('Failed to delete quiz:', err);
        alert('Failed to delete quiz. Please try again.');
      }
    }
  };

  const filtered = quizzes.filter((q) => {
    const matchTab =
      activeTab === 'All Quizzes' ||
      q.status === activeTab.replace('s', '') ||
      q.status === activeTab.slice(0, -1) ||
      activeTab === q.status + 's' ||
      q.status === activeTab;
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // Simple tab filter
  const tabFiltered = filtered.filter((q) => {
    if (activeTab === 'All Quizzes') return true;
    const tabMap = {
      Drafts: 'Draft',
      Live: 'Live',
      Completed: 'Completed',
      Scheduled: 'Scheduled',
    };
    return q.status === tabMap[activeTab];
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem="quizzes" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Quizzes</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage and monitor all your quizzes</p>
          </div>
          <button
            onClick={() => navigate('/admin/create-quiz')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-colors duration-150 cursor-pointer"
          >
            <Plus size={16} />
            Create New Quiz
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-slate-100 px-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors duration-150 cursor-pointer ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-50">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search quizzes…"
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer">
              <SlidersHorizontal size={15} />
              Filter
              <ChevronDown size={13} className="text-slate-400" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Quiz Title
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tabFiltered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No quizzes found.
                    </td>
                  </tr>
                ) : (
                  tabFiltered.map((quiz) => (
                    <tr
                      key={quiz.id}
                      className="hover:bg-slate-50/70 transition-colors duration-100"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{quiz.title}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{quiz.module}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{quiz.startTime}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{quiz.endTime}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[quiz.status]}`}
                        >
                          {quiz.status === 'Live' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                          )}
                          {quiz.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{quiz.submissions}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === quiz.id ? null : quiz.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenu === quiz.id && (
                          <div className="absolute right-6 top-10 z-10 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-40">
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                              onClick={() => setOpenMenu(null)}
                            >
                              View Details
                            </button>
                             <button
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                              onClick={() => {
                                setOpenMenu(null);
                                navigate(`/admin/edit-quiz/${quiz.id}`);
                              }}
                            >
                              Edit Quiz
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                              onClick={() => {
                                setOpenMenu(null);
                                handleDeleteQuiz(quiz.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer row */}
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {tabFiltered.length} of {quizzes.length} quizzes</span>
          </div>
        </div>
      </main>
    </div>
  );
}
