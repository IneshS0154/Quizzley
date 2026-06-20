import React, { useEffect, useState } from 'react';
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

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
