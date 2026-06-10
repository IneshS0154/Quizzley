import { useState } from 'react';

export default function AdminDashboardPage({ setCurrentPage, role }) {
  const [activeTab, setActiveTab] = useState('All');
  const [quizzesData] = useState(() => {
    const localQuizzes = localStorage.getItem('mockQuizzes');
    if (localQuizzes) {
      const parsed = JSON.parse(localQuizzes);
      return parsed.map(quiz => {
        let percent = 0;
        if (quiz.participation && quiz.participation !== '—') {
          const parts = quiz.participation.split('/');
          if (parts.length === 2) {
            const num = parseFloat(parts[0].trim());
            const den = parseFloat(parts[1].trim());
            if (den > 0) percent = Math.round((num / den) * 100);
          }
        }
        return {
          title: quiz.title,
          department: quiz.assignedClass,
          time: quiz.timeDate,
          participation: quiz.participation,
          percent: percent,
          status: quiz.status
        };
      });
    }
    return [];
  });

  const userRole = role || localStorage.getItem('role');
  let profileName = 'Admin User';
  let profileRole = 'System Manager';
  let profileInitials = 'AU';

  if (userRole === 'ADMIN') {
    profileName = 'System Admin';
    profileRole = 'System Manager';
    profileInitials = 'SA';
  } else if (userRole === 'QUIZ_MANAGER') {
    profileRole = 'Quiz Manager';
    const token = localStorage.getItem('token');
    if (token && token.startsWith('mock-token-')) {
      const email = token.replace('mock-token-', '');
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const user = mockUsers.find(u => u.email === email);
      if (user && user.fullName) {
        profileName = user.fullName;
        profileInitials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
      } else {
        profileName = 'Quiz Manager';
        profileInitials = 'QM';
      }
    } else {
      profileName = 'Quiz Manager';
      profileInitials = 'QM';
    }
  }



  // Compute stats dynamically
  const totalCount = quizzesData.length;
  const activeCount = quizzesData.filter(q => q.status === 'Live').length;
  const completedCount = quizzesData.filter(q => q.status === 'Completed').length;
  
  const stats = [
    { label: 'Total Quizzes', value: String(totalCount), trend: totalCount > 0 ? `+${totalCount}` : '—', type: 'blue' },
    { label: 'Active Quizzes', value: String(activeCount), trend: activeCount > 0 ? 'Live' : '—', type: 'indigo' },
    { label: 'Completed Submissions', value: String(completedCount), trend: completedCount > 0 ? 'Done' : '—', type: 'green' },
    { label: 'Avg System Score', value: totalCount > 0 ? '84%' : '—', trend: totalCount > 0 ? '+2.4%' : '—', type: 'red' }
  ];

  const filteredQuizzes = quizzesData.filter(quiz => {
    if (activeTab === 'All') return true;
    return quiz.status === activeTab;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen animate-fade-in-up">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        {/* Search */}
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search quizzes, users, or reports..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-xs font-semibold"
          />
        </div>

        {/* Right Info */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Help */}
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">{profileName}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{profileRole}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center border-2 border-white shadow-sm text-sm">
              {profileInitials}
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-8 sm:p-10">
        
        {/* Banner Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Overview of system quizzes, users, and recent activity.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer shadow-sm">
              <option>All Departments</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>Arts</option>
            </select>
            {role !== 'ADMIN' && (
              <button 
                onClick={() => setCurrentPage('quizzes')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:bg-blue-800 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  stat.type === 'green' ? 'bg-emerald-50 text-emerald-600' :
                  stat.type === 'red' ? 'bg-rose-50 text-rose-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <div className={`absolute bottom-0 left-0 w-full h-[3px] ${
                stat.type === 'green' ? 'bg-emerald-500' :
                stat.type === 'red' ? 'bg-rose-500' :
                'bg-blue-600'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Managed Quizzes (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between">
              
              {/* Header & Tabs */}
              <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-extrabold text-slate-900">Managed Quizzes</h2>
                  <button 
                    onClick={() => setCurrentPage('quizzes')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    View All
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="flex space-x-2 border-b border-slate-100 pb-3">
                  {['All', 'Live', 'Scheduled', 'Completed'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTab === tab 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Quiz Title</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Time Remaining</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Participation</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuizzes.length > 0 ? (
                      filteredQuizzes.map((quiz, index) => (
                        <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900 text-sm">{quiz.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-semibold text-xs">{quiz.department}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-medium text-xs">{quiz.time}</span>
                          </td>
                          <td className="px-6 py-4">
                            {quiz.participation !== '—' ? (
                              <div className="flex items-center space-x-3">
                                <span className="text-slate-700 font-bold text-xs shrink-0 w-10">{quiz.participation}</span>
                                <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${quiz.percent}%` }}></div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              quiz.status === 'Live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              quiz.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                              'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {quiz.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm font-medium">
                          No quizzes found in this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warning alerts at bottom */}
            {quizzesData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* High Participation */}
                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 flex items-start space-x-4">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">High Participation Alert</h4>
                    <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed">
                      Physics Chapter 3 Quiz has the highest participation. 22 out of 30 assigned users have submitted so far. Monitor server load if concurrent submissions spike.
                    </p>
                  </div>
                </div>

                {/* Time Sensitive */}
                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex items-start space-x-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Upcoming Time-Sensitive</h4>
                    <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed">
                      2 quizzes are ending in the next 30 minutes. Consider monitoring live progress for 'Midterm Assessment' and 'Weekly Math Practice'.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* System Activity Feed (1/3 width) */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 flex flex-col justify-between h-fit">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-extrabold text-slate-950">System Activity</h3>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>

              {/* Feed List */}
              <div className="text-center py-12 text-slate-400 text-xs font-semibold border border-dashed border-slate-100 rounded-2xl">
                No recent activity
              </div>
            </div>

            {/* Button */}
            <button className="w-full mt-8 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm">
              View Full Log
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
