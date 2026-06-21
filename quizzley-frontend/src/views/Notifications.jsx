import React from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Check, Trash2, ShieldAlert } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: 'New Quiz Submission',
      message: 'Student "Inesh Silva" submitted Midterm Quiz 01.',
      time: '10 mins ago',
      type: 'info',
      unread: true,
    },
    {
      id: 2,
      title: 'Database Sync Completed',
      message: 'MySQL schema updates were synced successfully with Spring Boot.',
      time: '2 hours ago',
      type: 'success',
      unread: false,
    },
    {
      id: 3,
      title: 'System Alert',
      message: 'High CPU utilization detected on Backend API Server.',
      time: '1 day ago',
      type: 'warning',
      unread: false,
    },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <Sidebar activeItem="notifications" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
              <p className="text-slate-500 mt-1 text-sm">Manage system alerts and user activities.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 cursor-pointer transition">
              <Check size={16} /> Mark all as read
            </button>
          </div>

          {/* List */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            {notifications.map((n, idx) => (
              <div
                key={n.id}
                className={`p-5 flex items-start gap-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition ${
                  n.unread ? 'bg-blue-50/20' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    n.type === 'success'
                      ? 'bg-emerald-50 text-emerald-600'
                      : n.type === 'warning'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {n.type === 'warning' ? <ShieldAlert size={18} /> : <Bell size={18} />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-slate-800 text-sm">{n.title}</h3>
                    <span className="text-xs text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-1">{n.message}</p>
                </div>

                <button className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 transition cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
