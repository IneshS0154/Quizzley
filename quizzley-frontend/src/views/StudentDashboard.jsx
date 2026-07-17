import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BookOpen,
  LogOut,
  Clock,
  CheckCircle,
  Play,
  FileQuestion,
  Bell,
  Award,
} from 'lucide-react';
import { logout } from '../store/authSlice';
import api from '../api/axios';
=======
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { quizzesApi, attemptsApi } from '../services/api';
import { GraduationCap, LogOut, FileText, CheckCircle2, Clock, Award, PlayCircle } from 'lucide-react';
>>>>>>> Stashed changes

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

<<<<<<< Updated upstream
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to load quizzes from backend
    const fetchStudentQuizzes = async () => {
      try {
        const { data } = await api.get('/api/admin/quizzes'); // fallback to admin quizzes
        setQuizzes(data);
      } catch (err) {
        // Fallback to mock data if API fails or is empty
        setQuizzes([
          {
            quizId: 1,
            title: 'Midterm Evaluation Quiz 01',
            description: 'Covers core OOP concepts, polymorphism, and inheritance.',
            timerMinutes: 45,
            quizType: 'MOCK',
            status: 'AVAILABLE',
          },
          {
            quizId: 2,
            title: 'Java Fundamentals Practice Test',
            description: 'Basic syntax, control flow, loops, and arrays.',
            timerMinutes: 30,
            quizType: 'PRACTICE',
            status: 'COMPLETED',
            score: '85%',
          },
          {
            quizId: 3,
            title: 'Group Quiz - Web Engineering',
            description: 'Collab session for Frontend and REST design principles.',
            timerMinutes: 60,
            quizType: 'GROUP',
            status: 'AVAILABLE',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentQuizzes();
  }, []);

=======
  // States
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const quizList = await quizzesApi.getQuizzes('STUDENT');
      setQuizzes(quizList);
      
      const attemptList = await attemptsApi.getAttempts();
      setAttempts(attemptList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartQuiz = (quizId) => {
    navigate(`/student/quiz/attempt/${quizId}`);
  };

>>>>>>> Stashed changes
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600 tracking-tight">Quizzley</span>
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
              Student Portal
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{user?.fullName || 'Student User'}</p>
              <p className="text-xs text-slate-400">{user?.email || 'student@quizzley.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Welcome Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-md shadow-blue-600/10 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Hello, {user?.fullName || 'Student'}!
            </h1>
            <p className="text-blue-100 text-sm md:text-base mt-2 max-w-xl">
              Ready to test your knowledge? Choose from the available practice tests or assignments below.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-xl text-center border border-white/10">
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-blue-100 mt-1">Pending Quiz</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-xl text-center border border-white/10">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-blue-100 mt-1">Average Score</p>
            </div>
          </div>
        </div>

        {/* Quizzes Section */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
            <FileQuestion className="text-blue-600" size={20} /> My Quizzes & Tests
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white h-48 rounded-2xl border border-slate-100 shadow-sm animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => {
                const isCompleted = quiz.status === 'COMPLETED';
                return (
                  <div
                    key={quiz.quizId}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            quiz.quizType === 'PRACTICE'
                              ? 'bg-blue-50 text-blue-600'
                              : quiz.quizType === 'MOCK'
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {quiz.quizType}
                        </span>

                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
                            <CheckCircle size={12} /> Passed ({quiz.score})
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-800 leading-tight mb-2 hover:text-blue-600 transition">
                        {quiz.title}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                        {quiz.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Clock size={14} />
                        <span>{quiz.timerMinutes} mins</span>
                      </div>

                      {isCompleted ? (
                        <button className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg cursor-not-allowed">
                          <Award size={14} /> Completed
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate(`/student/take-quiz/${quiz.quizId}`)}
                          className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
                        >
                          <Play size={12} /> Start Quiz
                        </button>
                      )}
=======
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-900/10 rounded-full filter blur-[128px]"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-900/10 rounded-full filter blur-[128px]"></div>

      {/* Main Header navigation */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur px-8 py-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-xl">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Quizzley
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-200">{user?.fullName}</p>
            <p className="text-[10px] text-slate-400 font-medium">
              {user?.specializationName} • {user?.batchName}
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded-xl transition-all text-red-400"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 z-10">
        
        {/* Left/Middle side: Assigned Quizzes */}
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
            <FileText className="text-blue-500 h-5 w-5" /> Available Assessments
          </h2>
          
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading quizzes...</div>
          ) : quizzes.length === 0 ? (
            <div className="p-8 text-center border border-slate-850 rounded-2xl bg-slate-900/20 text-slate-500">
              No assessments assigned to your batch at this moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.map((quiz) => {
                const hasAttempted = attempts.some(a => a.quizId === quiz.quizId);
                return (
                  <div key={quiz.quizId} className="border border-slate-850 hover:border-slate-800 bg-slate-900/40 rounded-3xl p-5 flex flex-col justify-between hover:shadow-xl transition-all group">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 px-2 py-0.5 bg-teal-500/10 border border-teal-500/10 rounded-md">
                          {quiz.quizType}
                        </span>
                        {hasAttempted && (
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">{quiz.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{quiz.description}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center text-slate-400 text-xs gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{quiz.timerMinutes ? `${quiz.timerMinutes} mins` : 'No limit'}</span>
                      </div>
                      
                      <button
                        onClick={() => handleStartQuiz(quiz.quizId)}
                        disabled={hasAttempted && quiz.quizType !== 'PRACTICE'}
                        className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-xl transition-all active:scale-[0.98] ${
                          hasAttempted && quiz.quizType !== 'PRACTICE'
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10'
                        }`}
                      >
                        <PlayCircle className="h-4.5 w-4.5" />
                        <span>{hasAttempted ? 'Re-attempt' : 'Start Attempt'}</span>
                      </button>
>>>>>>> Stashed changes
                    </div>
                  </div>
                );
              })}
            </div>
          )}
<<<<<<< Updated upstream
        </div>
=======
        </section>

        {/* Right side: Student attempts history log */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
            <Award className="text-teal-500 h-5 w-5" /> Score History
          </h2>

          <div className="border border-slate-850 bg-slate-900/40 rounded-3xl p-5 divide-y divide-slate-850">
            {loading ? (
              <div className="py-4 text-center text-slate-400">Loading attempt history...</div>
            ) : attempts.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">You haven't attempted any quizzes yet.</div>
            ) : (
              attempts.map((attempt) => {
                const pct = ((attempt.obtainedMarks / attempt.totalMarks) * 100).toFixed(0);
                return (
                  <div key={attempt.attemptId} className="py-3.5 first:pt-0 last:pb-0 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-slate-200 truncate w-44">{attempt.quizTitle}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(attempt.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${Number(pct) >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {attempt.obtainedMarks} / {attempt.totalMarks}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{pct}% Score</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
>>>>>>> Stashed changes
      </main>
    </div>
  );
}
