import { useState } from 'react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('adminNotifications');
    if (stored) {
      return JSON.parse(stored);
    }
    const defaultNotifications = [
      {
        id: '1',
        title: 'System Update Completed',
        message: 'Quizzley platform updated successfully to production version v1.0.0-PRO. All database migrations completed.',
        category: 'SYSTEM',
        type: 'info',
        timestamp: '10 mins ago',
        read: false
      },
      {
        id: '2',
        title: 'New Student Registration',
        message: 'A new student user account has been registered under sophie.wilson@quizzley.edu.',
        category: 'ACTIVITY',
        type: 'success',
        timestamp: '1 hour ago',
        read: false
      },
      {
        id: '3',
        title: 'Admin Session Login',
        message: 'Administrator session initiated successfully for admin@quizzley.com from IP 192.168.1.45 (macOS Chrome).',
        category: 'SECURITY',
        type: 'warning',
        timestamp: '3 hours ago',
        read: true
      },
      {
        id: '4',
        title: 'Database Backup Completed',
        message: 'Daily automated backup of cloud databases (QuizzleyDb_Prod) executed successfully with 0 warnings.',
        category: 'SYSTEM',
        type: 'success',
        timestamp: '1 day ago',
        read: true
      },
      {
        id: '5',
        title: 'High Score Alert',
        message: 'Student Alex Mercer scored a perfect 100% on the Advanced React Hooks midterm examination.',
        category: 'ACTIVITY',
        type: 'success',
        timestamp: '2 days ago',
        read: true
      },
      {
        id: '6',
        title: 'Password Change Request',
        message: 'User teacher.martin@quizzley.edu requested a secure password reset link. Action completed.',
        category: 'SECURITY',
        type: 'info',
        timestamp: '3 days ago',
        read: true
      }
    ];
    localStorage.setItem('adminNotifications', JSON.stringify(defaultNotifications));
    return defaultNotifications;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const saveToStorage = (updatedList) => {
    setNotifications(updatedList);
    localStorage.setItem('adminNotifications', JSON.stringify(updatedList));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveToStorage(updated);
  };

  const handleClearAll = () => {
    saveToStorage([]);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    saveToStorage(updated);
  };

  const toggleReadStatus = (id) => {
    const updated = notifications.map(n => {
      if (n.id === id) {
        return { ...n, read: !n.read };
      }
      return n;
    });
    saveToStorage(updated);
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'ALL') return matchesSearch;
    return matchesSearch && n.category === activeTab;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'SYSTEM': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'SECURITY': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'ACTIVITY': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between animate-fade-in-up">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Notifications</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Monitor system logs, security audits, and activity changes across the application.</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-3">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={handleMarkAllRead}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mark all read
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100 self-start">
            {['ALL', 'SYSTEM', 'SECURITY', 'ACTIVITY'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                  activeTab === tab
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'ALL' ? 'All Alerts' : tab}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Notifications Timeline List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, idx) => (
              <div 
                key={notif.id}
                onClick={() => toggleReadStatus(notif.id)}
                className={`p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-start animate-fade-in-up ${
                  notif.read ? 'border-slate-100 opacity-80' : 'border-blue-100 bg-blue-50/10'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {getTypeIcon(notif.type)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base font-bold text-slate-900 ${!notif.read && 'font-extrabold'}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 animate-pulse" title="Unread" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium shrink-0">{notif.timestamp}</span>
                  </div>

                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                    {notif.message}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getCategoryColor(notif.category)}`}>
                      {notif.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">• Click to toggle read state</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDelete(notif.id, e)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
                  title="Delete notification"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-16 text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Notifications</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto font-medium">There are no system notifications matching your current search criteria or category filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200/40 text-center mt-8">
        <p className="text-xs text-slate-400 font-medium">Quizzley Admin Console • © 2026 Quizzley Inc.</p>
      </div>
    </div>
  );
}
