import { useState } from 'react';
import LoginPage from './LoginPage';
import Sidebar from './components/Sidebar';
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminAnalyticsPage from './components/AdminAnalyticsPage';
import AdminQuizzesPage from './components/AdminQuizzesPage';
import AdminUsersPage from './components/AdminUsersPage';
import AdminQuizManagersPage from './components/AdminQuizManagersPage';
import AdminNotificationsPage from './components/AdminNotificationsPage';
import AdminSettingsPage from './components/AdminSettingsPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || 'ADMIN');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLoginSuccess = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole || localStorage.getItem('role') || 'ADMIN');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole('ADMIN');
    setCurrentPage('dashboard');
  };

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        role={role}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {currentPage === 'dashboard' && (
          <AdminDashboardPage setCurrentPage={setCurrentPage} role={role} />
        )}
        {currentPage === 'quizzes' && role === 'QUIZ_MANAGER' && (
          <AdminQuizzesPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'quizzes' && role === 'ADMIN' && (
          <div className="p-8 text-slate-500 font-semibold text-sm">Quizzes are managed in the Quiz Manager portal.</div>
        )}
        {currentPage === 'users' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminUsersPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'quiz-managers' && role === 'ADMIN' && (
          <AdminQuizManagersPage />
        )}
        {currentPage === 'analytics' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminAnalyticsPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'notifications' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminNotificationsPage />
        )}
        {currentPage === 'settings' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminSettingsPage />
        )}
      </main>
    </div>
  );
}

export default App;
