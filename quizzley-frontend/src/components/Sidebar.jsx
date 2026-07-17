import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  BookOpen,
  LayoutDashboard,
  FileQuestion,
  Users,
  BarChart3,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { logout } from '../store/authSlice';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { key: 'quizzes', label: 'Quizzes', icon: FileQuestion, path: '/admin/quizzes' },
  { key: 'students', label: 'Students', icon: Users, path: '/admin/students' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { key: 'notifications', label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function Sidebar({ activeItem }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-100 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
          <BookOpen size={18} className="text-white" />
        </div>
        <span className="text-xl font-bold text-blue-600 tracking-tight">Quizzley</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ key, label, icon: Icon, path }) => {
          const isActive = activeItem === key;
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                size={18}
                className={isActive ? 'text-blue-600' : 'text-slate-400'}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="px-3 py-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150 cursor-pointer group"
        >
          <LogOut size={18} className="text-slate-400 group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </aside>
  );
}
