

export default function AdminAnalyticsPage() {
  const stats = [
    { label: 'Total Registered Users', value: '0', change: '—', trend: 'up' },
    { label: 'Quizzes Completed', value: '0', change: '—', trend: 'up' },
  ];

  const chartData = [];

  const topPerformers = [];

  const needsAttention = [];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 animate-fade-in-up">
      
      {/* Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Overview</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Real-time administrative insights and academic performance metrics.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>LAST 30 DAYS</span>
          </button>
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#001D4C] text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-900 active:bg-black transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>EXPORT REPORT</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                {idx === 0 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20c-2.202 0-4.277-.624-6.037-1.713C3.53 17.3 4 15.5 5.5 14.5c2.5-1.5 5.5-1.5 8 0 .428.257.8.587 1.103.97l.006-.003zM11 8.875c0-1.726-1.405-3.125-3.125-3.125S4.75 7.15 4.75 8.875 6.154 12 7.875 12 11 10.6 11 8.875zM19 8.875c0-1.726-1.405-3.125-3.125-3.125S12.75 7.15 12.75 8.875 14.154 12 15.875 12 19 10.6 19 8.875z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</span>
              <div className="flex items-center space-x-1 mt-2 text-xs font-bold text-slate-400">
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Highlight Score Card */}
        <div className="bg-[#001E42] text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Global Average Score</span>
            <div className="p-2 bg-white/10 text-white rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 z-10">
            <span className="text-3xl font-extrabold tracking-tight">—</span>
            <div className="flex items-center space-x-1.5 mt-2">
              <span className="text-xs font-bold text-slate-300">No score history</span>
            </div>
          </div>
          {/* Subtle glow background */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>

      {/* Class Performance Chart */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Class Performance Overview</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Average scores segmented by primary university departments.</p>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>

        {/* Graphical Representation */}
        <div className="h-72 w-full flex flex-col justify-between pt-4">
          <div className="flex-1 flex w-full relative">
            
            {/* Y Axis gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-slate-300">
              <div className="w-full border-t border-dashed border-slate-200 flex justify-end items-start pt-1 text-[10px] font-bold">100</div>
              <div className="w-full border-t border-dashed border-slate-200 flex justify-end items-start pt-1 text-[10px] font-bold">75</div>
              <div className="w-full border-t border-dashed border-slate-200 flex justify-end items-start pt-1 text-[10px] font-bold">50</div>
              <div className="w-full border-t border-dashed border-slate-200 flex justify-end items-start pt-1 text-[10px] font-bold">25</div>
              <div className="w-full border-t border-dashed border-slate-200 flex justify-end items-start pt-1 text-[10px] font-bold">0</div>
            </div>

            {chartData.length > 0 ? (
              /* Bars */
              <div className="flex-1 flex justify-around items-end px-12 z-10 h-full">
                {chartData.map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center group h-full justify-end w-12">
                    {/* Tooltip value */}
                    <span className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded mb-2 transition-all shadow-sm">
                      {bar.value}%
                    </span>
                    
                    {/* The bar */}
                    <div 
                      className="w-8 sm:w-10 rounded-t-lg bg-blue-600 group-hover:bg-[#001E42] transition-all duration-500 ease-out cursor-pointer shadow-md shadow-blue-500/10"
                      style={{ height: bar.height }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs font-semibold h-48 border border-dashed border-slate-100 rounded-2xl z-10 mt-8 mx-auto w-full max-w-md">
                No performance data available
              </div>
            )}

          </div>

          {/* X Axis Labels */}
          {chartData.length > 0 && (
            <div className="flex justify-around px-12 border-t border-slate-200 pt-3">
              {chartData.map((bar, idx) => (
                <span key={idx} className="text-xs font-bold text-slate-500 w-12 sm:w-16 text-center truncate">{bar.name}</span>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Performers (2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-sm p-6 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-extrabold text-slate-900">Top Performers</h3>
              <a href="#directory" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">View All Directory</a>
            </div>

            {topPerformers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Student</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Major</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Quizzes</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Score</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topPerformers.map((student, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100">
                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-extrabold text-slate-900 text-sm">{student.name}</span>
                        </td>
                        <td className="py-3.5">
                          <span className="text-slate-500 font-semibold text-xs">{student.major}</span>
                        </td>
                        <td className="py-3.5">
                          <span className="text-slate-700 font-bold text-xs">{student.quizzes}</span>
                        </td>
                        <td className="py-3.5">
                          <span className="text-slate-900 font-extrabold text-sm">{student.score}</span>
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                            student.status === 'EXCELLENT'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : 'bg-cyan-50 text-cyan-600 border border-cyan-100'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs font-semibold border border-dashed border-slate-100 rounded-2xl">
                No performer data available
              </div>
            )}
          </div>
        </div>

        {/* Needs Attention (1/3 width) */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-3xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 text-rose-600 mb-4">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-base font-extrabold text-slate-900">Needs Attention</h3>
            </div>
            
            <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">
              The following students have shown a drop in quiz scores exceeding 15% over the last two weeks.
            </p>

            {needsAttention.length > 0 ? (
              <div className="space-y-4">
                {needsAttention.map((student, idx) => (
                  <div key={idx} className="bg-white border border-rose-100/50 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-xs font-bold text-rose-600 shrink-0">
                        {student.initials}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{student.name}</div>
                        <div className="text-[10px] text-rose-500 font-bold flex items-center space-x-0.5 mt-0.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{student.change}</span>
                        </div>
                      </div>
                    </div>
                    <a href="#review" className="text-xs font-extrabold text-blue-600 hover:text-blue-700 transition-colors">Review</a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs font-semibold border border-dashed border-rose-200/40 rounded-2xl bg-white/50">
                No pending alerts
              </div>
            )}
          </div>

          <button className="w-full mt-6 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl transition-all shadow-sm">
            VIEW ALL ALERTS
          </button>
        </div>

      </div>

    </div>
  );
}
