

import { useEffect, useState } from 'react';
import Header from './Header';

export default function DashboardPage({ setCurrentPage, profile }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/student/dashboard/summary', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to load dashboard data from backend');
        }
        const summary = await response.json();
        setData(summary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-[#F8FAFC] min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Failed to Load Dashboard</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { profile: dbProfile, stats, liveQuiz, upcomingQuizzes, recentlyCompleted, recentlyMissed } = data;

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen flex flex-col animate-fade-in-up">
      <Header profile={profile} setCurrentPage={setCurrentPage} />
      <div className="p-8 sm:p-10 flex-1 overflow-y-auto">
        {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, {dbProfile.fullName}</h1>
          <p className="text-sm text-slate-450 mt-1.5 font-medium">Here's what you need to know today.</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">{todayStr}</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* GPA / Average Score Card */}
        <div 
          className="bg-[#EEF2FF] border border-[#E0E7FF] p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '50ms' }}
        >
          <span className="text-[11px] font-bold text-[#6366F1] uppercase tracking-wider">Average score</span>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-extrabold text-[#4F46E5] tracking-tight">{stats.averageScore}</span>
            <span className="text-sm font-bold text-[#4F46E5] ml-1">%</span>
          </div>
        </div>

        {/* Quizzes Attempted Card */}
        <div 
          className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quizzes attempted</span>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.quizzesAttempted}</span>
          </div>
        </div>

        {/* Upcoming Quizzes Card */}
        <div 
          className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upcoming quizzes</span>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.upcomingQuizzes}</span>
          </div>
        </div>

        {/* Missed Quizzes Card */}
        <div 
          className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Missed quizzes</span>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.missedQuizzes}</span>
          </div>
        </div>
      </div>

      {/* Live Quiz Banner Section */}
      {liveQuiz ? (
        <div 
          className="bg-white border border-slate-150 border-l-4 border-l-emerald-500 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shadow-sm animate-fade-in-up"
          style={{ animationDelay: '250ms' }}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-xs font-bold text-emerald-600 tracking-wider flex items-center space-x-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1"></span>
              LIVE QUIZ
            </span>
            <h2 className="text-xl font-bold text-slate-900">{liveQuiz.title}</h2>
            <p className="text-xs font-semibold text-slate-400">{liveQuiz.subject}</p>
          </div>
          <div className="flex items-center space-x-4 self-end md:self-auto">
            <span className="text-xs font-bold text-amber-600 bg-amber-50/80 border border-amber-100 px-3.5 py-1.5 rounded-full">{liveQuiz.timeLeft}</span>
            <button 
              onClick={() => setCurrentPage('quizzes')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 active-spring cursor-pointer"
            >
              Take Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-150 border-l-4 border-l-slate-300 rounded-2xl p-5 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center space-x-3 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">No Active Live Quizzes Right Now</span>
          </div>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Upcoming Quizzes */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">Upcoming Quizzes</h2>
          <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 shadow-sm overflow-hidden">
            {upcomingQuizzes.length > 0 ? (
              upcomingQuizzes.map((quiz, idx) => (
                <div 
                  key={quiz.quizId} 
                  className="p-6 hover:bg-slate-50/40 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${300 + idx * 75}ms` }}
                >
                  <h3 className="font-bold text-slate-900 text-sm">{quiz.title}</h3>
                  <p className="text-xs font-semibold text-slate-450 mt-1.5">{quiz.subject} • {quiz.time}</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-2.5">{quiz.questionsCount} Questions</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-slate-400 font-semibold text-xs">No upcoming quizzes scheduled.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Completed and Missed */}
        <div className="space-y-6">
          
          {/* Recently Completed */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Recently Completed</h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 shadow-sm overflow-hidden">
              {recentlyCompleted.length > 0 ? (
                recentlyCompleted.map((result, idx) => (
                  <div 
                    key={result.attemptId} 
                    onClick={() => setCurrentPage('results')}
                    className="p-5 flex items-center justify-between hover:bg-slate-50/40 transition-colors cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${300 + idx * 75}ms` }}
                  >
                    <div>
                      <h3 className="font-bold text-slate-850 text-xs">{result.title}</h3>
                      <p className="text-[11px] font-semibold text-slate-450 mt-1">{result.submittedAt} • {result.scoreInfo}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-350" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-slate-400 font-semibold text-xs">No completed quizzes yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recently Missed */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Recently Missed</h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 shadow-sm overflow-hidden">
              {recentlyMissed.length > 0 ? (
                recentlyMissed.map((quiz, idx) => (
                  <div 
                    key={quiz.quizId} 
                    onClick={() => setCurrentPage('quizzes')}
                    className="p-5 flex items-center justify-between hover:bg-slate-50/40 transition-colors cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${300 + idx * 75}ms` }}
                  >
                    <div>
                      <h3 className="font-bold text-slate-850 text-xs">{quiz.title}</h3>
                      <p className="text-[11px] font-semibold text-slate-450 mt-1">{quiz.time}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-350" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-slate-400 font-semibold text-xs">Great job! No missed quizzes found.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
}
