

export default function DashboardPage({ setCurrentPage }) {
  // Mock data for student dashboard
  const stats = [
    { label: 'Cumulative GPA', value: '3.85', max: '/ 4.00', color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
    { label: 'Quizzes Completed', value: '12', max: '', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { label: 'Average Score', value: '84%', max: '', color: 'text-amber-600', bg: 'bg-amber-50/50' },
    { label: 'Upcoming Quizzes', value: '3', max: '', color: 'text-blue-600', bg: 'bg-blue-50/50' },
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Welcome back, Eleanor. Here is an overview of your academic performance.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button 
            onClick={() => setCurrentPage('quizzes')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
          >
            Take a Quiz
          </button>
        </div>
      </div>

      {/* Grid: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <div className="mt-4 flex items-baseline">
              <span className={`text-3xl font-extrabold tracking-tight ${stat.color}`}>{stat.value}</span>
              {stat.max && <span className="text-sm font-bold text-slate-400 ml-1">{stat.max}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Live Quizzes and Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Live Quizzes Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active / Live Quizzes</span>
              </h2>
              <button 
                onClick={() => setCurrentPage('quizzes')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all quizzes
              </button>
            </div>
            
            <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-base">Midterm Assessment - Algebra</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Mathematics • Today, 10:00 AM - 11:00 AM</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase">Live</span>
                    <span className="text-[11px] font-bold text-rose-500">24 mins left</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('quizzes')}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all"
              >
                Take Quiz
              </button>
            </div>
          </div>

          {/* Recent Performance Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Recent Results</h2>
              <button 
                onClick={() => setCurrentPage('results')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                See details
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              <div className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Linear Equations - Practice</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Mathematics • Submitted 2 days ago</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="font-bold text-slate-800 text-sm">23/25</span>
                    <p className="text-[10px] font-bold text-emerald-600">92% (Pass)</p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('results')}
                    className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Introduction to Calculus</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Mathematics • Submitted 1 week ago</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="font-bold text-slate-800 text-sm">18/25</span>
                    <p className="text-[10px] font-bold text-emerald-600">72% (Pass)</p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('results')}
                    className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Profile and Course List */}
        <div className="space-y-8">
          {/* Quick Profile Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm mb-4">
              {/* Profile Avatar */}
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                alt="Student Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Eleanor Vance</h3>
            <span className="text-xs text-blue-600 font-bold mt-1 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">ID: QZ-2024-8931</span>
            
            <div className="w-full mt-6 pt-6 border-t border-slate-100 text-left space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</span>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">Computer Science & Engineering</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Major</span>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">Software Engineering, B.S.</p>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('profile')}
              className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer active-spring"
            >
              View Full Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
