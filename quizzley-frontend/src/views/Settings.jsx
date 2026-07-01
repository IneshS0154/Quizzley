import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { Save, User, Database, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { loginSuccess } from '../store/authSlice';
import api from '../api/axios';

function Toast({ type, message, onClose }) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  const iconClass = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-start gap-3 border rounded-xl px-4 py-3 shadow-lg max-w-sm ${styles[type]}`}>
      <Icon size={18} className={`shrink-0 mt-0.5 ${iconClass}`} />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer ml-2">✕</button>
    </div>
  );
}

export default function Settings() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [fullName, setFullName] = useState(currentUser?.fullName || currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) {
      showToast('error', 'Full name and email are required.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.put(`/api/auth/profile/${currentUser.userId}`, {
        fullName,
        email,
      });
      const user = {
        role: data.role,
        email: data.email,
        name: data.fullName,
        fullName: data.fullName,
        userId: data.userId,
      };
      dispatch(loginSuccess({ token: data.token, user }));
      showToast('success', 'Profile updated successfully!');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to update profile. Please try again.';
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <Sidebar activeItem="settings" />

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
              <p className="text-slate-500 mt-1 text-sm">Configure system properties and profiles.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Form Card 1 */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <User size={20} className="text-blue-600" />
                <h2 className="font-semibold text-slate-800">Profile Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Form Card 2 */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <Database size={20} className="text-blue-600" />
                <h2 className="font-semibold text-slate-800">Database Connection</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Database Driver</label>
                    <input
                      type="text"
                      disabled
                      defaultValue="MySQL (Connector/J)"
                      className="w-full px-4 py-2 border border-slate-100 bg-slate-50 text-slate-500 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Connection URL</label>
                    <input
                      type="text"
                      disabled
                      defaultValue="jdbc:mysql://localhost:3306/quiz_platform_db"
                      className="w-full px-4 py-2 border border-slate-100 bg-slate-50 text-slate-500 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-sm cursor-pointer transition shadow-sm"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
