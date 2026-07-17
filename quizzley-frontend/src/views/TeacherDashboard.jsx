import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
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
=======
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { quizzesApi } from '../services/api';
import {
  GraduationCap, LayoutDashboard, FileText, Users, BarChart3,
  Bell, Settings, HelpCircle, LogOut, Search, ChevronDown,
  Plus, Check, X, Calendar, Clock, Eye, Edit, Trash2, ArrowLeft
} from 'lucide-react';
>>>>>>> Stashed changes

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
<<<<<<< Updated upstream
  const reduxQuizzes = useSelector((state) => state.quiz.quizzes);
  const loading = useSelector((state) => state.quiz.loading);
  const quizzes = reduxQuizzes.length > 0 ? reduxQuizzes : HARDCODED_QUIZZES;

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
=======
  const { user } = useSelector((state) => state.auth);

  // States
  const [quizzes, setQuizzes] = useState([]);
  const [filterTab, setFilterTab] = useState('All'); // All, Live, Draft, Scheduled, Completed
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal / Editor State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizDesc, setNewQuizDesc] = useState('');
  const [newQuizType, setNewQuizType] = useState('MOCK');
  const [newQuizTimer, setNewQuizTimer] = useState(30);
  const [newQuizModule, setNewQuizModule] = useState(1);
  const [newQuizSpec, setNewQuizSpec] = useState(1);
  const [newQuizBatch, setNewQuizBatch] = useState(1);
  const [newQuizQuestions, setNewQuizQuestions] = useState([]);

  // Question Form State
  const [qText, setQText] = useState('');
  const [qType, setQType] = useState('MCQ');
  const [qMarks, setQMarks] = useState(1);
  const [qOptions, setQOptions] = useState([
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false }
  ]);

  // Fetch quizzes
  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const data = await quizzesApi.getQuizzes('ADMIN');
      setQuizzes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Add Question to list
  const handleAddQuestion = () => {
    if (!qText.trim()) return;
    const newQ = {
      questionText: qText,
      questionType: qType,
      marks: Number(qMarks),
      options: qOptions.filter(o => o.optionText.trim() !== '')
    };
    setNewQuizQuestions([...newQuizQuestions, newQ]);
    // Reset Question Form
    setQText('');
    setQMarks(1);
    setQOptions([
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false }
    ]);
  };

  // Save Quiz DTO
  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) return;

    const quizDto = {
      title: newQuizTitle,
      description: newQuizDesc,
      quizType: newQuizType,
      timerMinutes: Number(newQuizTimer),
      moduleId: Number(newQuizModule),
      specializationId: Number(newQuizSpec),
      batchId: Number(newQuizBatch),
      isActive: true,
      questions: newQuizQuestions
    };

    try {
      await quizzesApi.saveQuiz(quizDto);
      setShowCreateModal(false);
      loadQuizzes();
      // Reset
      setNewQuizTitle('');
      setNewQuizDesc('');
      setNewQuizQuestions([]);
    } catch (err) {
      alert(err.message || 'Failed to save quiz');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      await quizzesApi.deleteQuiz(quizId);
      loadQuizzes();
    }
  };

  // Filter Logic
  const filteredQuizzes = quizzes.filter(quiz => {
    // Search query matches title or module
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quiz.moduleCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Class Match
    let matchesClass = true;
    if (selectedClass !== 'All') {
      const cls = selectedClass.split('-');
      const specId = cls[0] === 'SE' ? 1 : 2;
      const batchId = cls[1] === 'Y1' ? 1 : 2;
      matchesClass = quiz.specializationId === specId && quiz.batchId === batchId;
    }

    // Status Tab Match
    let matchesTab = true;
    if (filterTab !== 'All') {
      matchesTab = quiz.status.toLowerCase() === filterTab.toLowerCase();
    }

    return matchesSearch && matchesClass && matchesTab;
  });

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6">
        <div>
          {/* Brand header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Quizzley
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Admin Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
              <LayoutDashboard className="h-4.5 w-4.5" />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/10 transition-colors">
              <FileText className="h-4.5 w-4.5" />
              <span>Quizzes</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
              <Users className="h-4.5 w-4.5" />
              <span>Students</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
              <BarChart3 className="h-4.5 w-4.5" />
              <span>Analytics</span>
            </button>
          </nav>
        </div>

        {/* Footer Navigation items */}
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
            <Bell className="h-4.5 w-4.5" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
            <Settings className="h-4.5 w-4.5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
            <span>Help & Support</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-xl text-red-400 hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/10"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="p-8 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Quizzes</h1>
            <p className="text-sm text-slate-400 mt-1">Manage all assessments across departments.</p>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Quiz</span>
          </button>
        </header>

        {/* Filters and Tabs */}
        <section className="px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tabs */}
          <div className="flex border border-slate-800 p-1.5 rounded-2xl bg-slate-900/50 backdrop-blur">
            {['All', 'Live', 'Draft', 'Scheduled', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  (filterTab === tab) 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'All' ? 'All Quizzes' : tab}
>>>>>>> Stashed changes
              </button>
            ))}
          </div>

<<<<<<< Updated upstream
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
                              onClick={() => setOpenMenu(null)}
                            >
                              Edit Quiz
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                              onClick={() => setOpenMenu(null)}
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
=======
          {/* Search and Dropdowns */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none bg-slate-900 border border-slate-800 rounded-2xl pl-4 pr-10 py-2.5 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Classes</option>
                <option value="SE-Y1">Software Engineering (Y1)</option>
                <option value="CS-Y1">Cyber Security (Y1)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Quizzes Table Area */}
        <section className="flex-1 px-8 pb-8">
          <div className="border border-slate-800 rounded-3xl bg-slate-900/40 backdrop-blur overflow-hidden shadow-2xl">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading assessments...</div>
            ) : filteredQuizzes.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No quizzes match your filters.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    <th className="px-6 py-4">Quiz Title</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Time / Date</th>
                    <th className="px-6 py-4 text-center">Participation</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredQuizzes.map((quiz) => {
                    const statusColor = 
                      quiz.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' :
                      quiz.status === 'Draft' ? 'bg-slate-500/10 text-slate-400 border-slate-500/10' :
                      quiz.status === 'Scheduled' ? 'bg-amber-500/10 text-amber-400 border-amber-500/10' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/10';

                    return (
                      <tr key={quiz.quizId} className="hover:bg-slate-900/30 transition-colors group">
                        <td className="px-6 py-4.5">
                          <div>
                            <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{quiz.title}</span>
                            <span className="block text-[10px] text-slate-500 font-semibold mt-0.5">{quiz.moduleCode} — {quiz.moduleName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-slate-300">
                          {quiz.specializationName ? `${quiz.specializationName.split(' ')[0]} - ${quiz.batchName}` : 'All'}
                        </td>
                        <td className="px-6 py-4.5 text-slate-300 text-xs font-mono">
                          {quiz.availableFrom ? `${new Date(quiz.availableFrom).toLocaleDateString()} (${new Date(quiz.availableFrom).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})` : '—'}
                        </td>
                        <td className="px-6 py-4.5 text-center text-slate-300 font-medium">
                          {quiz.status === 'Draft' ? '—' : `${quiz.participationCount} / ${quiz.totalParticipants}`}
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`inline-flex px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider ${statusColor}`}>
                            {quiz.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right">
                          <div className="flex justify-end gap-2">
                            {quiz.status === 'Draft' ? (
                              <button className="text-xs text-blue-400 hover:text-blue-300 font-semibold px-3 py-1.5 hover:bg-slate-800 rounded-lg transition-all">
                                Continue Editing
                              </button>
                            ) : quiz.status === 'Live' ? (
                              <button className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold px-3 py-1.5 hover:bg-slate-800 rounded-lg transition-all">
                                Monitor
                              </button>
                            ) : (
                              <button className="text-xs text-slate-300 hover:text-white font-semibold px-3 py-1.5 hover:bg-slate-800 rounded-lg transition-all">
                                View Results
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteQuiz(quiz.quizId)}
                              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-xs text-slate-400">
              <span>Showing 1 to {filteredQuizzes.length} of {quizzes.length} quizzes</span>
              <div className="flex gap-1.5 font-semibold">
                <button className="p-1 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors">&lt;</button>
                <button className="px-2.5 py-1 bg-blue-600 text-white rounded-lg shadow-sm">1</button>
                <button className="px-2.5 py-1 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors">2</button>
                <button className="p-1 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors">&gt;</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. CREATE NEW QUIZ PANEL / MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-screen bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col p-8 overflow-y-auto transform transition-transform animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="text-blue-500" /> Create Assessment
                </h2>
                <p className="text-xs text-slate-400">Add assessment details and questions.</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuiz} className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* General Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">General Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-300">Quiz Title</label>
                      <input
                        type="text"
                        required
                        value={newQuizTitle}
                        onChange={(e) => setNewQuizTitle(e.target.value)}
                        placeholder="e.g. Midterm Assessment - Algebra"
                        className="mt-1 block w-full px-4 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-300">Description</label>
                      <textarea
                        value={newQuizDesc}
                        onChange={(e) => setNewQuizDesc(e.target.value)}
                        placeholder="Describe the topics covered..."
                        rows={2}
                        className="mt-1 block w-full px-4 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Configurations */}
                <div className="space-y-4 pt-4 border-t border-slate-800/60">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Configuration</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Timer (Minutes)</label>
                      <input
                        type="number"
                        value={newQuizTimer}
                        onChange={(e) => setNewQuizTimer(e.target.value)}
                        className="mt-1 block w-full px-4 py-2.5 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Module</label>
                      <select
                        value={newQuizModule}
                        onChange={(e) => setNewQuizModule(e.target.value)}
                        className="mt-1 block w-full px-3 py-2.5 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">Database Systems (DBS101)</option>
                        <option value="4">Programming Fundamentals (PF101)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Target Specialization</label>
                      <select
                        value={newQuizSpec}
                        onChange={(e) => setNewQuizSpec(e.target.value)}
                        className="mt-1 block w-full px-3 py-2.5 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">Software Engineering</option>
                        <option value="2">Cyber Security</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Question Creator */}
                <div className="space-y-4 pt-4 border-t border-slate-800/60">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Questions ({newQuizQuestions.length})
                    </h3>
                  </div>

                  {/* List of current questions */}
                  {newQuizQuestions.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-800 p-3 rounded-2xl bg-slate-950/20">
                      {newQuizQuestions.map((q, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs p-2 bg-slate-900 border border-slate-800/60 rounded-xl">
                          <span className="font-medium text-slate-300 truncate w-5/6">Q{idx+1}: {q.questionText}</span>
                          <button 
                            type="button"
                            onClick={() => setNewQuizQuestions(newQuizQuestions.filter((_, i) => i !== idx))}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Question Panel */}
                  <div className="p-4 border border-slate-800/60 rounded-2xl bg-slate-950/30 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400">Question Text</label>
                      <input
                        type="text"
                        value={qText}
                        onChange={(e) => setQText(e.target.value)}
                        placeholder="e.g. What is the value of pi?"
                        className="mt-1 block w-full px-3 py-2 border border-slate-800 rounded-xl bg-slate-950/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400">Marks</label>
                        <input
                          type="number"
                          value={qMarks}
                          onChange={(e) => setQMarks(e.target.value)}
                          className="mt-1 block w-full px-3 py-1.5 border border-slate-800 rounded-xl bg-slate-950/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400">Type</label>
                        <select
                          value={qType}
                          onChange={(e) => setQType(e.target.value)}
                          className="mt-1 block w-full px-3 py-1.5 border border-slate-800 rounded-xl bg-slate-950/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                        >
                          <option value="MCQ">Multiple Choice</option>
                          <option value="TRUE_FALSE">True / False</option>
                        </select>
                      </div>
                    </div>

                    {/* Options Form */}
                    {qType === 'MCQ' && (
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-400">Options (Check correct option)</label>
                        {qOptions.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={opt.isCorrect}
                              onChange={(e) => {
                                const newOpts = qOptions.map((o, i) => ({
                                  ...o,
                                  isCorrect: i === oIdx ? e.target.checked : false // single choice MCQ
                                }));
                                setQOptions(newOpts);
                              }}
                              className="rounded border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-slate-950"
                            />
                            <input
                              type="text"
                              value={opt.optionText}
                              onChange={(e) => {
                                const newOpts = [...qOptions];
                                newOpts[oIdx].optionText = e.target.value;
                                setQOptions(newOpts);
                              }}
                              placeholder={`Option ${oIdx + 1}`}
                              className="block w-full px-3 py-1.5 border border-slate-800/80 rounded-xl bg-slate-950/50 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {qType === 'TRUE_FALSE' && (
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setQOptions([
                            { optionText: 'True', isCorrect: true },
                            { optionText: 'False', isCorrect: false }
                          ])}
                          className={`flex-1 py-2 border rounded-xl text-xs font-semibold transition-all ${
                            qOptions[0]?.optionText === 'True' && qOptions[0]?.isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-slate-800 text-slate-400'
                          }`}
                        >
                          True is Correct
                        </button>
                        <button
                          type="button"
                          onClick={() => setQOptions([
                            { optionText: 'True', isCorrect: false },
                            { optionText: 'False', isCorrect: true }
                          ])}
                          className={`flex-1 py-2 border rounded-xl text-xs font-semibold transition-all ${
                            qOptions[1]?.optionText === 'False' && qOptions[1]?.isCorrect
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-slate-800 text-slate-400'
                          }`}
                        >
                          False is Correct
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="w-full py-2 border border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-xs text-slate-300 font-semibold transition-colors flex items-center justify-center gap-1.5 hover:bg-slate-800/20"
                    >
                      <Plus className="h-4 w-4" /> Add Question to List
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-800 flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-3 border border-slate-800 hover:border-slate-750 hover:bg-slate-800 rounded-2xl text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-semibold shadow-lg shadow-blue-600/15 transition-all"
                >
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
}
