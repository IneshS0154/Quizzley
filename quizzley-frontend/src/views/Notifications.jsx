import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Check, Trash2, ShieldAlert, CheckCircle2, AlertCircle, Loader2, BellOff } from 'lucide-react';
import api from '../api/axios';

const TYPE_STYLES = {
  SUCCESS: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2 },
  WARNING: { bg: 'bg-amber-50',   text: 'text-amber-600',   icon: ShieldAlert },
  INFO:    { bg: 'bg-blue-50',    text: 'text-blue-600',    icon: Bell },
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/api/admin/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/admin/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n.notificationId !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/api/admin/notifications/mark-all-read');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <Sidebar activeItem="notifications" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
              <p className="text-slate-500 mt-1 text-sm">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All notifications read'}
              </p>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 cursor-pointer transition font-medium text-slate-600"
              >
                <Check size={16} /> Mark all as read
              </button>
            )}
          </div>

          {/* Body */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 size={30} className="animate-spin text-blue-600 mb-3" />
              <p className="text-sm">Loading notifications...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-red-500 text-center">
              <AlertCircle size={30} className="mb-3" />
              <p className="font-semibold">{error}</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <BellOff size={40} className="mb-4 text-slate-300" />
              <p className="font-medium text-slate-500">No notifications yet</p>
              <p className="text-sm mt-1">Actions like creating or deleting quizzes will appear here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              {notifications.map((n) => {
                const style = TYPE_STYLES[n.type] || TYPE_STYLES.INFO;
                const Icon = style.icon;
                return (
                  <div
                    key={n.notificationId}
                    className={`p-5 flex items-start gap-4 border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60 ${
                      !n.isRead ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                      <Icon size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-semibold text-sm ${!n.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                          {n.title}
                          {!n.isRead && (
                            <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500 align-middle" />
                          )}
                        </h3>
                        <span className="text-xs text-slate-400 shrink-0">{timeAgo(n.createdAt)}</span>
                      </div>
                      <p className="text-slate-500 text-sm mt-0.5 leading-snug">{n.message}</p>
                    </div>

                    <button
                      onClick={() => handleDelete(n.notificationId)}
                      title="Delete notification"
                      className="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition cursor-pointer shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
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
