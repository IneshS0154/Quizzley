import { useState, useEffect, useRef } from 'react';

export default function Header({ profile, setCurrentPage }) {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'courses' | 'library' | 'notifications' | null
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New Quiz Assigned: Midterm Assessment - Algebra", time: "10 mins ago", read: false, type: "assignment" },
    { id: 2, text: "Your score for Linear Equations is available: 92%", time: "2 hours ago", read: false, type: "grade" },
    { id: 3, text: "Database Systems class rescheduled to 3 PM", time: "1 day ago", read: true, type: "schedule" },
  ]);

  const headerRef = useRef(null);

  const courses = [
    { code: 'CS 301', name: 'Data Structures & Algorithms', progress: 78, color: 'bg-indigo-600' },
    { code: 'MATH 220', name: 'Linear Algebra', progress: 60, color: 'bg-emerald-500' },
    { code: 'SWE 410', name: 'Software Architecture', progress: 92, color: 'bg-amber-500' },
    { code: 'ENG 205', name: 'Technical Writing', progress: 100, color: 'bg-rose-500' },
  ];

  const libraryResources = [
    { title: 'Algebra Reference Book (PDF)', size: '4.2 MB', category: 'Textbooks' },
    { title: 'Linear Algebra - Past Paper 2025', size: '1.5 MB', category: 'Past Papers' },
    { title: 'SWE 410 Midterm Study Guide', size: '820 KB', category: 'Study Guides' },
    { title: 'Data Structures Lecture Notes', size: '2.8 MB', category: 'Lecture Notes' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <header ref={headerRef} className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between shrink-0 relative z-30">
      
      {/* Search */}
      <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search courses, library..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Navigation & Avatar Controls */}
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-500">
          
          {/* My Courses Link & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'courses' ? null : 'courses')}
              className={`hover:text-slate-850 transition-colors text-xs font-semibold cursor-pointer focus:outline-none ${
                activeDropdown === 'courses' ? 'text-slate-900 font-bold' : 'text-slate-500'
              }`}
            >
              My Courses
            </button>

            {activeDropdown === 'courses' && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 z-50 animate-fade-in-up">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-800">My Enrolled Courses</span>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">{courses.length} Active</span>
                </div>
                <div className="space-y-3">
                  {courses.map((course, idx) => (
                    <div key={idx} className="group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all duration-200">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{course.code}</span>
                        <span className="text-[10px] font-extrabold text-slate-700">{course.progress}%</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">{course.name}</p>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Library Link & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'library' ? null : 'library')}
              className={`hover:text-slate-850 transition-colors text-xs font-semibold cursor-pointer focus:outline-none ${
                activeDropdown === 'library' ? 'text-slate-900 font-bold' : 'text-slate-500'
              }`}
            >
              Library
            </button>

            {activeDropdown === 'library' && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 z-50 animate-fade-in-up">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-800">Study Library</span>
                  <span className="text-[10px] text-slate-500 font-bold bg-slate-50 px-2.5 py-0.5 rounded-full">Resources</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {libraryResources.map((res, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl cursor-pointer group transition-all duration-200">
                      <div className="min-w-0 pr-2">
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{res.category}</span>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate mt-1.5">{res.title}</p>
                        <span className="text-[9px] text-slate-400 font-bold">{res.size}</span>
                      </div>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg shrink-0 transition-all cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </nav>
        
        <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

        <div className="flex items-center space-x-3.5">
          
          {/* Notifications Panel */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
              className={`p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all relative cursor-pointer focus:outline-none ${
                activeDropdown === 'notifications' ? 'bg-slate-100 text-slate-600' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              )}
            </button>

            {activeDropdown === 'notifications' && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 z-50 animate-fade-in-up">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-800">Notifications</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer focus:outline-none"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => markAsRead(notif.id)}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 border flex gap-3 ${
                          notif.read 
                            ? 'bg-white border-transparent hover:bg-slate-50' 
                            : 'bg-blue-50/20 border-blue-50/70 hover:bg-blue-50/40'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          notif.type === 'assignment' ? 'bg-amber-50 text-amber-600' :
                          notif.type === 'grade' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {notif.type === 'assignment' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          ) : notif.type === 'grade' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs leading-snug text-slate-800 ${!notif.read ? 'font-bold' : 'font-medium'}`}>{notif.text}</p>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1">{notif.time}</span>
                        </div>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-slate-400 font-semibold text-xs">No notifications yet.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button 
            onClick={() => setCurrentPage('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 active-spring cursor-pointer focus:outline-none flex items-center justify-center shrink-0 bg-slate-100 text-slate-400"
          >
            {profile?.avatar ? (
              <img src={profile.avatar} alt="User avatar" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

    </header>
  );
}
